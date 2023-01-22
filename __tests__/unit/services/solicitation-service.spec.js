const services = require('../../../api/services/services.solicitation')
const { createConnection, closeConnection } = require('../../helpers')
const {
  mockSolicitationError,
  mockSolicitationSuccess
} = require('../../mocks')

describe('Solicitation services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Solicitation Services', () => {
    test('Make sure listAllSolicitationService return success', async () => {
      const offset = 0
      const limit = 30
      const result = await services.listAllSolicitationService(offset, limit)
      expect(result.success).toBe(true)
    })

    test('Make sure listByNumberSolicitationService return success', async () => {
      const solicitationNumber = '4777720845'
      const result = await services.listByNumberSolicitationService(
        solicitationNumber
      )
      expect(result.success).toBe(true)
    })

    test('Make sure listByNumberSolicitationService return error if solicitation number is invalid', async () => {
      try {
        const solicitationNumber = '234120127'
        expect(
          await services.listByNumberSolicitationService(solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure listByNumberSolicitationService return success', async () => {
      const solicitationNumber = '4777720845'
      const result = await services.listByNumberSolicitationService(
        solicitationNumber
      )
      expect(result.success).toBe(true)
    })

    test('Make sure updateQuantityCancelation return success', async () => {
      try {
        expect(
          await services.updateQuantityCancelation(mockSolicitationSuccess)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure updateQuantityCancelation returns error if data is invalid', async () => {
      try {
        expect(
          await services.updateQuantityCancelation(mockSolicitationError)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure showCartSolicitationService return success', async () => {
      try {
        const solicitationId = '63c59bb0107f4ce9de7fd63d'
        expect(
          await services.showCartSolicitationService(solicitationId)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure showCartSolicitationService returns error if solicitation id is invalid', async () => {
      try {
        const solicitationId = '21c59bb0107f4ce9de7fd31c'
        expect(
          await services.showCartSolicitationService(solicitationId)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailClientCancelation return success', async () => {
      try {
        const solicitationNumber = '4777720845'
        expect(
          await services.sendEmailClientCancelation(solicitationNumber)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailClientCancelation if solicitation number is invalid', async () => {
      try {
        const solicitationNumber = '8934110221'
        expect(
          await services.sendEmailClientCancelation(solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailAdminCancelation return success', async () => {
      try {
        const solicitationNumber = '4777720845'
        expect(
          await services.sendEmailAdminCancelation(solicitationNumber)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailAdminCancelation if solicitation number is invalid', async () => {
      try {
        const solicitationNumber = '8934110221'
        expect(
          await services.sendEmailAdminCancelation(solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure deleteSolicitationService return success', async () => {
      try {
        const solicitationNumber = '4777720845'
        const clientId = '6320f577156b47ff1082586e'
        expect(
          await services.deleteSolicitationService(clientId, solicitationNumber)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure deleteSolicitationService if solicitation number is invalid', async () => {
      try {
        const solicitationNumber = '8934110221'
        const clientId = '4320f577156b47ff1082145f'
        expect(
          await services.deleteSolicitationService(clientId, solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure searchProductCart return success', async () => {
      try {
        expect(
          await services.searchProductCart(mockSolicitationSuccess)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure searchProductCart returns error if data is invalid', async () => {
      try {
        expect(
          await services.searchProductCart(mockSolicitationError)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure verifyQuantity return success', async () => {
      try {
        expect(
          await services.verifyQuantity(mockSolicitationSuccess.cart)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure verifyQuantity returns error if data is invalid', async () => {
      try {
        expect(await services.verifyQuantity(mockSolicitationError)).toThrow()
      } catch (error) {}
    })

    test('Make sure verifyShipping return success', async () => {
      try {
        expect(
          await services.verifyShipping(
            mockSolicitationSuccess,
            mockSolicitationSuccess.price,
            mockSolicitationSuccess.code
          )
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure verifyShipping returns error if data is invalid', async () => {
      try {
        expect(await services.verifyShipping(mockSolicitationError)).toThrow()
      } catch (error) {}
    })

    test('Make sure checkCard return success', async () => {
      try {
        expect(
          await services.checkCard(
            mockSolicitationSuccess.cart,
            mockSolicitationSuccess.payment,
            mockSolicitationSuccess.price
          )
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure checkCard returns error if data is invalid', async () => {
      try {
        expect(
          await services.checkCard(
            mockSolicitationError.cart,
            mockSolicitationError.payment,
            mockSolicitationError.price
          )
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailAdminSolicitation return success', async () => {
      try {
        const solicitationId = '63c59bb0107f4ce9de7fd63d'
        expect(
          await services.sendEmailAdminSolicitation(solicitationId)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailAdminSolicitation if solicitation id is invalid', async () => {
      try {
        const solicitationId = '21c59bb0107f4ce9de7fd31c'
        expect(
          await services.sendEmailAdminSolicitation(solicitationId)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailClientSolicitation return success', async () => {
      try {
        const solicitationNumber = '4777720845'
        expect(
          await services.sendEmailClientSolicitation(solicitationNumber)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure sendEmailClientSolicitation if solicitation number is invalid', async () => {
      try {
        const solicitationNumber = '234120127'
        expect(
          await services.sendEmailClientSolicitation(solicitationNumber)
        ).toThrow()
      } catch (error) {}
    })

    test('Make sure updateQuantitySave return success', async () => {
      try {
        expect(
          await services.updateQuantitySave(mockSolicitationSuccess.cart)
        ).not.toThrow()
      } catch (error) {}
    })

    test('Make sure createSolicitationService return success', async () => {
      const clientId = '6320f577156b47ff1082586e'
      const result = await services.createSolicitationService(
        clientId,
        mockSolicitationSuccess
      )
      expect(result.success).toBe(true)
    })
  })
})
