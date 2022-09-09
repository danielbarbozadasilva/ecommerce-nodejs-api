const storeService = require('../services/services.store')

const listAllStoresController = async (req, res) => {
  const { email, password } = req.body
  const resultService = await storeService.listAllStoresService(email, password)
  const code = resultService.success ? 200 : 401
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllStoresController
}
