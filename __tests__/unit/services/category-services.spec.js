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

    test('Make sure listAllCategoryService has the id property', async () => {
      const result = await services.listAllCategoryService()
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure listCategoryByIdService return success', async () => {
      const id = '6320f577156b47ff1082586e'
      const result = await services.listCategoryByIdService(id)
      expect(result.success).toBe(true)
    })

   
  })
})
