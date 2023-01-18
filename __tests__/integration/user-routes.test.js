const request = require('supertest')
const app = require('../../api/app')
const { createConnection, closeConnection } = require('../helpers')

describe('Auth Routes', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Route /v1/auth', () => {
    test('Make sure /v1/auth return 200 if the credentials are valid', async () => {
      await request(app)
        .post('/v1/auth')
        .send({
          email: 'daniel95barboza@gmail.com',
          password: 'daniel'
        })
        .expect(200)
    })

  })
})
