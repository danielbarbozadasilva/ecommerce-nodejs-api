const request = require('supertest')
const app = require('../../api/app')
const { createCredentialService } = require('../../api/services/services.user')
const { createConnection, closeConnection } = require('../helpers')
const { mockRatingCreate } = require('../mocks')

describe('Rating Routes', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Route GET /v1/rating/product/:productid', () => {
    test('Make sure /v1/rating/product/:productid return 200 on search', async () => {
      const productid = '63432f02a7f855351c99dc71'
      await request(app).get(`/v1/rating/product/${productid}`).expect(200)
    })
    test('Make sure /v1/rating/product/:productid return 200 on search', async () => {
      const productid = '63432f02a7f855351c99dc11'
      await request(app).get(`/v1/rating/product/${productid}`).expect(422)
    })
  })

  describe('Route GET /v1/rating', () => {
    test('Make sure /v1/rating return 200 on search', async () => {
      await request(app).get(`/v1/rating`).expect(200)
    })
  })

  describe('Route POST /v1/rating', () => {
    test('Make sure /v1/rating return 200 on create rating', async () => {
      const email = 'daniel95barboza@gmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .post(`/v1/rating`)
        .send(mockRatingCreate)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/rating return 401 on create rating', async () => {
      await request(app).post(`/v1/rating`).send(mockRatingCreate).expect(401)
    })
  })
})
