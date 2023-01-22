const request = require('supertest')
const app = require('../../api/app')
const { createCredentialService } = require('../../api/services/services.user')
const { createConnection, closeConnection } = require('../helpers')
const { mockCategory } = require('../mocks')

describe('Category Routes', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Route GET /v1/category', () => {
    test('Make sure /v1/category return 200 on search', async () => {
      await request(app).get(`/v1/category`).expect(200)
    })
  })

  describe('Route POST /v1/category', () => {
    test('Make sure /v1/category return 200 on create category', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .post(`/v1/category`)
        .send(mockCategory)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/category return 401 on create category', async () => {
      await request(app).post(`/v1/category`).send(mockCategory).expect(401)
    })
  })

  describe('Route GET /v1/category/:categoryid', () => {
    test('Make sure /v1/category/:categoryid return 200 on category id search', async () => {
      const categoryid = '63433ba03a63723e66f5f62d'
      await request(app).get(`/v1/category/${categoryid}`).expect(200)
    })

    test('Make sure /v1/category/:categoryid return 422 if category id does not exist', async () => {
      const categoryid = '63433ba03a63723e66f5f61c'
      await request(app).get(`/v1/category/${categoryid}`).expect(422)
    })
  })

  describe('Route PUT /v1/category/:categoryid', () => {
    test('Make sure /v1/category/:categoryid return 200 on update', async () => {
      const categoryid = '63433ba03a63723e66f5f62d'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/category/${categoryid}`)
        .send(mockCategory)
        .set(result)
        .expect(200)
    })

    test('Make sure /v1/category/:categoryid return 401 if user does not authenticated', async () => {
      const categoryid = '63433ba03a63723e66f5f62d'
      await request(app)
        .put(`/v1/category/${categoryid}`)
        .send(mockCategory)
        .expect(401)
    })

    test('Make sure /v1/category/:categoryid return 422 if category id does not exist', async () => {
      const categoryid = '63433ba03a63723e66f5f61f'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/category/${categoryid}`)
        .send(mockCategory)
        .set(result)
        .expect(422)
    })
  })

  describe('Route DELETE /v1/category/:categoryid', () => {
    test('Make sure /v1/category/:categoryid return 422 if category id does not exist', async () => {
      const categoryid = '63433ba03a63723e66f5f61f'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/category/${categoryid}`)
        .set(result)
        .expect(422)
    })
  })
})
