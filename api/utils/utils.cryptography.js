const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { user } = require('../models/models.index')
require('dotenv').config()

const ErrorGeneric = require('../exceptions/erros.generic-error')
const ErrorNotAuthenticatedUser = require('../exceptions/errors.user-not-authenticated')

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

const generateToken = async (model) => {
  try {
    const token = jwt.sign(
      {
        ...model
      },
      jwtHashSecret,
      {
        expiresIn: jwtTimeLimit
      }
    )

    const result = await user.findOneAndUpdate(
      { _id: model.id },
      {
        $set: {
          refreshToken: { _id: uuidv4(), data: token, expiresIn: jwtTimeLimit }
        }
      },
      { new: true }
    )

    return {
      token,
      refreshToken: { ...result.refreshToken }
    }
  } catch (error) {
    throw new ErrorGeneric(`Error generating token! ${error}`)
  }
}

const genereteRefreshToken = async (data) =>
  jwt.sign(
    {
      id: data.id,
      name: data.name,
      email: data.email,
      permissions: data.permissions
    },
    jwtHashSecret,
    {
      expiresIn: jwtTimeLimit
    }
  )

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

const tokenIsValid = (token) => {
  try {
    jwt?.verify(token, jwtHashSecret)
  } catch (err) {
    throw new ErrorNotAuthenticatedUser('Unauthenticated user!')
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
  genereteRefreshToken
}
