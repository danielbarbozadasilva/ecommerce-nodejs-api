const deliveryService = require('../services/services.delivery')

const listByIdDeliveryController = async (req, res) => {
  const { deliveryid } = req.params
  const resultService = await deliveryService.listByIdDeliveryService(
    deliveryid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateDeliveryController = async (req, res) => {
  const { body } = req
  const { deliveryid } = req.params
  const resultService = await deliveryService.updateDeliveryService(
    body,
    deliveryid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listByIdDeliveryController,
  updateDeliveryController
}
