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

const showNotificationPaymentController = async (req, res) => {
  const { body } = req

  const resultService = await paymentService.showNotificationPaymentService(
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const showSessionPaymentController = async (req, res) => {
  const resultService = await paymentService.showSessionService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const sessionId = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, sessionId })
}

module.exports = {
  listByIdPaymentController,
  updatePaymentController,
  createPaymentController,
  showNotificationPaymentController,
  showSessionPaymentController
}
