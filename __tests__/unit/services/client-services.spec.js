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
  })
})
