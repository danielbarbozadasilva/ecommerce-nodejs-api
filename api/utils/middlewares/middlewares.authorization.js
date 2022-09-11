const { decodeToken } = require('../utils.cryptography')
const {
  checkPermissionService,
  checkUserBelongsStoreService
} = require('../../services/services.user')

const authorizationMiddleware = (rule) => async (req, res, next) => {
  if (rule !== '*') {
    const { token } = req.headers
    const { permissions } = decodeToken(token)

    checkPermissionService(permissions, rule)
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
