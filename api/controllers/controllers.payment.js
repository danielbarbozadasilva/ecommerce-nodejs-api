const paymentService = require('../services/services.payment')

const listByIdPaymentController = async (req, res) => {
  const { paymentid } = req.params
  const resultService = await paymentService.listByIdPaymentService(paymentid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updatePaymentController = async (req, res) => {
  const { paymentid } = req.params
  const { body } = req

  const resultService = await paymentService.updatePaymentService(
    paymentid,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createPaymentController = async (req, res) => {
  const { paymentid } = req.params
  const { body } = req

  const resultService = await paymentService.createPaymentService(
    paymentid,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}
module.exports = {
  listByIdPaymentController,
  updatePaymentController,
  createPaymentController
}
