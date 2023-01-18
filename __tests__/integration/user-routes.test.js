const request = require('supertest')
const app = require('../../api/app')
const { createConnection, closeConnection } = require('../helpers')
const services = require('../../api/services/services.user')

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

    test('Make sure /v1/auth return 401 if the credentials are not valid', async () => {
      await request(app)
        .post('/v1/auth')
        .send({
          email: 'exemplo01@gmail.com',
          password: 'exemplo01'
        })
        .expect(401)
    })

    test('Make sure /v1/check-token return 200 if the token are valid', async () => {
      const email = 'daniel95barboza@gmail.com'
      const password = 'daniel'
      const auth = await services.authService(email, password)
      await request(app)
        .post('/v1/check-token')
        .send({
          token: auth.data.token
        })
        .expect(200)
    })

  
  })
})
