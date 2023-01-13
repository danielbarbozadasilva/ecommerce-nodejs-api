const services = require('../../../api/services/services.product')
const { createConnection, closeConnection } = require('../../helpers')

describe('Product services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Product Services', () => {
    test('Make sure listAllProductService return success', async () => {
      const sortType = 'alfabetica_z-a'
      const offset = 5
      const limit = 1
      const result = await services.listAllProductService(
        sortType,
        offset,
        limit
      )
      expect(result.success).toBe(true)
    })
    test('Make sure listAllProductService has the id property', async () => {
      const sortType = 'alfabetica_z-a'
      const offset = 5
      const limit = 1
      const result = await services.listAllProductService(
        sortType,
        offset,
        limit
      )
      expect(result.data[0].data[0].id).toHaveProperty('id')
    })
  })
})
