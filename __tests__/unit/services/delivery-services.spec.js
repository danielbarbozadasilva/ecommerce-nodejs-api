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

    test('Make sure listByIdDeliveryService has the id property', async () => {
      const deliveryId = '63c59bb0107f4ce9de7fd63a'
      const result = await services.listByIdDeliveryService(deliveryId)
      expect(result.data.id).toHaveProperty('id')
    })

    test('Make sure searchCartSolicitation return success', async () => {
      const solicitationId = '63c59bb0107f4ce9de7fd63d'
      const result = await services.searchCartSolicitation(solicitationId)
      expect(result.success).toBe(true)
    })

   
  })
})
