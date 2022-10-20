const productService = require('../services/services.product')

const listByIdDeliveryController = async (req, res) => {
  const { deliveryid } = req.params
  const resultService = await productService.listByIdDeliveryService(deliveryid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listByIdDeliveryController
}
