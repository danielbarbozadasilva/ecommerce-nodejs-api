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
  })
})
