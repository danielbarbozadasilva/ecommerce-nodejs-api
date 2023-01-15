const services = require('../../../api/services/services.product')
const { createConnection, closeConnection } = require('../../helpers')
const { mockProduct } = require('../../mocks')

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

    test('Make sure listProductService return success', async () => {
      const sortType = 'alfabetica_z-a'
      const result = await services.listProductService(sortType)
      expect(result.success).toBe(true)
    })

    test('Make sure listProductService has the id property', async () => {
      const sortType = 'alfabetica_z-a'
      const result = await services.listProductService(sortType)
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure listByIdProductService return success', async () => {
      const productId = '63432f02a7f855351c99dc72'
      const result = await services.listByIdProductService(productId)
      expect(result.success).toBe(true)
    })

    test('Make sure listByIdProductService has the id property', async () => {
      const productId = '63432f02a7f855351c99dc72'
      const result = await services.listByIdProductService(productId)
      expect(result.data.id).toHaveProperty('id')
    })

    test('Make sure createProductService return success', async () => {
      const result = await services.createProductService(mockProduct)
      expect(result.success).toBe(true)
    })

    test('Make sure createProductService return id property', async () => {
      const result = await services.createProductService(mockProduct)
      expect(result.data.id).toHaveProperty('id')
    })

    test('Make sure updateProductService return success', async () => {
      const productId = '63432f02a7f855351c99dc71'
      const result = await services.updateProductService(
        mockProduct,
        mockProduct.files,
        productId
      )
      expect(result.success).toBe(true)
    })

    test('Make sure deleteProductService return success', async () => {
      const productId = '63432f02a7f855351c99dc71'
      const result = await services.deleteProductService(productId)
      expect(result.success).toBe(true)
    })

    test('Make sure listAvailableProductService return success', async () => {
      const sortType = 'alfabetica_z-a'
      const result = await services.listAvailableProductService(sortType)
      expect(result.success).toBe(true)
    })

    test('Make sure listAvailableProductService return id property', async () => {
      const sortType = 'alfabetica_z-a'
      const result = await services.listAvailableProductService(sortType)
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure searchProductService return success', async () => {
      const offset = 6
      const limit = 1
      const search = 'Smartphone'
      const sortType = 'alfabetica_z-a'

      const result = await services.searchProductService(
        sortType,
        offset,
        limit,
        search
      )
      expect(result.success).toBe(true)
    })
  })
})
