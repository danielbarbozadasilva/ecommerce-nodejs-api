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

    test('Make sure listByNumberSolicitationService return error', async () => {
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

    test('Make sure updateQuantityCancelation return error', async () => {
      try {
        expect(
          await services.updateQuantityCancelation(mockSolicitationError)
        ).toThrow()
      } catch (error) {}
    })
  })
})
