const ratingService = require('../services/services.rating')

const listRatingProductController = async (req, res) => {
  const { productid } = req.query
  const resultService = await ratingService.listRatingProductService(productid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createRatingProductController = async (req, res) => {
  const { productid } = req.query
  const { body } = req

  const resultService = await ratingService.createRatingProductService(
    productid,
    body
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listByIdRatingProductController = async (req, res) => {
  const { ratingid } = req.params
  const { productid } = req.query
  const resultService = await ratingService.listByIdRatingProductService(
    ratingid,
    productid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteRatingProductController = async (req, res) => {
  const { ratingid } = req.params
  const resultService = await ratingService.deleteRatingProductService(ratingid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listRatingProductController,
  listByIdRatingProductController,
  deleteRatingProductController,
  createRatingProductController
}
