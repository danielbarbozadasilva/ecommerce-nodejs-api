const { ObjectId } = require('mongodb')
const {
  payment,
  solicitation,
  orderregistrations,
  product,
  client,
  user,
  deliveries
} = require('../models/models.index')
const paymentMapper = require('../mappers/mappers.payment')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const {
  getTransactionStatus,
  createPayment,
  getNotification,
  getSessionId
} = require('../utils/pagseguro/pagseguro.index')
const emailUpdatePayment = require('../utils/email/email.notification_payment')
const emailUtils = require('../utils/email/email.index')
const { showCartSolicitationService } = require('./services.solicitation')

const listByIdPaymentService = async (paymentid) => {
  try {
    const resultPayment = await payment.findOne({
      _id: paymentid
    })

    const resultRegistration = await orderregistrations.find({
      solicitation: resultPayment.solicitation,
      type: 'payment'
    })

    const situation = resultPayment.pagSeguroCode
      ? await getTransactionStatus(resultPayment.pagSeguroCode)
      : null

    if (
      situation &&
      (resultRegistration.length === 0 ||
        !resultRegistration[resultRegistration.length - 1].payload ||
        !resultRegistration[resultRegistration.length - 1].payload.code ||
        resultRegistration[resultRegistration.length - 1].payload.code !==
          situation.code)
    ) {
      const resultSolicitation = await orderregistrations.create({
        solicitation: resultPayment.solicitation,
        type: 'payment',
        situation: situation.status || 'situation',
        payload: situation
      })

      resultPayment.status = situation.status

      await resultPayment.save()
      await resultSolicitation.save()
    }

    return {
      success: true,
      message: 'Payment listed successfully',
      data: paymentMapper.toDTO(resultPayment, ...resultRegistration)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const sendEmailClientUpdate = async (id, status) => {
  const resultClient = await solicitation.aggregate([
    { $match: { _id: ObjectId(id) } },
    {
      $lookup: {
        from: client.collection.name,
        localField: 'client',
        foreignField: '_id',
        as: 'client'
      }
    },
    { $unwind: '$client' },
    {
      $lookup: {
        from: user.collection.name,
        localField: 'client.user',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' }
  ])
  const resultSolicitation = await showCartSolicitationService(id)

  emailUtils.utilSendEmail({
    to: resultClient[0].user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `Pedido ${id} foi atualizado!`,

    html: emailUpdatePayment.sendUpdateEmail(
      resultSolicitation.data,
      resultClient,
      status
    )
  })
}

const updateQuantityConfirmOrder = async (id) => {
  try {
    const resultSolicitation = await solicitation.findById(id)
    resultSolicitation.cart.map(async (item) => {
      const resultProduct = await product.findOne({ _id: item.product })
      resultProduct.blockedQuantity -= item.quantity
      resultProduct.save()
    })
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateQuantityCancelation = async (id) => {
  try {
    const resultSolicitation = await solicitation.findById(id)
    resultSolicitation.cart.map(async (item) => {
      const resultProduct = await product.findOne({ _id: item.product })
      resultProduct.blockedQuantity -= item.quantity
      resultProduct.quantity += item.quantity
      resultProduct.save()
    })
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updatePaymentService = async (paymentid, body) => {
  try {
    const resultPayment = await payment.findOneAndUpdate(
      { _id: paymentid },
      {
        $set: {
          status: body.status
        }
      },
      { new: true }
    )

    const resultRegistration = await orderregistrations.create({
      solicitation: resultPayment.solicitation,
      type: 'payment',
      situation: body.status
    })

    await sendEmailClientUpdate(resultPayment.solicitation, body.status)

    if (body.status.toLowerCase().includes('pago')) {
      await updateQuantityConfirmOrder(resultRegistration.solicitation)
    } else if (body.status.toLowerCase().includes('cancelado')) {
      await updateQuantityCancelation(resultRegistration.solicitation)
    }

    return {
      success: true,
      message: 'Payment listed successfully',
      data: paymentMapper.toDTOList(resultPayment)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createPaymentService = async (paymentid, body) => {
  try {
    const result = await payment.aggregate([
      { $match: { _id: ObjectId(paymentid) } },
      {
        $lookup: {
          from: solicitation.collection.name,
          localField: '_id',
          foreignField: 'payment',
          as: 'solicitation'
        }
      },
      { $unwind: '$solicitation' },

      {
        $lookup: {
          from: product.collection.name,
          localField: 'solicitation.cart.product',
          foreignField: '_id',
          as: 'products'
        }
      },
      {
        $lookup: {
          from: deliveries.collection.name,
          localField: 'solicitation.deliveries',
          foreignField: '_id',
          as: 'deliveries'
        }
      },
      { $unwind: '$deliveries' },

      {
        $lookup: {
          from: client.collection.name,
          localField: 'solicitation.client',
          foreignField: '_id',
          as: 'client'
        }
      },
      { $unwind: '$client' },

      {
        $lookup: {
          from: user.collection.name,
          localField: 'client.user',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unset: ['user.hash', 'user.salt', 'user.permissions'] },
      { $unwind: '$user' }
    ])

    const payload = await createPayment(
      body.senderHash,
      paymentMapper.toDTOCart(...result)
    )

    await payment.findOneAndUpdate(
      { _id: ObjectId(paymentid) },
      {
        $set: {
          payload,
          pagSeguroCode: payload.code
        }
      },
      { new: true }
    )

    return {
      success: true,
      message: 'Payment created successfully',
      data: paymentMapper.toDTOPay(payload)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const showNotificationPaymentService = async (body) => {
  try {
    const resultNotification = await getNotification(body.notificationCode)
    const resultPayment = await payment.findOne({
      pagSeguroCode: resultNotification.code
    })

    if (!resultPayment) {
      return {
        success: false,
        message: 'Payment does not exist'
      }
    }

    const resultSolicitation = await solicitation.findOne({
      payment: resultPayment._id
    })

    const resultRegistration = await orderregistrations.find({
      solicitation: resultSolicitation._id,
      type: 'payment'
    })

    const resultSituation = resultPayment.pagSeguroCode
      ? await getTransactionStatus(resultPayment.pagSeguroCode)
      : null
    if (
      resultSituation &&
      (resultRegistration.length === 0 ||
        resultRegistration[resultRegistration.length - 1].payload.code !==
          resultSituation.code)
    ) {
      const result = await orderregistrations.create({
        solicitation: resultSolicitation._id,
        type: 'payment',
        situation: resultSituation.status || 'situation',
        payload: resultSituation
      })

      await payment.findOneAndUpdate(
        { _id: resultPayment._id },
        {
          $set: {
            status: resultSituation.status
          }
        },
        { new: true }
      )

      await sendEmailClientUpdate(
        resultSolicitation._id,
        resultSituation.status
      )

      if (resultSituation.status.toLowerCase().includes('paga')) {
        await updateQuantityConfirmOrder(result.solicitation)
      } else if (resultSituation.status.toLowerCase().includes('cancelada')) {
        await updateQuantityCancelation(result.solicitation)
      }
    }

    return {
      success: true,
      message: 'Payment created successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const showSessionService = async () => {
  try {
    const resultId = await getSessionId()

    return {
      success: true,
      message: 'Session id listed successfully',
      data: resultId
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listByIdPaymentService,
  updatePaymentService,
  createPaymentService,
  showNotificationPaymentService,
  showSessionService
}
