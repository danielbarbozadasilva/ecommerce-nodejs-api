const clientService = require('../services/services.client')

const listAllClientsController = async (req, res) => {
  const { store } = req.query
  const { offset, limit } = req.query

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

const searchClientSolicitationController = async (req, res) => {
  const { search } = req.params
  const { offset, limit, store } = req.query

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
  const { offset, limit, store } = req.query

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

const listAdminController = async (req, res) => {
  const { id } = req.params
  const { store } = req.query

  const resultService = await clientService.listAdminService(id, store)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listSolicitationController = async (req, res) => {
  const { id } = req.params
  const { offset, limit, store } = req.query

  const resultService = await clientService.listSolicitationService(
    offset,
    limit,
    store,
    id
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
  searchClientSolicitationController,
  listClientSearchController,
  listAdminController,
  listSolicitationController
}
