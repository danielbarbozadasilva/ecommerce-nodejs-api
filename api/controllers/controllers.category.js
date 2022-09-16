const categoryService = require('../services/services.category')

const listCategoryByStoreController = async (req, res) => {
  const { storeid } = req.query
  const resultService = await categoryService.listCategoryByStoreService(
    storeid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listCategoryAvailabilityByStoreController = async (req, res) => {
  const { storeid } = req.query
  const resultService =
    await categoryService.listCategoryAvailabilityByStoreService(storeid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listCategoryByIdController = async (req, res) => {
  const { storeid } = req.query
  const { categoryid } = req.params
  const resultService = await categoryService.listCategoryByIdService(
    storeid,
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
  const { storeid } = req.query
  const { body } = req

  const resultService = await categoryService.createCategoryByStoreService(
    storeid,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateCategoryByStoreController = async (req, res) => {
  const { categoryid } = req.params
  const { body } = req

  const resultService = await categoryService.updateCategoryByStoreService(
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

module.exports = {
  listCategoryByStoreController,
  listCategoryAvailabilityByStoreController,
  listCategoryByIdController,
  createCategoryByStoreController,
  updateCategoryByStoreController
}
