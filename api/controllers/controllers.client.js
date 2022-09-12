const clientService = require('../services/services.client')

const listAllClientsController = async (req, res) => {
  const { store, offset, limit } = req.query

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
  const { offset, limit, store } = req.query
  const { search } = req.params

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
  const { offset, limit, store } = req.query
  const { search } = req.params

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

const listByIdClientController = async (req, res) => {
  const { clientid } = req.params
  const { store } = req.query

  const resultService = await clientService.listByIdClientService(
    clientid,
    store
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updaterClientController = async (req, res) => {
  const { clientid } = req.params
  const { body } = req

  const resultService = await clientService.updateClientService(clientid, body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteClientController = async (req, res) => {
  const { clientid } = req.params

  const resultService = await clientService.deleteClientService(clientid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listSolicitationController = async (req, res) => {
  const { clientid } = req.params
  const { offset, limit, store } = req.query

  const resultService = await clientService.listSolicitationService(
    offset,
    limit,
    store,
    clientid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const createClientController = async (req, res) => {
  const { body } = req

  const resultService = await clientService.createClientService(body)
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
  listByIdClientController,
  updaterClientController,
  deleteClientController,
  listSolicitationController,
  createClientController
}
