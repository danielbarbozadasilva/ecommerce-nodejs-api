const solicitationService = require('../services/services.solicitation')

const listAllSolicitationController = async (req, res) => {
  const { offset, limit, storeid } = req.query

  const resultService = await solicitationService.listAllSolicitationService(
    offset,
    limit,
    storeid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listByIdSolicitationController = async (req, res) => {
  const { offset, limit, storeid } = req.query
  const { solicitationid } = req.params

  const resultService = await solicitationService.listByIdSolicitationService(
    offset,
    limit,
    storeid,
    solicitationid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteSolicitationController = async (req, res) => {
  const { storeid } = req.query
  const { solicitationid } = req.params

  const resultService = await solicitationService.deleteSolicitationService(
    storeid,
    solicitationid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const showCartSolicitationController = async (req, res) => {
  const { storeid } = req.query
  const { solicitationid } = req.params

  const resultService = await solicitationService.showCartSolicitationService(
    storeid,
    solicitationid
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
  listByIdSolicitationController,
  deleteSolicitationController,
  showCartSolicitationController
}