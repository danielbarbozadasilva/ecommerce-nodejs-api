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

    test('Make sure /v1/check-token return 400 if the token are not valid', async () => {
      await request(app)
        .post('/v1/check-token')
        .send({
          token: ''
        })
        .expect(400)
    })
    test('Make sure /v1/refresh-token return 200 when generating the token', async () => {
      const email = 'daniel95barboza@gmail.com'
      const password = 'daniel'
      const auth = await services.authService(email, password)
      await request(app)
        .post('/v1/refresh-token')
        .send({
          token: auth.data.token
        })
        .expect(200)
    })

    test('Make sure /v1/refresh-token return 400 if the token are not valid', async () => {
      await request(app)
        .post('/v1/refresh-token')
        .send({
          token: ''
        })
        .expect(400)
    })
    test('Make sure /v1/user/recovery/password-recovery return 200 when generating the token', async () => {
      await request(app)
        .put('/v1/user/recovery/password-recovery')
        .send({
          email: 'daniel95barboza@gmail.com'
        })
        .expect(200)
    })
    test('Make sure /v1/user/recovery/password-recovery return 400 if the email does not exist', async () => {
      await request(app)
        .put('/v1/user/recovery/password-recovery')
        .send({
          email: 'example@gmail.com'
        })
        .expect(400)
    })
    test('Make sure /v1/user/recovery/reset-password return 200 if the token is correct', async () => {
      const data = { email: 'daniel95barboza@gmail.com' }
      const auth = await services.sendTokenRecoveryPasswordService(data)
      await request(app)
        .put('/v1/user/recovery/reset-password')
        .send({
          email: 'daniel95barboza@gmail.com',
          token: auth.data.recovery.token,
          newPassword: 'daniel'
        })
        .expect(200)
    })
    test('Make sure /v1/user/recovery/reset-password return 400 if the token is incorrect', async () => {
      await request(app)
        .put('/v1/user/recovery/reset-password')
        .send({
          email: 'daniel95barboza@gmail.com',
          token: 'sdfsdfsdfsd',
          newPassword: 'daniel'
        })
        .expect(400)
    })
  })
})
