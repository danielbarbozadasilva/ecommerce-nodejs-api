const clientService = require('../services/services.client')

const listAllClientsController = async (req, res) => {
  const { offset, limit } = req.query
  const resultService = await clientService.listAllClientsService(offset, limit)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const searchClientSolicitationController = async (req, res) => {
  const { offset, limit } = req.query
  const { search } = req.params
  const resultService = await clientService.listClientSolicitationService(
    offset,
    limit,
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
  const { offset, limit } = req.query
  const { search } = req.params
  const resultService = await clientService.listClientSearchService(
    offset,
    limit,
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
  const resultService = await clientService.listByIdClientService(clientid)
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

const listSolicitationClientController = async (req, res) => {
  const { clientid } = req.params
  const { offset, limit } = req.query
  const resultService = await clientService.listSolicitationClientService(
    offset,
    limit,
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
  listSolicitationClientController,
  createClientController
}
