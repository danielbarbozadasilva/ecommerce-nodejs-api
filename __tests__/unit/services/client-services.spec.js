const services = require('../../../api/services/services.client')
const { createConnection, closeConnection } = require('../../helpers')

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
  })
})
