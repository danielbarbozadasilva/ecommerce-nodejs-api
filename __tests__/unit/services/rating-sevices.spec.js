const services = require('../../../api/services/services.rating')
const { createConnection, closeConnection } = require('../../helpers')

describe('Rating services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Rating Services', () => {
    test('Make sure listAllRatingService return success', async () => {
      const result = await services.listAllRatingService()
      expect(result.success).toBe(true)
    })
  })
})
