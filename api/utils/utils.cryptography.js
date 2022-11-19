const { v4: uuidv4 } = require('uuid')
const dayjs = require('dayjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { user } = require('../models/models.index')
require('dotenv').config()

const ErrorGeneric = require('./errors/erros.generic-error')
const ErrorNotAuthenticatedUser = require('./errors/errors.user-not-authenticated')

const jwtHashSecret = process.env.JWT_SECRET
const jwtTimeLimit = process.env.JWT_VALID_TIME

const tokenRecoveryPassword = () => {
  try {
    const recovery = {}
    recovery.token = crypto.randomBytes(16).toString('hex')
    recovery.date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    return recovery
  } catch (error) {
    throw new ErrorGeneric(`Error generating token! ${error}`)
  }
}

const createSalt = () => {
  try {
    return crypto.randomBytes(16).toString('hex')
  } catch (error) {
    throw new ErrorGeneric(`Error creating salt! ${error}`)
  }
}

const createHash = (password, salt) => {
  try {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
      .toString('hex')
  } catch (error) {
    throw new ErrorGeneric(`Error creating hash! ${error}`)
  }
}

const generateRefreshToken = async (userId) => {
  try {
    const expiresIn = dayjs().add(15, 'second').unix()
    const newRefreshToken = await user.findOneAndUpdate(
      { _id: userId },
      {
        $set: { refreshToken: { expiresIn } }
      }
    )
    return newRefreshToken
  } catch (error) {
    throw new ErrorGeneric(`Error generating refresh token! ${error}`)
  }
}

const verifyRefreshToken = async (userId) => {
  const resultToken = await user.findOne({ _id: userId })
  const refreshTokenExpired = dayjs().isAfter(
    dayjs.unix(resultToken.refreshToken.expiresIn)
  )
  if (refreshTokenExpired) {
    console.log("Novo");
    return generateRefreshToken(userId)
  }
}

const generateToken = async (model) => {
  try {
    const { refreshToken } = await generateRefreshToken(model.id)

    return jwt.sign(
      {
        ...model,
        refreshToken
      },
      jwtHashSecret,
      {
        expiresIn: jwtTimeLimit
      }
    )
  } catch (error) {
    throw new ErrorGeneric(`Error generating token! ${error}`)
  }
}

const validatePassword = (password, salt, hash) => {
  try {
    const result = crypto
      .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
      .toString('hex')
    return result === hash
  } catch (error) {
    throw new ErrorGeneric(`Error validate password! ${error}`)
  }
}

const decodeToken = (token) => {
  try {
    return jwt.decode(token)
  } catch (error) {
    throw new ErrorGeneric(`Error decoding token! ${error}`)
  }
}

const tokenIsValid = async (token) => {
  try {
    const { id } = decodeToken(token)
    await verifyRefreshToken(id)
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
  tokenRecoveryPassword
}
