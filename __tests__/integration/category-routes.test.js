const request = require('supertest')
const app = require('../../api/app')
const { createCredentialService } = require('../../api/services/services.user')
const { createConnection, closeConnection } = require('../helpers')

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
        .send({
          name: 'Cameras',
          code: '51421148302633523',
          photo: ''
        })
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/category return 401 on create category', async () => {
      await request(app)
        .post(`/v1/category`)
        .send({
          name: 'Cameras',
          code: '51421148302633523',
          photo: ''
        })
        .expect(401)
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
})
