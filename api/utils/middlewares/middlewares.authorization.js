const { decodeToken } = require('../utils.cryptography')
const {
  checkPermissionService,
  checkUserBelongsStoreService
} = require('../../services/services.user')

const authorizationMiddleware = (role) => async (req, res, next) => {
  if (role !== '*') {
    const { token } = req.headers
    const { permissions } = decodeToken(token)

    checkPermissionService(permissions, role)
  }
  next()
}

const verifyUserBelongsStore = () => async (req, res, next) => {
  const { token } = req.headers
  const { id } = decodeToken(token)
  await checkUserBelongsStoreService(id)
  next()
}

module.exports = {
  authorizationMiddleware,
  verifyUserBelongsStore
}
