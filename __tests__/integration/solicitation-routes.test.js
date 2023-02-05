const request = require('supertest')
const app = require('../../api/app')
const { createCredentialService } = require('../../api/services/services.user')
const { createConnection, closeConnection } = require('../helpers')
const { mockSolicitationSuccess } = require('../mocks')

describe('Solicitation Routes', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Route GET /v1/solicitation', () => {
    test('Make sure /v1/solicitation return 200 on search', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app).get(`/v1/solicitation`).set(result).expect(200)
    })
    test('Make sure /v1/solicitation return 401 if the user is not authenticated', async () => {
      await request(app).get(`/v1/solicitation`).expect(401)
    })
  })
  describe('Route POST /v1/solicitation', () => {
    test('Make sure /v1/solicitation return 200 on create solicitation', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const result = await createCredentialService(email)
      await request(app)
        .post(`/v1/solicitation?clientid=${clientid}`)
        .send(mockSolicitationSuccess)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/solicitation return 401 if the user is not authenticated', async () => {
      await request(app).post(`/v1/solicitation`).expect(401)
    })
  })
  describe('Route GET /v1/solicitation/:solicitationNumber', () => {
    test('Make sure /v1/solicitation/:solicitationNumber return 200 on search', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const solicitationNumber = '4777720845'
      const result = await createCredentialService(email)
      await request(app)
        .get(`/v1/solicitation/${solicitationNumber}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/solicitation/:solicitationNumber return 422 if solicitation number is incorrect', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const solicitationNumber = '5823120845'
      const result = await createCredentialService(email)
      await request(app)
        .get(`/v1/solicitation/${solicitationNumber}`)
        .set(result)
        .expect(422)
    })
  })

  describe('Route GET /v1/solicitation/:solicitationNumber/cart', () => {
    test('Make sure /v1/solicitation/:solicitationNumber/cart return 200 on search', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const solicitationNumber = '4777720845'
      const result = await createCredentialService(email)
      await request(app)
        .get(`/v1/solicitation/${solicitationNumber}/cart`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/solicitation/:solicitationNumber/cart return 422 if solicitation number is incorrect', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const solicitationNumber = '5823120845'
      const result = await createCredentialService(email)
      await request(app)
        .get(`/v1/solicitation/${solicitationNumber}/cart`)
        .set(result)
        .expect(422)
    })
  })

  describe('Route DELETE /v1/solicitation/:solicitationNumber', () => {
    test('Make sure /v1/solicitation/:solicitationNumber return 200 on delete', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const solicitationNumber = '4777720845'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/solicitation/${solicitationNumber}?clientid=${clientid}`)
        .set(result)
        .expect(200)
    })
  })
  test('Make sure /v1/solicitation/:solicitationNumber return 422 if solicitation number is incorrect', async () => {
    const email = 'danielbarboza56@hotmail.com'
    const clientid = '6320f577156b47ff1082586e'
    const solicitationNumber = '5823120845'
    const result = await createCredentialService(email)
    await request(app)
      .delete(`/v1/solicitation/${solicitationNumber}?clientid=${clientid}`)
      .set(result)
      .expect(422)
  })
  test('Make sure /v1/solicitation/:solicitationNumber return 401 if the user is not authenticated', async () => {
    const solicitationNumber = '4777720845'
    const clientid = '6320f577156b47ff1082586e'
    await request(app)
      .delete(`/v1/solicitation/${solicitationNumber}?clientid=${clientid}`)
      .expect(401)
  })
})
