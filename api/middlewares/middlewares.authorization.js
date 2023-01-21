const { decodeToken } = require('../utils.cryptography')
const services = require('../../services/services.user')

const authorizationMiddleware = (rule) => async (req, res, next) => {
  const { token } = req.headers
  const { id, permissions } = decodeToken(token)
  const user = req.params.userid || req.params.clientid
  if (rule !== '*') {
    services.checkPermissionService(permissions, rule)
  }

  await services.checkIdAuthorizationService(id, user, permissions)

  next()
}

module.exports = {
  authorizationMiddleware
}
