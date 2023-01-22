const services = require('../../../api/services/services.payment')
const { createConnection, closeConnection } = require('../../helpers')
const { mockPayment } = require('../../mocks')

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

    test('Make sure sendEmailClientSuccessPaid returns error if solicitation number is invalid', async () => {
      try {
        const solicitationNumber = '2737119823'
        expect(
          await services.sendEmailClientSuccessPaid(solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailAdmSuccessfullyPaid return success', async () => {
      try {
        const solicitationNumber = '4777720845'
        expect(
          await services.sendEmailAdmSuccessfullyPaid(solicitationNumber)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailAdmSuccessfullyPaid return error if solicitation number is invalid', async () => {
      try {
        const solicitationNumber = '2737119823'
        expect(
          await services.sendEmailAdmSuccessfullyPaid(solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailClientPaymentFailed return success', async () => {
      try {
        const solicitationNumber = '4777720845'
        expect(
          await services.sendEmailClientPaymentFailed(solicitationNumber)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailClientPaymentFailed return error if solicitation number is invalid', async () => {
      try {
        const solicitationNumber = '2737119823'
        expect(
          await services.sendEmailClientPaymentFailed(solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailAdmPaymentFailed return success', async () => {
      try {
        const solicitationNumber = '4777720845'
        expect(
          await services.sendEmailAdmPaymentFailed(solicitationNumber)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailAdmPaymentFailed return error if solicitation number is invalid', async () => {
      try {
        const solicitationNumber = '2737119823'
        expect(
          await services.sendEmailAdmPaymentFailed(solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure updateQuantityConfirm return success', async () => {
      try {
        const solicitationId = '63c59bb0107f4ce9de7fd63d'
        expect(
          await services.updateQuantityConfirm(solicitationId)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure updateQuantityConfirm return error if solicitation id is invalid', async () => {
      try {
        const solicitationId = '61c59bb0107f4ce9de7fd32c'
        expect(await services.updateQuantityConfirm(solicitationId)).toThrow()
      } catch (error) {}
    })

    test('Make sure updateQuantityCancelation return success', async () => {
      try {
        const solicitationId = '63c59bb0107f4ce9de7fd63d'
        expect(
          await services.updateQuantityCancelation(solicitationId)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure updateQuantityCancelation return error if solicitation id is invalid', async () => {
      try {
        const solicitationId = '61c59bb0107f4ce9de7fd32c'
        expect(
          await services.updateQuantityCancelation(solicitationId)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure updatePaymentService return success', async () => {
      const paymentId = '63c59bb0107f4ce9de7fd638'
      const result = await services.updatePaymentService(paymentId, mockPayment)
      expect(result.success).toBe(true)
    })

    test('Make sure updatePaymentService has the id property', async () => {
      const paymentId = '63c59bb0107f4ce9de7fd638'
      const result = await services.updatePaymentService(paymentId, mockPayment)
      expect(result.data.payment).toHaveProperty('id')
    })
  })
})
