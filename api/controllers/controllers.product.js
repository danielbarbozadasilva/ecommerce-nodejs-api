const productService = require('../services/services.product')

const listAllProductController = async (req, res) => {
  const { sortType, offset, limit } = req.query
  const resultService = await productService.listAllProductService(
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
  const resultService = await productService.createProductService(body)
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
  const resultService = await productService.updateProductService(
    body,
    productid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateImageProductController = async (req, res) => {
  const { productid } = req.params
  const { files } = req
  const resultService = await productService.updateImageProductService(
    productid,
    files
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
  const resultService = await productService.deleteProductService(productid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listAvailableProductController = async (req, res) => {
  const { sortType, offset, limit } = req.query
  const resultService = await productService.listAvailableProductService(
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

const searchProductController = async (req, res) => {
  const { sortType, offset, limit } = req.query
  const { search } = req.params
  const resultService = await productService.searchProductService(
    sortType,
    offset,
    limit,
    search
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listRatingProductController = async (req, res) => {
  const { productid } = req.params
  const resultService = await productService.listRatingProductService(productid)
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
  deleteProductController,
  listAvailableProductController,
  searchProductController,
  listRatingProductController
}
