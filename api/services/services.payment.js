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
    const paymentdb = await payment.findById(paymentid)

    const registrationdb = await orderregistrations.find({
      solicitation: paymentdb.solicitation,
      type: 'payment'
    })

    const situation = paymentdb.pagSeguroCode
      ? await getTransactionStatus(paymentdb.pagSeguroCode)
      : null

    if (
      situation &&
      (registrationdb.length === 0 ||
        !registrationdb[registrationdb.length - 1].payload ||
        !registrationdb[registrationdb.length - 1].payload.code ||
        registrationdb[registrationdb.length - 1].payload.code !==
          situation.code)
    ) {
      const resultSolicitation = await orderregistrations.create({
        solicitation: paymentdb.solicitation,
        type: 'payment',
        situation: situation.status || 'situation',
        payload: situation
      })

      paymentdb.status = situation.status

      await paymentdb.save()
      await resultSolicitation.save()
    }

    return {
      success: true,
      message: 'Payment listed successfully',
      data: paymentMapper.toDTO(paymentdb, ...registrationdb)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const sendEmailClientSuccessPaid = async (solicitationNumber) => {
  const result = await showCartSolicitationService(solicitationNumber)
  emailUtils.utilSendEmail({
    to: result.data.user.email,
    from: process.env.SENDER,
    subject: `E-commerce - Pagamento Confirmado!`,
    html: emailUpdatePayment.sendEmailSuccessfullyPaid(result.data)
  })
}

const sendEmailAdmSuccessfullyPaid = async (solicitationNumber) => {
  const result = await showCartSolicitationService(solicitationNumber)
  emailUtils.utilSendEmail({
    to: process.env.EMAIL,
    from: process.env.SENDER,
    subject: `E-commerce - Pagamento Confirmado!`,
    html: emailUpdatePayment.sendAdmEmailSuccessfullyPaid(result.data)
  })
}

const sendEmailClientPaymentFailed = async (solicitationNumber) => {
  const result = await showCartSolicitationService(solicitationNumber)
  emailUtils.utilSendEmail({
    to: result.data.user.email,
    from: process.env.SENDER,
    subject: `E-commerce - Pagamento Cancelado!`,
    html: emailUpdatePayment.sendEmailPaymentFailed(result.data)
  })
}

const sendEmailAdmPaymentFailed = async (solicitationNumber) => {
  const result = await showCartSolicitationService(solicitationNumber)
  emailUtils.utilSendEmail({
    to: process.env.EMAIL,
    from: process.env.SENDER,
    subject: `E-commerce - Pagamento Cancelado!`,
    html: emailUpdatePayment.sendAdmEmailPaymentFailed(result.data)
  })
}
const updateQuantityConfirm = async (id) => {
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
    const solicitationdb = await solicitation.aggregate([
      { $match: { payment: ObjectId(paymentid) } },
      {
        $lookup: {
          from: payment.collection.name,
          localField: 'payment',
          foreignField: '_id',
          as: 'payment'
        }
      },
      { $unwind: '$payment' },
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

    const paymentdb = await payment.findOneAndUpdate(
      { _id: paymentid },
      {
        $set: {
          status: body.status
        }
      },
      { new: true }
    )

    const registrationdb = await orderregistrations.create({
      solicitation: solicitationdb[0]._id,
      type: 'payment',
      situation: paymentdb.status
    })

    if (body.status.toLowerCase().includes('paga')) {
      await updateQuantityConfirm(registrationdb.solicitation)
      await sendEmailClientSuccessPaid(solicitationdb[0].solicitationNumber)
      await sendEmailAdmSuccessfullyPaid(solicitationdb[0].solicitationNumber)
    } else if (body.status.toLowerCase().includes('cancelada')) {
      await updateQuantityCancelation(registrationdb.solicitation)
      await sendEmailClientPaymentFailed(solicitationdb[0].solicitationNumber)
      await sendEmailAdmPaymentFailed(solicitationdb[0].solicitationNumber)
    }

    return {
      success: true,
      message: 'Payment listed successfully',
      data: paymentMapper.toDTOList(paymentdb)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createPaymentService = async (paymentid, body) => {

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

  if (payload?.code) {
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
      message: 'Sales communication made successfully to Pagseguro',
      data: payload
    }
  }

  return {
    success: false,
    message: 'Ocorreu um erro ao processar o seu pagamento!'
  }
}

const showNotificationPaymentService = async (body) => {
  try {
    const notification = await getNotification(body.notificationCode)
    const result = await payment.aggregate([
      { $match: { pagSeguroCode: notification.code } },
      {
        $lookup: {
          from: solicitation.collection.name,
          localField: 'payment._id',
          foreignField: 'solicitation',
          as: 'solicitation'
        }
      },
      { $unwind: '$solicitation' },
      {
        $lookup: {
          from: orderregistrations.collection.name,
          localField: 'solicitation._id',
          foreignField: 'solicitation',
          as: 'orderregistrations',
          pipeline: [
            {
              $match: { $expr: { $eq: ['$type', 'solicitation'] } }
            }
          ]
        }
      },
      { $unwind: '$orderregistrations' }
    ])

    const paymentdb = paymentMapper.toDTOPayment(...result)

    const situation = paymentdb.pagSeguroCode
      ? await getTransactionStatus(paymentdb.pagSeguroCode)
      : null

    if (situation && paymentdb.orderregistrations) {
      const orderdb = await orderregistrations.create({
        solicitation: paymentdb.solicitation.id,
        type: 'payment',
        situation: situation.status || 'situation',
        payload: situation
      })

      await payment.findOneAndUpdate(
        { _id: paymentdb.id },
        {
          $set: {
            status: situation.status
          }
        },
        { new: true }
      )

      if (situation.status.toLowerCase().includes('paga')) {
        await updateQuantityConfirm(orderdb.solicitation)
        await sendEmailClientSuccessPaid(
          paymentdb.solicitation.solicitationNumber
        )
        await sendEmailAdmSuccessfullyPaid(
          paymentdb.solicitation.solicitationNumber
        )
      } else if (situation.status.toLowerCase().includes('cancelada')) {
        await updateQuantityCancelation(orderdb.solicitation)
        await sendEmailClientPaymentFailed(
          paymentdb.solicitation.solicitationNumber
        )
        await sendEmailAdmPaymentFailed(
          paymentdb.solicitation.solicitationNumber
        )
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
      message: 'Sesson id listed successfully',
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
