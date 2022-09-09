const storeService = require('../services/services.store')

const listAllStoresController = async (req, res) => {
  const { email, password } = req.body
  const resultService = await storeService.listAllStoresService(email, password)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listByIdStoreController = async (req, res) => {
  const { storeid } = req.params
  const resultService = await storeService.listByIdStoreService(storeid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateStoreController = async (req, res) => {
  const { body } = req
  const { storeid } = req.params
  const resultService = await storeService.updateStoreService(storeid, body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteStoreController = async (req, res) => {
  const { storeid } = req.params
  const resultService = await storeService.deleteStoreService(storeid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createStoreController = async (req, res) => {
  const { body } = req
  const resultService = await storeService.createStoreService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllStoresController,
  listByIdStoreController,
  updateStoreController,
  deleteStoreController,
  createStoreController
}
