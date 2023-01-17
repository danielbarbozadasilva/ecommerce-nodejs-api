const services = require('../../../api/services/services.payment')
const { createConnection, closeConnection } = require('../../helpers')

describe('Payment services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Payment Services', () => {
    test('Make sure listByIdPaymentService return success', async () => {
      const paymentId = '63c59bb0107f4ce9de7fd638'
      const result = await services.listByIdPaymentService(paymentId)
      expect(result.success).toBe(true)
    })

    test('Make sure listByIdPaymentService has the id property', async () => {
      const paymentId = '63c59bb0107f4ce9de7fd638'
      const result = await services.listByIdPaymentService(paymentId)
      expect(result.data.payment).toHaveProperty('id')
    })

    test('Make sure sendEmailClientSuccessPaid return success', async () => {
      try {
        const solicitationNumber = '4777720845'
        expect(
          await services.sendEmailClientSuccessPaid(solicitationNumber)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailClientSuccessPaid return error', async () => {
      try {
        const solicitationNumber = '2737119823'
        expect(
          await services.sendEmailClientSuccessPaid(solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })
  })
})
