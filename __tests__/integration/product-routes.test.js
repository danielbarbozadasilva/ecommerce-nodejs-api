const request = require('supertest')
const app = require('../../api/app')
const { createCredentialService } = require('../../api/services/services.user')
const { createConnection, closeConnection } = require('../helpers')
const { mockProduct } = require('../mocks')

describe('Product Routes', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Route GET /v1/product', () => {
    test('Make sure /v1/product return 200 on search', async () => {
      await request(app).get(`/v1/product`).expect(200)
    })
  })

  describe('Route POST /v1/product', () => {
    test('Make sure /v1/product return 200 on create product', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .post(`/v1/product`)
        .send(mockProduct)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/product return 401 on create product', async () => {
      await request(app).post(`/v1/product`).send(mockProduct).expect(401)
    })
  })

  describe('Route GET /v1/product/:productid', () => {
    test('Make sure /v1/product/:productid return 200 on product id search', async () => {
      const productid = '63432f02a7f855351c99dc72'
      await request(app).get(`/v1/product/${productid}`).expect(200)
    })

    test('Make sure /v1/product/:productid return 422 if product id does not exist', async () => {
      const productid = '63433ba03a63723e66f5f61c'
      await request(app).get(`/v1/product/${productid}`).expect(422)
    })
  })

  describe('Route PUT /v1/product/:productid', () => {
    test('Make sure /v1/product/:productid return 200 on product id update', async () => {
      const productid = '63432f02a7f855351c99dc72'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/product/${productid}`)
        .send(mockProduct)
        .set(result)
        .expect(200)
    })

    test('Make sure /v1/product/:productid return 401 on product id update', async () => {
      const productid = '63432f02a7f855351c99dc72'
      await request(app)
        .put(`/v1/product/${productid}`)
        .send(mockProduct)
        .expect(401)
    })

    test('Make sure /v1/product/:productid return 422 if product id does not exist', async () => {
      const productid = '63433ba03a63723e66f5f61f'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/product/${productid}`)
        .send(mockProduct)
        .set(result)
        .expect(422)
    })
  })

  describe('Route DELETE /v1/product/:productid', () => {
    test('Make sure /v1/product/:productid return 200 on product delete', async () => {
      const productid = '639702b94bf6b326dbc5ae87'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/product/${productid}`)
        .set(result)
        .expect(200)
    })

    test('Make sure /v1/product/:productid return 422 if product id does not exist', async () => {
      const productid = '63433ba03a63723e66f5f61f'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/product/${productid}`)
        .set(result)
        .expect(422)
    })
  })
})
