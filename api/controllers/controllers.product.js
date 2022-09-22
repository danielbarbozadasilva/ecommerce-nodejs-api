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

const listByIdProductController = async (req, res) => {
  const { productid } = req.params
  const resultService = await productService.listByIdProductService(productid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createProductController = async (req, res) => {
  const { body } = req
  const { storeid } = req.query
  const resultService = await productService.createProductService(storeid, body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateProductController = async (req, res) => {
  const { body } = req
  const { productid } = req.params
  const { storeid } = req.query

  const resultService = await productService.updateProductService(
    body,
    productid,
    storeid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateImageProductController = async (req, res) => {
  const { id } = req.params
  const { files } = req
  const { storeid } = req.query

  const resultService = await productService.updateImageProductService(
    id,
    files,
    storeid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteProductController = async (req, res) => {
  const { productid } = req.params
  const { storeid } = req.query

  const resultService = await productService.deleteProductService(
    productid,
    storeid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}
module.exports = {
  listAllProductController,
  listByIdProductController,
  createProductController,
  updateProductController,
  updateImageProductController,
  deleteProductController
}
