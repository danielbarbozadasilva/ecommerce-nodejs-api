const request = require('supertest')
const app = require('../../api/app')
const { createCredentialService } = require('../../api/services/services.user')
const { createConnection, closeConnection } = require('../helpers')
const { mockDelivery, mockDeliveryShipping } = require('../mocks')

describe('Delivery Routes', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Route GET /v1/delivery/:deliveryid', () => {
    test('Make sure /v1/delivery/:deliveryid return 200 on search', async () => {
      const email = 'daniel95barboza@gmail.com'
      const result = await createCredentialService(email)
      const deliveryid = '63c59bb0107f4ce9de7fd63a'
      await request(app)
        .get(`/v1/delivery/${deliveryid}`)
        .set(result)
        .expect(200)
    })

    test('Make sure /v1/delivery/:deliveryid return 422 if delivery id does not exist', async () => {
      const email = 'daniel95barboza@gmail.com'
      const result = await createCredentialService(email)
      const deliveryid = '63c59bb0107f4ce9de7fd63b'
      await request(app)
        .get(`/v1/delivery/${deliveryid}`)
        .set(result)
        .expect(422)
    })
  })

  describe('Route PUT /v1/delivery/:deliveryid', () => {
    test('Make sure /v1/delivery/:deliveryid return 200 on delivery update', async () => {
      const deliveryid = '63c59bb0107f4ce9de7fd63a'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/delivery/${deliveryid}`)
        .send(mockDelivery)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/delivery/:deliveryid return 422 if delivery id does not exist', async () => {
      const deliveryid = '63c59bb0107f4ce9de7fd63b'
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/delivery/${deliveryid}`)
        .send(mockDelivery)
        .set(result)
        .expect(422)
    })
  })

  describe('Route POST /v1/delivery/calculate', () => {
    test('Make sure /v1/delivery/calculate return 200 on shipping calculate', async () => {
      const email = 'daniel95barboza@gmail.com'
      const result = await createCredentialService(email)
      await request(app)
        .post(`/v1/delivery/calculate`)
        .send(mockDeliveryShipping)
        .set(result)
        .expect(200)
    })
  })
})
