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

const createCategoryController = async (req, res) => {
  const { body, files } = req
  const resultService = await categoryService.createCategoryService(body, files)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateCategoryController = async (req, res) => {
  const { categoryid } = req.params
  const { body, files } = req

  const resultService = await categoryService.updateCategoryService(
    categoryid,
    body,
    files
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

module.exports = {
  listAllCategoryController,
  listCategoryByIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController
}
