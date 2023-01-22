const services = require('../../../api/services/services.rating')
const { createConnection, closeConnection } = require('../../helpers')
const { mockRating } = require('../../mocks')

describe('Rating services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Rating Services', () => {
    test('Make sure listAllRatingService return success', async () => {
      const result = await services.listAllRatingService()
      expect(result.success).toBe(true)
    })

    test('Make sure listAllRatingService has the id property', async () => {
      const result = await services.listAllRatingService()
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure listRatingProductService return success', async () => {
      const productId = '63432f02a7f855351c99dc71'
      const result = await services.listRatingProductService(productId)
      expect(result.success).toBe(true)
    })

    test('Make sure listRatingProductService has the id property', async () => {
      const productId = '63432f02a7f855351c99dc71'
      const result = await services.listRatingProductService(productId)
      expect(result.data[0].id).toHaveProperty('id')
    })

    test('Make sure createRatingProductService return success', async () => {
      const result = await services.createRatingProductService(mockRating)
      expect(result.success).toBe(true)
    })

    test('Make sure createRatingProductService has the id property', async () => {
      const result = await services.createRatingProductService(mockRating)
      expect(result.data.id).toHaveProperty('id')
    })

    test('Make sure listByIdRatingProductService return success', async () => {
      const ratingid = '638a22b10ef44976d168711e'
      const productid = '63432f02a7f855351c99dc71'
      const result = await services.listByIdRatingProductService(
        ratingid,
        productid
      )
      expect(result.success).toBe(true)
    })

    test('Make sure listByIdRatingProductService has the id property', async () => {
      const ratingid = '638a22b10ef44976d168711e'
      const productid = '63432f02a7f855351c99dc71'
      const result = await services.listByIdRatingProductService(
        ratingid,
        productid
      )
      expect(result.data.id).toHaveProperty('id')
    })

    test('Make sure deleteRatingProductService return success', async () => {
      const clientid = '6320f577156b47ff1082586e'
      const productid = '63432f02a7f855351c99dc72'
      const result = await services.deleteRatingProductService(
        clientid,
        productid
      )
      expect(result.success).toBe(true)
    })
  })
})
