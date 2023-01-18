const services = require('../../../api/services/services.delivery')
const { createConnection, closeConnection } = require('../../helpers')

describe('Delivery services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Delivery Services', () => {
    test('Make sure listByIdDeliveryService return success', async () => {
      const deliveryId = '63c59bb0107f4ce9de7fd63a'
      const result = await services.listByIdDeliveryService(deliveryId)
      expect(result.success).toBe(true)
    })
  })
})
