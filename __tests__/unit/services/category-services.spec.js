const services = require('../../../api/services/services.category')
const { createConnection, closeConnection } = require('../../helpers')

describe('Category services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
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
      const id = '638f00c265f1c700b416aa07'
      const result = await services.listCategoryByIdService(id)
      expect(result.success).toBe(true)
    })

    test('Make sure listCategoryByIdService has the id property', async () => {
      const id = '638f00c265f1c700b416aa07'
      const result = await services.listCategoryByIdService(id)
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure createCategoryService return success', async () => {
      const data = {
        name: 'Teclados',
        code: '21421148302633566',
        photo: ''
      }
      const files = [{ filename: '' }]
      const result = await services.createCategoryService(data, files)
      expect(result.success).toBe(true)
    })

    test('Make sure createCategoryService returns error if data is invalid', async () => {
      try {
        const data = {
          name: '',
          code: ''
        }
        const files = [{ filename: '' }]
        await services.createCategoryService(data, files)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })

    test('Make sure updateCategoryService return success', async () => {
      const categoryId = '63433ba03a63723e66f5f62d'
      const data = {
        name: 'Teclados',
        code: '21421148302633566'
      }
      const files = [{ filename: '' }]
      const result = await services.updateCategoryService(
        categoryId,
        data,
        files
      )
      expect(result.success).toBe(true)
    })

    test('Make sure updateCategoryService returns error if data is invalid', async () => {
      try {
        const categoryId = '6320f577156b47ff1082586e'
        const data = {
          name: 'Teclados',
          code: '21421148302633566'
        }
        const files = [{ filename: '' }]
        await services.updateCategoryService(categoryId, data, files)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })

    test('Make sure deleteCategoryService return success', async () => {
      const categoryId = '638f00f265f1c700b416aa0c'
      const result = await services.deleteCategoryService(categoryId)
      expect(result.success).toBe(true)
    })

    test('Make sure deleteCategoryService returns error if data is invalid', async () => {
      try {
        const categoryId = '6320f577156b47ff1082575b'
        await services.deleteCategoryService(categoryId)
      } catch (error) {
        expect(error.statusCode).toBe(500)
      }
    })
  })
})
