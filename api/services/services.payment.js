const {
  payment,
  solicitation,
  orderregistrations,
  product
} = require('../models/models.index')
const paymentMapper = require('../mappers/mappers.payment')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const {
  getTransactionStatus,
  createPayment
} = require('../utils/pagseguro/pagseguro.index')
const emailUpdatePayment = require('../utils/email/email.update_solicitation')
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
      const registroPedido = await orderregistrations.create({
        solicitation: resultPayment.solicitation,
        type: 'payment',
        situation: situation.status || 'situation',
        payload: situation
      })

      resultPayment.status = situation.status

      await resultPayment.save()
      await registroPedido.save()
    }

    return {
      success: true,
      message: 'Payment listed successfully',
      data: paymentMapper.toDTO(resultPayment, resultRegistration)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const sendEmailClientPaymentUpdate = async (id) => {
  const resultClient = await solicitation
    .findOne({ _id: id })
    .populate('client')
    .populate('user')

  console.log(`resultClient----${JSON.stringify(resultClient)}`)
  const resultSolicitation = await showCartSolicitationService(id)

  emailUtils.utilSendEmail({
    to: resultClient.user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `Pedido ${solicitation} recebido!`,

    html: emailUpdatePayment.sendSolicitationUpdateEmail(
      resultSolicitation.data,
      [resultClient]
    )
  })
}

const updateQuantity = async (id) => {
  try {
    const resultSolicitation = await solicitation.findById(id)
    resultSolicitation.map(async (item) => {
      const resultProduct = await product.findOne({ _id: item.product })
      resultProduct.quantity -= item.quantity
      resultProduct.blockedQuantity += item.quantity
      resultProduct.save()
    })
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateQuantityCancelation = async (id) => {
  try {
    const resultSolicitation = await solicitation.findById(id)
    resultSolicitation.map(async (item) => {
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

    await sendEmailClientPaymentUpdate(resultRegistration.solicitation)

    if (body.status.toLowerCase().includes('pago')) {
      await updateQuantity(resultRegistration.solicitation)
    } else if (body.status.toLowerCase().includes('cancelado')) {
      await updateQuantityCancelation(resultRegistration.solicitation)
    }

    return {
      success: true,
      message: 'Payment listed successfully',
      data: paymentMapper.toDTO(resultPayment)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createPaymentService = async (paymentid, body) => {
  try {
    const resultPayment = await payment.findById(paymentid)
    const resultSolicitation = await solicitation
      .findById(resultPayment.solicitation)
      .populate([
        { path: 'client', populate: 'user' },
        { path: 'delivery' },
        { path: 'payment' }
      ])
    resultSolicitation.carrinho = await Promise.all(
      resultSolicitation.carrinho.map(async (item) => {
        item.produto = await product.findById(item.produto)
        return item
      })
    )

    const payload = await createPayment(body.senderHash, resultSolicitation)
    resultPayment.payload = resultPayment.payload
      ? resultPayment.payload.concat([payload])
      : [payload]
    if (payload.code) resultPayment.pagSeguroCode = payload.code
    await resultPayment.save()

    return {
      success: true,
      message: 'Payment created successfully',
      data: paymentMapper.toDTO(resultPayment)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listByIdPaymentService,
  updatePaymentService,
  createPaymentService
}
