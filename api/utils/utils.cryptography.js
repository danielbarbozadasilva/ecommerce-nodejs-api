const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const ErrorNotAuthenticatedUser = require('./errors/errors.user-not-authenticated')

const jwtHashSecret = process.env.JWT_SECRET
const jwtTimeLimit = process.env.JWT_VALID_TIME

const tokenRecoveryPassword = () => {
  this.recovery = {}
  this.recovery.token = crypto.randomBytes(16).toString('hex')
  this.recovery.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  return this.recovery
}

const finishTokenRecoveryPassword = () => {
  this.recovery = { token: null, date: null }
  return this.recovery
}

const createSalt = () => crypto.randomBytes(16).toString('hex')

const createHash = (password) => {
  const hash = crypto
    .pbkdf2Sync(password, createSalt(), 10000, 512, 'sha512')
    .toString('hex')
  return hash
}

const generateToken = (model) => {
  const hoje = new Date()
  const exp = new Date(hoje)
  exp.setDate(hoje.getDate() + 15)

  return jwt.sign(
    {
      id: model._id,
      email: model.email,
      name: model.name,
      exp: parseFloat(exp.getTime() / 1000, 10)
    },
    jwtHashSecret
  )
}

const validatePassword = (password) => {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return hash
}

const decodeToken = (token) => {
  const verifyDecode = jwt.decode(token)
  if (verifyDecode) {
    return verifyDecode
  }
  return false
}

const tokenIsValid = (token) => {
  try {
    jwt?.verify(token, jwtHashSecret)
  } catch (err) {
    throw new ErrorNotAuthenticatedUser('Usuário não autenticado!')
  }
}

module.exports = {
  createSalt,
  createHash,
  generateToken,
  tokenIsValid,
  decodeToken,
  validatePassword,
  tokenRecoveryPassword,
  finishTokenRecoveryPassword
}
