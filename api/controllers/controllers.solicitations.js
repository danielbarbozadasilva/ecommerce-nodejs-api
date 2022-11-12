const solicitationService = require('../services/services.solicitation')

const listAllSolicitationController = async (req, res) => {
  const { offset, limit } = req.query

  const resultService = await solicitationService.listAllSolicitationService(
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

const listByNumberSolicitationController = async (req, res) => {
  const { solicitationNumber } = req.params

  const resultService =
    await solicitationService.listByNumberSolicitationService(
      solicitationNumber
    )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteSolicitationController = async (req, res) => {
  const { solicitationNumber } = req.params
  const { clientid } = req.query
  const resultService = await solicitationService.deleteSolicitationService(
    solicitationNumber,
    clientid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const showCartSolicitationController = async (req, res) => {
  const { solicitationNumber } = req.params
  const resultService = await solicitationService.showCartSolicitationService(
    solicitationNumber
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createSolicitationController = async (req, res) => {
  const { clientid, storeid } = req.query
  const { body } = req

  const resultService = await solicitationService.createSolicitationService(
    storeid,
    clientid,
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
  listAllSolicitationController,
  listByNumberSolicitationController,
  deleteSolicitationController,
  showCartSolicitationController,
  createSolicitationController
}
