const categoryService = require('../services/services.category')

const listAllCategoryController = async (req, res) => {
  const resultService = await categoryService.listAllCategoryService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listCategoryAvailabilityController = async (req, res) => {
  const resultService = await categoryService.listCategoryAvailabilityService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listCategoryByIdController = async (req, res) => {
  const { categoryid } = req.params
  const resultService = await categoryService.listCategoryByIdService(
    categoryid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createCategoryByStoreController = async (req, res) => {
  const { body } = req
  const resultService = await categoryService.createCategoryByStoreService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateCategoryController = async (req, res) => {
  const { categoryid } = req.params
  const { body } = req

  const resultService = await categoryService.updateCategoryService(
    categoryid,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteCategoryController = async (req, res) => {
  const { categoryid } = req.params

  const resultService = await categoryService.deleteCategoryService(categoryid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listCategoryWithProductsController = async (req, res) => {
  const { categoryid } = req.params
  const { offset, limit } = req.query

  const resultService = await categoryService.listCategoryWithProductsService(
    categoryid,
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
  listAllCategoryController,
  listCategoryAvailabilityController,
  listCategoryByIdController,
  createCategoryByStoreController,
  updateCategoryController,
  deleteCategoryController,
  listCategoryWithProductsController
}
