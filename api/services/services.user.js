const { user, client } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const emailUtils = require('../utils/email/email.index')
const { Email } = require('../utils/email/email.recovery')
const userMapper = require('../mappers/mappers.user')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const ErrorNotAuthenticatedUser = require('../utils/errors/errors.user-not-authenticated')
const ErrorNotAuthorizedUser = require('../utils/errors/errors.user-not-authorized')
const ErrorBusinessRule = require('../utils/errors/errors.business-rule')
const profile = require('../utils/utils.rules')

const userIsValidService = async (email, password) => {
  const resultDB = await user.findOne({ email })

  if (resultDB) {
    const resultCrypto = cryptography.validatePassword(
      password,
      resultDB.salt,
      resultDB.hash
    )

    if (resultCrypto) {
      return resultDB
    }
  }
  throw new ErrorNotAuthenticatedUser('E-mail e/ou senha inválidos!')
}

const checkPermissionService = (permissions, rule) => {
  const result = profile.filter(
    (item) => item.permission === String(permissions)
  )
  const check = result[0]?.rule?.includes(rule)

  if (!check) {
    throw new ErrorNotAuthorizedUser('Usuário não autorizado!')
  }
  return !!check
}

const createCredentialService = async (email) => {
  const userDB = await user.aggregate([
    { $match: { email } },
    {
      $lookup: {
        from: client.collection.name,
        localField: '_id',
        foreignField: 'user',
        as: 'client'
      }
    },
    {
      $unwind: {
        path: '$client',
        preserveNullAndEmptyArrays: true
      }
    }
  ])

  const userDTO = userMapper.toDTO(...userDB)
  const userToken = await cryptography.generateToken(userDTO)
  if (userDTO && userToken) {
    return {
      ...userToken,
      userDTO
    }
  }
  return false
}

const authService = async (email, password) => {
  await userIsValidService(email, password)

  try {
    const resultCredentials = await createCredentialService(email)
    if (!resultCredentials) {
      return {
        success: false,
        details: ['Unable to create credential!']
      }
    }

    return {
      success: true,
      message: 'User authenticated successfully!',
      data: resultCredentials
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const refreshTokenService = async (token) => {
  const result = await user.findOne({ 'refreshToken._id': token })

  if (!result) {
    throw new ErrorNotAuthenticatedUser(`Refresh token invalid!`)
  }

  const resultToken = await cryptography.genereteRefreshToken(result)

  return {
    success: true,
    message: 'Refresh token generated successfully!',
    data: resultToken
  }
}

const checkTokenService = async (token) => {
  try {
    const { id } = cryptography.decodeToken(token)
    const result = await user.findOne({ _id: id })
    if (!result) {
      throw new ErrorNotAuthenticatedUser(`Token invalid!`)
    }
    return {
      success: true,
      message: 'Token valid!'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const registerService = async (body) => {
  try {
    const salt = cryptography.createSalt()
    const result = await user.create({
      name: body.name,
      email: body.email,
      salt,
      hash: cryptography.createHash(body.password, salt)
    })

    return {
      success: true,
      message: 'User registered successfully',
      data: userMapper.toDTO(result)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdUserService = async (id) => {
  const resultDB = await user.findById({ _id: id }).populate('store')

  return {
    success: true,
    message: 'User listed successfully',
    data: userMapper.toDTO(resultDB)
  }
}

const updateUserService = async (id, body) => {
  try {
    const salt = cryptography.createSalt()

    const resultDB = await user.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: body.name,
          email: body.email,
          salt,
          hash: cryptography.createHash(body.password, salt),
          store: body.store
        }
      },
      { new: true }
    )

    return {
      success: true,
      message: 'User updated successfully',
      data: userMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteUserService = async (id) => {
  try {
    await user.deleteOne({ _id: id })

    return {
      success: true,
      message: 'User deleted successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const sendTokenRecoveryPasswordService = async (body) => {
  try {
    const resultToken = cryptography.tokenRecoveryPassword()

    await user.updateOne(
      { email: `${body.email}` },
      {
        $set: {
          recovery: {
            token: resultToken.token,
            date: resultToken.date
          }
        }
      }
    )
    emailUtils.utilSendEmail({
      to: body.email,
      from: process.env.SENDER,
      subject: `Recuperar senha`,
      html: Email(resultToken.token)
    })

    return {
      success: true,
      message: 'Email successfully sent'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const checkTokenRecoveryPasswordService = async (body) => {
  const result = await user.findOne({
    email: `${body.email}`,
    'recovery.token': `${body.token}`
  })

  if (!result) {
    throw new ErrorBusinessRule('Token inválido!')
  }

  return !!result
}

const resetPasswordUserService = async (body) => {
  await checkTokenRecoveryPasswordService(body)

  try {
    const salt = cryptography.createSalt()

    await user.updateOne(
      { email: `${body.email}` },
      {
        $set: {
          salt,
          hash: cryptography.createHash(body.newPassword, salt)
        }
      }
    )

    return {
      success: true,
      message: 'Password updated successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const checkIdAuthorizationService = async (idToken, userid, permissions) => {
  const result = permissions.map((item) => item === 'administrator')

  if (userid && !result[0]) {
    const userDB = await client.findOne({ _id: userid, user: idToken })

    if (!userDB && idToken != userid) {
      throw new ErrorNotAuthorizedUser(
        "Usuário não autorizado! Você só pode realizar a operação usando o seu próprio 'Id'"
      )
    }
  }
  return !!result
}

module.exports = {
  createCredentialService,
  refreshTokenService,
  checkTokenService,
  userIsValidService,
  checkPermissionService,
  authService,
  registerService,
  listByIdUserService,
  updateUserService,
  deleteUserService,
  sendTokenRecoveryPasswordService,
  checkTokenRecoveryPasswordService,
  resetPasswordUserService,
  checkIdAuthorizationService
}
