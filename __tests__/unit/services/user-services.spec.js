const mongoose = require('mongoose')
const services = require('../../../api/services/services.user')
const db = require('../../../db/config')

describe('User services', () => {
  beforeAll(async () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(db.uri, { useNewUrlParser: true }, (err) => {
      if (err)
        console.log(
          `MongoDB is ${
            mongoose.STATES[mongoose.connection.readyState]
          }\n${err}`
        )
    })
  })

  afterAll(async () => {
    mongoose.connection.close()
  })

  describe('User Services', () => {
    test('Make sure userIsValidService return 401 if the user credentials are invalid', async () => {
      try {
        const email = 'exemplo@gmail.com'
        const password = 'daniel'
        await services.userIsValidService(email, password)
      } catch (error) {
        expect(error.statusCode).toBe(401)
      }
    })
    test('Make sure authService return success if the access credentials are valid', async () => {
      const email = 'daniel95barboza@gmail.com'
      const password = 'daniel'
      const result = await services.authService(email, password)
      expect(result.success).toBe(true)
    })
  })
})
