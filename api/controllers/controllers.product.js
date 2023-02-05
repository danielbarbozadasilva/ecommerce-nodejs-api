const productService = require('../services/services.product')

const listAllProductController = async (req, res) => {
  const { sortType, page, itemsPerPage } = req.query
  const offset = Number(page * itemsPerPage) || 0
  const limit = Number(itemsPerPage) || 5
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

const listProductController = async (req, res) => {
  const { sortType } = req.query
  const resultService = await productService.listProductService(sortType)
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
  const { body, files } = req
  const resultService = await productService.createProductService(body, files)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateProductController = async (req, res) => {
  const { body, files } = req
  const { productid } = req.params
  const resultService = await productService.updateProductService(
    body,
    files,
    productid
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
  const { sortType, page, itemsPerPage } = req.query
  const offset = Number(page * itemsPerPage) || 0
  const limit = Number(itemsPerPage) || 5
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

const listCategoryProductsController = async (req, res) => {
  const { categoryid } = req.params
  const { sortType, page, itemsPerPage } = req.query
  const offset = Number(page * itemsPerPage) || 0
  const limit = Number(itemsPerPage) || 5
  const resultService = await productService.listCategoryProductsService(
    sortType,
    offset,
    limit,
    categoryid
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
  listProductController,
  listByIdProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  listAvailableProductController,
  searchProductController,
  listRatingProductController,
  listCategoryProductsController
}
