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

  describe('Route GET /v1/client', () => {
    test('Make sure /v1/client return 200 on register', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const result = await createCredentialService(email)
      await request(app).get(`/v1/client`).set(result).expect(200)
    })
  })

  describe('Route POST /v1/client', () => {
    test('Make sure /v1/client return 200 on register', async () => {
      await request(app)
        .post('/v1/client')
        .send({
          name: 'Daniel',
          email: 'danielbarbozasilva@gmail.com',
          password: 'daniel',
          cpf: '331.123.434-90',
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
  })

  describe('Route GET /v1/client/search/:search/solicitations', () => {
    test('Make sure /v1/client/search/:search/solicitations return 200 on list solicitations', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const search = 'Silva'
      const offset = 0
      const limit = 30
      const result = await createCredentialService(email)
      await request(app)
        .get(
          `/v1/client/search/${search}/solicitations?offset=${offset}&limit=${limit}`
        )
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/client/search/:search/solicitations return 401 on list solicitations', async () => {
      const search = 'Silva'
      const offset = 0
      const limit = 30
      await request(app)
        .get(
          `/v1/client/search/${search}/solicitations?offset=${offset}&limit=${limit}`
        )
        .expect(401)
    })
  })

  describe('Route GET /v1/client/search', () => {
    test('Make sure /v1/client/search return 200 on list solicitations', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const search = 'Silva'
      const result = await createCredentialService(email)
      await request(app)
        .get(`/v1/client/search?find=${search}`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/client/search return 401 on list solicitations', async () => {
      const search = 'Silva'
      await request(app).get(`/v1/client/search?find=${search}`).expect(401)
    })
  })

  describe('Route GET /v1/client/:clientid/solicitations', () => {
    test('Make sure /v1/client/:clientid/solicitations return 200 on list solicitations', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const offset = 0
      const limit = 30
      const result = await createCredentialService(email)
      await request(app)
        .get(
          `/v1/client/${clientid}/solicitations?offset=${offset}&limit=${limit}`
        )
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/client/:clientid/solicitations return 401 on list solicitations', async () => {
      const clientid = '6320f577156b47ff1082586e'
      const offset = 0
      const limit = 30
      await request(app)
        .get(
          `/v1/client/${clientid}/solicitations?offset=${offset}&limit=${limit}`
        )
        .expect(401)
    })
  })

  describe('Route GET /v1/client/:clientid/like', () => {
    test('Make sure /v1/client/:clientid/like return 200 on list likes', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const result = await createCredentialService(email)
      await request(app)
        .get(`/v1/client/${clientid}/like`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/client/:clientid/like return 401 on list likes', async () => {
      const clientid = '6320f577156b47ff1082586f'
      await request(app).get(`/v1/client/${clientid}/like`).expect(401)
    })
  })

  describe('Route POST /v1/client/:clientid/product/:productid/like', () => {
    test('Make sure /v1/client/:clientid/product/:productid/like return 200 on create like', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const productid = '639702b94bf6b326dbc5ae87'
      const result = await createCredentialService(email)
      await request(app)
        .post(`/v1/client/${clientid}/product/${productid}/like`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/client/:clientid/product/:productid/like return 401 on create like', async () => {
      const clientid = '6320f577156b47ff1082586f'
      const productid = '639702b94bf6b326dbc5ae87'
      await request(app)
        .post(`/v1/client/${clientid}/product/${productid}/like`)
        .expect(401)
    })
  })

  describe('Route DELETE /v1/client/:clientid/product/:productid/like', () => {
    test('Make sure /v1/client/:clientid/product/:productid/like return 200 on delete like', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const productid = '639702b94bf6b326dbc5ae87'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/client/${clientid}/product/${productid}/like`)
        .set(result)
        .expect(200)
    })
    test('Make sure /v1/client/:clientid/product/:productid/like return 401 on delete like', async () => {
      const clientid = '6320f577156b47ff1082586f'
      const productid = '639702b94bf6b326dbc5ae87'
      await request(app)
        .delete(`/v1/client/${clientid}/product/${productid}/like`)
        .expect(401)
    })
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

  describe('Route DELETE /v1/client/:clientid', () => {
    test('Make sure /v1/client/:clientid return 200 on client remove', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/client/${clientid}`)
        .set(result)
        .expect(200)
    })

    test('Make sure /v1/client/:clientid return 401 on client remove', async () => {
      const clientid = '6320f577156b47ff1082586e'
      await request(app).delete(`/v1/client/${clientid}`).expect(401)
    })

    test('Make sure /v1/client/:clientid returns 422 on client remove', async () => {
      const email = 'danielbarboza56@hotmail.com'
      const clientid = '6320f577156b47ff1082586f'
      const result = await createCredentialService(email)
      await request(app)
        .delete(`/v1/client/${clientid}`)
        .set(result)
        .expect(422)
    })
  })

  describe('Route UPDATE /v1/client/:clientid/user/:userid', () => {
    test('Make sure /v1/client/:clientid/user/:userid return 200 on client update', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586e'
      const userid = '6320f577156b47ff1082586c'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/client/${clientid}/user/${userid}`)
        .send({
          name: 'Daniel',
          email: 'daniel95barboza@gmail.com',
          cpf: '331.123.434-90',
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
        .set(result)
        .expect(200)
    })

    test('Make sure /v1/client/:clientid/user/:userid return 401 on client update', async () => {
      const clientid = '6320f577156b47ff1082586e'
      const userid = '6320f577156b47ff1082586c'
      await request(app)
        .put(`/v1/client/${clientid}/user/${userid}`)
        .send({
          name: 'Daniel',
          email: 'daniel95barboza@gmail.com',
          cpf: '331.123.434-90',
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
        .expect(401)
    })

    test('Make sure /v1/client/:clientid/user/:userid returns 422 if client id is invalid', async () => {
      const email = 'daniel95barboza@gmail.com'
      const clientid = '6320f577156b47ff1082586f'
      const userid = '6320f577156b47ff1082586c'
      const result = await createCredentialService(email)
      await request(app)
        .put(`/v1/client/${clientid}/user/${userid}`)
        .send({
          name: 'Daniel',
          email: 'daniel95barboza@gmail.com',
          cpf: '331.123.434-90',
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
        .set(result)
        .expect(422)
    })
  })
})
