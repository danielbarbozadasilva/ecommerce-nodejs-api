const services = require('../../../api/services/services.client')
const { createConnection, closeConnection } = require('../../helpers')
const { clientMock } = require('../../mocks')

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
      const result = await services.updateClientService(clientId, clientMock)
      expect(result.success).toBe(true)
    })

    test('Make sure updateClientService has the id property', async () => {
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.updateClientService(clientId, clientMock)
      expect(result.data).toHaveProperty('token')
    })

    // test('Make sure deleteClientService return success', async () => {
    //   const clientId = '6320f577156b47ff1082586e'
    //   const result = await services.deleteClientService(clientId)
    //   expect(result.success).toBe(true)
    // })

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
  })
})
