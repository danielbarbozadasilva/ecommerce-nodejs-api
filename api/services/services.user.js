const { user } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const emailUtils = require('../utils/utils.email')
const { Email } = require('../utils/utils.email.message')
const userMapper = require('../mappers/mappers.user')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const ErrorNotAuthenticatedUser = require('../utils/errors/errors.user-not-authenticated')
const ErrorNotAuthorizedUser = require('../utils/errors/errors.user-not-authorized')
const ErrorBusinessRule = require('../utils/errors/errors.business-rule')

const profile = [
  {
    type: 1,
    description: 'administrator',
    permission: [
      'USER_LIST_ALL',
      'USER_LIST_ID',
      'USER_UPDATE',
      'USER_DELETE',
      'STORE_LIST',
      'STORE_LIST_ID',
      'STORE_UPDATE',
      'STORE_DELETE'
    ]
  },
  {
    type: 2,
    description: 'client',
    permission: ['USER_LIST_ID', 'USER_UPDATE']
  }
]

const userIsValidService = async (email, password) => {
  const resultDB = await user.findOne({ email })
  const resultCrypto = cryptography.validatePassword(
    password,
    resultDB.salt,
    resultDB.hash
  )

  if (resultDB && resultCrypto) {
    return resultDB
  }
  throw new ErrorNotAuthenticatedUser('Credenciais de acesso inválidas!')
}

const verifyEmailAlreadyExists = async (email) => {
  const resultDB = await user.findOne({ email })

  if (resultDB) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  return !!resultDB
}

const checkPermissionService = (type, permission) => {
  const result = profile.find((item) => item.type == type)
  const check = result?.permission?.includes(permission)

  if (!check) {
    throw new ErrorNotAuthorizedUser('Usuário não autorizado!')
  }
  return !!check
}

const createCredentialService = async (email) => {
  const userDB = await user.findOne({ email })
  const userDTO = userMapper.toUserDTO(userDB)
  const userToken = cryptography.generateToken(userDTO)
  if (userDTO && userToken) {
    return {
      token: userToken,
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
        details: ['Não foi possivel criar a credencial!']
      }
    }

    return {
      success: true,
      message: 'Usuário autenticado com sucesso!',
      data: resultCredentials
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const registerService = async (body) => {
  await verifyEmailAlreadyExists(body.email)
  try {
    const salt = cryptography.createSalt()
    const result = await user.create({
      name: body.name,
      email: body.email,
      salt,
      hash: cryptography.createHash(body.password, salt),
      store: body.store
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: userMapper.toUserDTO(result)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listAllUsersService = async () => {
  try {
    const resultDB = await user.find({}).sort({ name: 1 })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => userMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdUserService = async (id) => {
  const resultDB = await user.findById({ _id: id }).populate({ path: 'store' })

  return {
    success: true,
    message: 'Operation performed successfully',
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
      }
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
      from: process.env.SENDGRID_SENDER,
      subject: `Recuperar senha`,
      html: Email(resultToken.token)
    })

    return {
      success: true,
      message: 'Operation performed successfully'
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

  return {
    success: true,
    message: 'Operation performed successfully'
  }
}

const resetPasswordUserService = async (body) => {
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

module.exports = {
  userIsValidService,
  verifyEmailAlreadyExists,
  checkPermissionService,
  authService,
  registerService,
  listAllUsersService,
  listByIdUserService,
  updateUserService,
  deleteUserService,
  sendTokenRecoveryPasswordService,
  checkTokenRecoveryPasswordService,
  resetPasswordUserService
}
