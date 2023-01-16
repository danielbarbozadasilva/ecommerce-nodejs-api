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
  })
})
