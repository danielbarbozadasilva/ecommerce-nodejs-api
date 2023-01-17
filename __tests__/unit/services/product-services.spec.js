// const services = require('../../../api/services/services.product')
// const { createConnection, closeConnection } = require('../../helpers')
// const { mockProduct } = require('../../mocks')

// describe('Product services', () => {
//   beforeAll(() => {
//     createConnection()
//   })

//   afterAll(async () => {
//     await closeConnection()
//   })

//   describe('Product Services', () => {
//     test('Make sure listAllProductService return success', async () => {
//       const sortType = 'alfabetica_z-a'
//       const offset = 5
//       const limit = 1
//       const result = await services.listAllProductService(
//         sortType,
//         offset,
//         limit
//       )
//       expect(result.success).toBe(true)
//     })

//     test('Make sure listAllProductService has the id property', async () => {
//       const sortType = 'alfabetica_z-a'
//       const offset = 5
//       const limit = 1
//       const result = await services.listAllProductService(
//         sortType,
//         offset,
//         limit
//       )
//       expect(result.data[0].data[0].id).toHaveProperty('id')
//     })

//     test('Make sure listProductService return success', async () => {
//       const sortType = 'alfabetica_z-a'
//       const result = await services.listProductService(sortType)
//       expect(result.success).toBe(true)
//     })

//     test('Make sure listProductService has the id property', async () => {
//       const sortType = 'alfabetica_z-a'
//       const result = await services.listProductService(sortType)
//       expect(result.data[0].id).toHaveProperty('id')
//     })

//     test('Make sure listByIdProductService return success', async () => {
//       const productId = '63432f02a7f855351c99dc72'
//       const result = await services.listByIdProductService(productId)
//       expect(result.success).toBe(true)
//     })

//     test('Make sure listByIdProductService has the id property', async () => {
//       const productId = '63432f02a7f855351c99dc72'
//       const result = await services.listByIdProductService(productId)
//       expect(result.data.id).toHaveProperty('id')
//     })

//     test('Make sure createProductService return success', async () => {
//       const result = await services.createProductService(mockProduct)
//       expect(result.success).toBe(true)
//     })

//     test('Make sure createProductService return id property', async () => {
//       const result = await services.createProductService(mockProduct)
//       expect(result.data.id).toHaveProperty('id')
//     })

//     test('Make sure updateProductService return success', async () => {
//       const productId = '63432f02a7f855351c99dc71'
//       const result = await services.updateProductService(
//         mockProduct,
//         mockProduct.files,
//         productId
//       )
//       expect(result.success).toBe(true)
//     })

//     test('Make sure listAvailableProductService return success', async () => {
//       const sortType = 'alfabetica_z-a'
//       const result = await services.listAvailableProductService(sortType)
//       expect(result.success).toBe(true)
//     })

//     test('Make sure listAvailableProductService return id property', async () => {
//       const sortType = 'alfabetica_z-a'
//       const result = await services.listAvailableProductService(sortType)
//       expect(result.data[0].id).toHaveProperty('id')
//     })

//     test('Make sure searchProductService return success', async () => {
//       const offset = 0
//       const limit = 30
//       const search = 'Smartphone'
//       const sortType = 'alfabetica_z-a'

//       const result = await services.searchProductService(
//         sortType,
//         offset,
//         limit,
//         search
//       )
//       expect(result.success).toBe(true)
//     })

//     test('Make sure searchProductService return id property', async () => {
//       const offset = 0
//       const limit = 30
//       const search = 'Smartphone'
//       const sortType = 'alfabetica_z-a'

//       const result = await services.searchProductService(
//         sortType,
//         offset,
//         limit,
//         search
//       )
//       expect(result.data[0].data[0].id).toHaveProperty('id')
//     })

//     test('Make sure listRatingProductService return success', async () => {
//       const productId = '63432f02a7f855351c99dc71'
//       const result = await services.listRatingProductService(productId)
//       expect(result.success).toBe(true)
//     })

//     test('Make sure listRatingProductService return id property', async () => {
//       const productId = '63432f02a7f855351c99dc71'
//       const result = await services.listRatingProductService(productId)
//       expect(result.data[0].id).toHaveProperty('id')
//     })

//     test('Make sure listCategoryProductsService return success', async () => {
//       const offset = 0
//       const limit = 30
//       const productId = '63432f02a7f855351c99dc71'
//       const sortType = 'alfabetica_z-a'

//       const result = await services.listCategoryProductsService(
//         sortType,
//         offset,
//         limit,
//         productId
//       )
//       expect(result.success).toBe(true)
//     })

//     test('Make sure listCategoryProductsService return id property', async () => {
//       const offset = 0
//       const limit = 30
//       const categoryId = '6320f577156b47ff1082586e'
//       const sortType = 'alfabetica_z-a'

//       const result = await services.listCategoryProductsService(
//         sortType,
//         offset,
//         limit,
//         categoryId
//       )
//       expect(result.data[0].data[0].id).toHaveProperty('id')
//     })

//     test('Make sure deleteProductService return success', async () => {
//       const productId = '63432f02a7f855351c99dc71'
//       const result = await services.deleteProductService(productId)
//       expect(result.success).toBe(true)
//     })
//   })
// })
