const { payment, orderregistrations } = require('../models/models.index')
const paymentMapper = require('../mappers/mappers.payment')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const { getTransactionStatus } = require('../utils/pagseguro/pagseguro.index')

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
module.exports = {
  listByIdPaymentService
}
