const clientService = require('../services/services.client')

const listAllClientsController = async (req, res) => {
  const { store } = req.query
  const offset = Number(req.query.offset) || 30
  const limit = Number(req.query.limit) || 30

  const resultService = await clientService.listAllClientsService(
    offset,
    limit,
    store
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listClientSolicitationController = async (req, res) => {
  const { search } = req.params
  const offset = Number(req.query.offset) || 30
  const limit = Number(req.query.limit) || 30
  const { store } = req.query

  const resultService = await clientService.listClientSolicitationService(
    offset,
    limit,
    store,
    search
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listClientSearchController = async (req, res) => {
  const { search } = req.params
  const offset = Number(req.query.offset) || 30
  const limit = Number(req.query.limit) || 30
  const { store } = req.query

  const resultService = await clientService.listClientSearchService(
    offset,
    limit,
    store,
    search
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllClientsController,
  listClientSolicitationController,
  listClientSearchController
}
