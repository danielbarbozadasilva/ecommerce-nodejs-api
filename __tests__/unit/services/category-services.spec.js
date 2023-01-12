const services = require('../../../api/services/services.category')
const { createConnection, closeConnection } = require('../../helpers')

describe('Category services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(() => {
    closeConnection()
  })

  describe('Category Services', () => {
    test('Make sure listAllCategoryService return success', async () => {
      const result = await services.listAllCategoryService()
      expect(result.success).toBe(true)
    })
  })
})
