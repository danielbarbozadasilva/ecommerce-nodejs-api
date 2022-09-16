const clientService = require('../services/services.client')

const listAllClientsController = async (req, res) => {
  const { offset, limit, storeid } = req.query

  const resultService = await clientService.listAllClientsService(
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

const searchClientSolicitationController = async (req, res) => {
  const { offset, limit, storeid } = req.query
  const { search } = req.params

  const resultService = await clientService.listClientSolicitationService(
    offset,
    limit,
    storeid,
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
  const { offset, limit, storeid } = req.query
  const { search } = req.params

  const resultService = await clientService.listClientSearchService(
    offset,
    limit,
    storeid,
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
  const { storeid } = req.query

  const resultService = await clientService.listByIdClientService(
    clientid,
    storeid
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
  const { storeid } = req.query
  const { body } = req

  const resultService = await clientService.updateClientService(
    clientid,
    storeid,
    body
  )
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
  const { offset, limit, storeid } = req.query

  const resultService = await clientService.listSolicitationService(
    offset,
    limit,
    storeid,
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
  const { storeid } = req.query
  const { body } = req

  const resultService = await clientService.createClientService(storeid, body)
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
