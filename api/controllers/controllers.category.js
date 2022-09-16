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

module.exports = {
  listCategoryByStoreController
}
