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
})
