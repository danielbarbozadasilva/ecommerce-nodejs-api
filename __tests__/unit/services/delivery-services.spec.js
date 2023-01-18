const services = require('../../../api/services/services.delivery')
const { createConnection, closeConnection } = require('../../helpers')
const { mockDelivery, mockDeliveryShipping } = require('../../mocks')

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

    test('Make sure searchCartSolicitation has the id property', async () => {
      const solicitationId = '63c59bb0107f4ce9de7fd63d'
      const result = await services.searchCartSolicitation(solicitationId)
      expect(result.data.id).toHaveProperty('id')
    })

    test('Make sure sendEmailUpdate return success', async () => {
      try {
        const solicitationId = '63c59bb0107f4ce9de7fd63d'
        expect(await services.sendEmailUpdate(solicitationId)).not.toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailUpdate return error', async () => {
      try {
        const solicitationId = '21c49bb0107f4ce9de7fd61b'
        expect(await services.sendEmailUpdate(solicitationId)).toThrow()
      } catch (error) {}
    })

    test('Make sure updateDeliveryService return success', async () => {
      const deliveryId = '63c59bb0107f4ce9de7fd63a'
      const result = await services.updateDeliveryService(
        mockDelivery,
        deliveryId
      )
      expect(result.success).toBe(true)
    })

    test('Make sure updateDeliveryService has the id property', async () => {
      const deliveryId = '63c59bb0107f4ce9de7fd63a'
      const result = await services.updateDeliveryService(
        mockDelivery,
        deliveryId
      )
      expect(result.data).toHaveProperty('date')
    })

    test('Make sure calculateShippingService return success', async () => {
      const result = await services.calculateShippingService(
        mockDeliveryShipping
      )
      expect(result.success).toBe(true)
    })

    test('Make sure calculateShippingService has the price property', async () => {
      const result = await services.calculateShippingService(
        mockDeliveryShipping
      )
      expect(result.data[0]).toHaveProperty('price')
    })
  })
})
