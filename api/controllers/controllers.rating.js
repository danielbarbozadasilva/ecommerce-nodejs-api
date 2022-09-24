const ratingService = require('../services/services.rating')

const listRatingProductController = async (req, res) => {
  const { storeid, productid } = req.query

  const resultService = await ratingService.listRatingProductService(storeid, productid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listRatingProductController
}
