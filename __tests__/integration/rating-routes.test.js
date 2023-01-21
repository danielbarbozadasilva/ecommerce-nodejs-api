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
    test('Make sure /v1/rating/product/:productid return 422 if the product id is incorrect', async () => {
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

  describe('Route DELETE /v1/rating', () => {
    test('Make sure /v1/rating return 200 on delete rating', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const productid = '63432f02a7f855351c99dc71'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/rating?clientid=${clientid}&productid=${productid}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/rating return 422 if the product id is incorrect ', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const productid = '63432f02a7f855351c99dc90'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/rating?clientid=${clientid}&productid=${productid}`)
        .set(result)
        .expect(422)
    })
    test('Make sure /v1/rating return 422 if the client id is incorrect ', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586c'
      const productid = '63432f02a7f855351c99dc71'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/rating?clientid=${clientid}&productid=${productid}`)
        .set(result)
        .expect(422)
    })
    test('Make sure /v1/rating return 422 if the rating not exists', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586c'
      const productid = '63970c5915c445c9c84a9bee'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/rating?clientid=${clientid}&productid=${productid}`)
        .set(result)
        .expect(422)
    })
  })

  describe('Route GET /v1/rating/:ratingid', () => {
    test('Make sure /v1/rating/:ratingid return 200 on rating by id', async () => {
      const ratingid = '638a236a0ef44976d1687126'
      const productid = '63432f02a7f855351c99dc72'
      await request(app)
        .get(`/v1/rating/${ratingid}?productid=${productid}`)
        .expect(200)
    })
    test('Make sure /v1/rating/:ratingid return 422 if the rating id is incorrect ', async () => {
      const ratingid = '638a22b10ef44976d168711f'
      const productid = '63432f02a7f855351c99dc72'
      await request(app)
        .get(`/v1/rating/${ratingid}?productid=${productid}`)
        .expect(422)
    })
    test('Make sure /v1/rating/:ratingid return 422 if the product id is incorrect ', async () => {
      const ratingid = '638a236a0ef44976d1687126'
      const productid = '63432f02a7f855351c99dc11'
      await request(app)
        .get(`/v1/rating/${ratingid}?productid=${productid}`)
        .expect(422)
    })
  })
})
