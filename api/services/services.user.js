const { user, client } = require('../models/models.index')
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
    permission: 'administrator',
    rule: [
      'USER_LIST_ID',
      'USER_UPDATE',
      'USER_DELETE',
      'STORE_UPDATE',
      'STORE_DELETE',
      'LIST_CLIENT',
      'SEARCH_SOLICITATION',
      'SEARCH_CLIENT',
      'LIST_CLIENT_SOLICITATION',
      'CLIENT_ID',
      'CLIENT_UPDATE',
      'CLIENT_DELETE',
      'LIST_CATEGORY',
      'LIST_CATEGORY_AVAILABILITY',
      'LIST_CATEGORY_ID',
      'LIST_CATEGORY_PRODUCT',
      'CREATE_CATEGORY',
      'UPDATE_CATEGORY',
      'DELETE_CATEGORY',
      'UPDATE_CATEGORY_PRODUCT'
    ]
  },
  {
    permission: 'client',
    rule: [
      'USER_LIST_ID',
      'USER_UPDATE',
      'USER_DELETE',
      'STORE_CREATE',
      'LIST_CLIENT',
      'CLIENT_ID',
      'CLIENT_UPDATE',
      'CLIENT_DELETE',
      'LIST_CATEGORY',
      'LIST_CATEGORY_AVAILABILITY',
      'LIST_CATEGORY_ID'
    ]
  }
]

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
  throw new ErrorNotAuthenticatedUser('Credenciais de acesso inválidas!')
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
  const userDB = await user.findOne({ email })
  const userDTO = userMapper.toDTO(userDB)
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
