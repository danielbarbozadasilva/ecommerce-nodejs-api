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

    test('Make sure listAllRatingService has the id property', async () => {
      const result = await services.listAllRatingService()
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure listRatingProductService return success', async () => {
      const productId = '63432f02a7f855351c99dc71'
      const result = await services.listRatingProductService(productId)
      expect(result.success).toBe(true)
    })
  })
})
