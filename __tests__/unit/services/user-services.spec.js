const services = require('../../../api/services/services.user')
const { createConnection, closeConnection } = require('../../helpers')

describe('User services', () => {
  beforeAll(() => {
    createConnection()
  })

  afterAll(() => {
    closeConnection()
  })

  describe('User Services', () => {
    test('Make sure userIsValidService return user information', async () => {
      const email = 'daniel95barboza@gmail.com'
      const password = 'daniel'
      const result = await services.userIsValidService(email, password)
      expect(result._id).toHaveProperty('_id')
    })

    test('Make sure userIsValidService return 401 if the user credentials are invalid', async () => {
      try {
        const email = 'exemplo@gmail.com'
        const password = 'daniel'
        await services.userIsValidService(email, password)
      } catch (error) {
        expect(error.statusCode).toBe(401)
      }
    })

    test('Make sure checkPermissionService return the result if the user has permission', async () => {
      const type = 'administrator'
      const permission = 'CREATE_CATEGORY'
      const result = services.checkPermissionService(type, permission)
      expect(result).toBe(true)
    })

    test('Make sure checkPermissionService return 403 if the user does not have permission', async () => {
      try {
        const type = 'client'
        const permission = 'CREATE_CATEGORY'
        services.checkPermissionService(type, permission)
      } catch (error) {
        expect(error.statusCode).toBe(403)
      }
    })

    test('Make sure createCredentialService return the result if the user credentials are correct', async () => {
      const email = 'daniel95barboza@gmail.com'
      const result = await services.createCredentialService(email)
      expect(result).not.toBe(false)
    })

    test('Make sure createCredentialService return false if the user email is invalid', async () => {
      const email = 'exemplo@gmail.com'
      const result = await services.createCredentialService(email)
      expect(result).toBe(false)
    })

    test('Make sure authService return success if the access credentials are valid', async () => {
      const email = 'daniel95barboza@gmail.com'
      const password = 'daniel'
      const result = await services.authService(email, password)
      expect(result.success).toBe(true)
    })
  })
})
