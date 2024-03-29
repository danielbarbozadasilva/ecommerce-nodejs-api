const services = require('../../../api/services/services.client')
const { createConnection, closeConnection } = require('../../helpers')
const {
  clientMock,
  clientMockInsert,
  clientMockUpdate
} = require('../../mocks')

describe('Client services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Client Services', () => {
    test('Make sure listAllClientsService return success', async () => {
      const result = await services.listAllClientsService()
      expect(result.success).toBe(true)
    })

    test('Make sure listAllClientsService has the id property', async () => {
      const result = await services.listAllClientsService()
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure listClientSolicitationService return success', async () => {
      const search = 'Daniel'
      const offset = 0
      const limit = 30
      const result = await services.listClientSolicitationService(
        offset,
        limit,
        search
      )
      expect(result.success).toBe(true)
    })

    test('Make sure listClientSolicitationService has the id property', async () => {
      const search = 'Daniel'
      const offset = 0
      const limit = 30
      const result = await services.listClientSolicitationService(
        offset,
        limit,
        search
      )
      expect(result.data[0].client.id).toHaveProperty('id')
    })

    test('Make sure listClientSearchService return success', async () => {
      const search = 'Daniel'
      const result = await services.listClientSearchService(search)
      expect(result.success).toBe(true)
    })

    test('Make sure listClientSearchService has the id property', async () => {
      const search = 'Daniel'
      const result = await services.listClientSearchService(search)
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure updateClientService return success', async () => {
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.updateClientService(
        clientId,
        clientMockUpdate
      )
      expect(result.success).toBe(true)
    })

    test('Make sure updateClientService has the token property', async () => {
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.updateClientService(
        clientId,
        clientMockUpdate
      )
      expect(result.data).toHaveProperty('token')
    })

    test('Make sure listByIdClientService return success', async () => {
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.listByIdClientService(clientId)
      expect(result.success).toBe(true)
    })

    test('Make sure listByIdClientService has the id property', async () => {
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.listByIdClientService(clientId)
      expect(result.data.id).toHaveProperty('id')
    })

    test('Make sure listSolicitationClientService return success', async () => {
      const offset = 0
      const limit = 30
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.listSolicitationClientService(
        offset,
        limit,
        clientId
      )
      expect(result.success).toBe(true)
    })

    test('Make sure listSolicitationClientService has the id property', async () => {
      const offset = 0
      const limit = 30
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.listSolicitationClientService(
        offset,
        limit,
        clientId
      )
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure createClientService return success', async () => {
      const result = await services.createClientService(clientMockInsert)
      expect(result.success).toBe(true)
    })

    test('Make sure createClientService has the token property', async () => {
      const result = await services.createClientService(clientMock)
      expect(result.data).toHaveProperty('token')
    })

    test('Make sure listClientLikeProductService return success', async () => {
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.listClientLikeProductService(clientId)
      expect(result.success).toBe(true)
    })

    test('Make sure listClientLikeProductService has the id property', async () => {
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.listClientLikeProductService(clientId)
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure createLikeProductService return success', async () => {
      const clientid = '6320f577156b47ff1082586e'
      const productid = '639702b94bf6b326dbc5ae87'
      const result = await services.createLikeProductService(
        clientid,
        productid
      )
      expect(result.success).toBe(true)
    })

    test('Make sure removeLikeProductService return success', async () => {
      const clientid = '6320f577156b47ff1082586e'
      const productid = '639702b94bf6b326dbc5ae87'
      const result = await services.removeLikeProductService(
        clientid,
        productid
      )
      expect(result.success).toBe(true)
    })
  })
})
