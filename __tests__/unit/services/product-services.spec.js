const { ObjectId } = require('mongodb')
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
      const data = {
        title: 'Placa de Vídeo RTX 4090',
        availability: true,
        description: 'GeForce RTX 4090 24GB GDDR6X, DLSS, Ray Tracing',
        photos: [],
        price: 2399.99,
        promotion: 1199.99,
        sku: 'PVNV4090RTX',
        quantity: 50,
        blockedQuantity: 0,
        dimensions: {
          height: 8,
          width: 10,
          depth: 27
        },
        weight: 1,
        freeShipping: false,
        category: ObjectId('6320f577156b47ff1082586e')
      }

      const result = await services.createProductService(data)
      expect(result.success).toBe(true)
    })
  })
})
