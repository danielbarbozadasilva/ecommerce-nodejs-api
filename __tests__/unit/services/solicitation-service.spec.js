const services = require('../../../api/services/services.solicitation')
const { createConnection, closeConnection } = require('../../helpers')

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

  
  })
})
