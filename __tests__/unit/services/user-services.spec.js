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

    test('Make sure refreshTokenService return refresh token', async () => {
      const email = 'daniel95barboza@gmail.com'
      const password = 'daniel'
      const auth = await services.authService(email, password)
      const result = await services.refreshTokenService(
        auth.data.refreshToken._id
      )
      expect(result.success).toBe(true)
    })

    test('Make sure refreshTokenService return 401 if the access token are invalid', async () => {
      try {
        const token = 'f30e496f-8d8b-4408-93e0-ba2c87df4577'
        await services.refreshTokenService(token)
      } catch (error) {
        expect(error.statusCode).toBe(401)
      }
    })

    test('Make sure checkTokenService return success', async () => {
      const email = 'daniel95barboza@gmail.com'
      const password = 'daniel'
      const auth = await services.authService(email, password)
      const result = await services.checkTokenService(auth.data.token)
      expect(result.success).toBe(true)
    })

    test('Make sure checkTokenService return 401 if the access token are invalid', async () => {
      try {
        const token = 'f30e496f-8d8b-4408-93e0-ba2c87df4577'
        await services.checkTokenService(token)
      } catch (error) {
        expect(error.statusCode).toBe(401)
      }
    })

    test('Make sure sendTokenRecoveryPasswordService return success', async () => {
      const result = await services.sendTokenRecoveryPasswordService({
        email: 'daniel95barboza@gmail.com'
      })
      expect(result.success).toBe(true)
    })

    test('Make sure sendTokenRecoveryPasswordService return error', async () => {
      const result = await services.sendTokenRecoveryPasswordService({
        email: 'example@gmail.com'
      })
      expect(result.success).toBe(false)
    })
  })
})
