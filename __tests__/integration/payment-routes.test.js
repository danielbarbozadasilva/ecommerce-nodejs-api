const request = require('supertest')
const app = require('../../api/app')
const { createCredentialService } = require('../../api/services/services.user')
const { createConnection, closeConnection } = require('../helpers')
const { mockPayment, mockPaymentSender } = require('../mocks')

describe('Payment Routes', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Route GET /v1/payment/session', () => {
    test('Make sure /v1/payment/session return 200 on search', async () => {
      await request(app).get(`/v1/payment/session`).expect(200)
    })
  })

  describe('Route POST /v1/take/payment/:paymentid', () => {
    test('Make sure /v1/take/payment/:paymentid return 200 on create payment', async () => {
      const email = 'daniel95barboza@gmail.com'
      const paymentid = '63c59bb0107f4ce9de7fd638'
      const result = await createCredentialService(email)
      await request(app)
        .post(`/v1/take/payment/${paymentid}`)
        .send(mockPaymentSender)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/take/payment/:paymentid return 401 on create payment', async () => {
      const paymentid = '63c59bb0107f4ce9de7fd638'
      await request(app)
        .post(`/v1/take/payment/${paymentid}`)
        .send(mockPaymentSender)
        .expect(401)
    })
  })

  describe('Route GET /v1/payment/:paymentid', () => {
    test('Make sure /v1/payment/:paymentid return 200 on payment id search', async () => {
      const email = 'daniel95barboza@gmail.com'
      const paymentid = '63c59bb0107f4ce9de7fd638'
      const result = await createCredentialService(email)
      await request(app).get(`/v1/payment/${paymentid}`).set(result).expect(200)
    })

    test('Make sure /v1/payment/:paymentid return 422 if payment id does not exist', async () => {
      const email = 'daniel95barboza@gmail.com'
      const paymentid = '63c59bb0107f4ce9de7fd637'
      const result = await createCredentialService(email)
      await request(app).get(`/v1/payment/${paymentid}`).set(result).expect(422)
    })
  })

  describe('Route PUT /v1/payment/:paymentid', () => {
    test('Make sure /v1/payment/:paymentid return 200 on payment id update', async () => {
      const paymentid = '63c59bb0107f4ce9de7fd638'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/payment/${paymentid}`)
        .send(mockPayment)
        .set(result)
        .expect(200)
    })

    test('Make sure /v1/payment/:paymentid return 401 on payment id update', async () => {
      const paymentid = '63c59bb0107f4ce9de7fd638'
      await request(app)
        .put(`/v1/payment/${paymentid}`)
        .send(mockPayment)
        .expect(401)
    })

    test('Make sure /v1/payment/:paymentid return 422 if payment id does not exist', async () => {
      const paymentid = '63c59bb0107f4ce9de7fd637'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/payment/${paymentid}`)
        .send(mockPayment)
        .set(result)
        .expect(422)
    })
  })
})
