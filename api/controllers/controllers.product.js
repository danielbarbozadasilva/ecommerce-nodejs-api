const productService = require('../services/services.product')

const listAllProductController = async (req, res) => {
  const { storeid, sortType, offset, limit } = req.query
  const resultService = await productService.listAllProductService(
    storeid,
    sortType,
    offset,
    limit
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllProductController
}
