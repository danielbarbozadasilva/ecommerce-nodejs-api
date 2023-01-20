const request = require('supertest')
const app = require('../../api/app')
const { createCredentialService } = require('../../api/services/services.user')
const { createConnection, closeConnection } = require('../helpers')

describe('Auth Routes', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(async () => {
    await closeConnection()
  })

  describe('Route /v1/client', () => {
    test('Make sure /v1/client return 200 on register', async () => {
      await request(app)
        .post('/v1/client')
        .send({
          name: 'Daniel',
          email: 'danielbarboza@gmail.com',
          password: 'daniel',
          cpf: '222.223.434-90',
          phones: ['(21)3454-3456', '(21)99876-7883'],
          address: {
            street: 'Rua abc',
            number: '123',
            complement: 'casa',
            district: 'Rio de janeiro',
            city: 'RIO DE JANEIRO',
            zipCode: '21099-100',
            state: 'RJ'
          },
          birthDate: '02/09/2000'
        })
        .expect(200)
    })

    test('Make sure /v1/client return 404 if the email already exists', async () => {
      await request(app)
        .post('/v1/client')
        .send({
          name: 'Daniel',
          email: 'danielbarboza@gmail.com',
          password: 'daniel',
          cpf: '112.223.434-90',
          phones: ['(21)3454-3456', '(21)99876-7883'],
          address: {
            street: 'Rua abc',
            number: '123',
            complement: 'casa',
            district: 'Rio de janeiro',
            city: 'RIO DE JANEIRO',
            zipCode: '21099-100',
            state: 'RJ'
          },
          birthDate: '02/09/2000'
        })
        .expect(400)
    })

    test('Make sure /v1/client return 404 if the cpf already exists', async () => {
      await request(app)
        .post('/v1/client')
        .send({
          name: 'Daniel',
          email: 'daniel@gmail.com',
          password: 'daniel',
          cpf: '222.223.434-90',
          phones: ['(21)3454-3456', '(21)99876-7883'],
          address: {
            street: 'Rua abc',
            number: '123',
            complement: 'casa',
            district: 'Rio de janeiro',
            city: 'RIO DE JANEIRO',
            zipCode: '21099-100',
            state: 'RJ'
          },
          birthDate: '02/09/2000'
        })
        .expect(400)
    })

    describe('Route GET /v1/client/:clientid', () => {
      test('Make sure /v1/client/:clientid return 200 on client id search', async () => {
        const email = 'danielbarboza56@hotmail.com'
        const clientid = '6320f577156b47ff1082586e'
        const result = await createCredentialService(email)
        await request(app).get(`/v1/client/${clientid}`).set(result).expect(200)
      })
      test('Make sure /v1/client/:clientid return 401 if user is not authenticated', async () => {
        const clientid = '6320f577156b47ff1082586e'
        await request(app).get(`/v1/client/${clientid}`).expect(401)
      })
      test('Make sure /v1/client/:clientid returns 422 if the clientid is not valid', async () => {
        const email = 'danielbarboza56@hotmail.com'
        const clientid = '6320f577156b47ff1082586f'
        const result = await createCredentialService(email)
        await request(app).get(`/v1/client/${clientid}`).set(result).expect(422)
      })
    })
  })
})
