const variationsService = require('../services/services.variations')

const listVariationsController = async (req, res) => {
  const resultService = await variationsService.listVariationsService()
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createVariationsController = async (req, res) => {
  const { storeid, productid } = req.query
  const { body } = req

  const resultService = await variationsService.createVariationsService(
    storeid,
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

const listByIdVariationsController = async (req, res) => {
  const { storeid, productid } = req.query
  const { variationid } = req.params
  const resultService = await variationsService.listByIdVariationsService(
    storeid,
    productid,
    variationid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateVariationsController = async (req, res) => {
  const { storeid, productid } = req.query
  const { variationid } = req.params
  const { body } = req

  const resultService = await variationsService.updateVariationsService(
    variationid,
    storeid,
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

const updateImageVariationController = async (req, res) => {
  const { storeid, productid } = req.query
  const { variationid } = req.params
  const { files } = req

  const resultService = await variationsService.updateImageVariationService(
    variationid,
    storeid,
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

module.exports = {
  listVariationsController,
  createVariationsController,
  listByIdVariationsController,
  updateVariationsController,
  updateImageVariationController
}
