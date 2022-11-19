const { tokenIsValid } = require('../utils.cryptography')

const authenticationMiddleware = () => async (req, res, next) => {
  const { token } = req.headers
  await tokenIsValid(token)
  next()
}

module.exports = authenticationMiddleware
