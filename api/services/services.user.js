const { user } = require('../models/models.index')
const cryptography = require('../utils/utils.cryptography')
const emailUtils = require('../utils/utils.email')
const { Email } = require('../utils/utils.email.message')
const { tokenRecoveryPassword } = require('../utils/utils.cryptography')
const userMapper = require('../mappers/mappers.user')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const ErrorNotAuthenticatedUser = require('../utils/errors/errors.user-not-authenticated')
const ErrorNotAuthorizedUser = require('../utils/errors/errors.user-not-authorized')
const ErrorBusinessRule = require('../utils/errors/errors.business-rule')

const profile = [
  {
    type: 1,
    description: 'administrator',
    permission: ['USER_LIST_ALL', 'USER_LIST_ID', 'USER_UPDATE', 'USER_DELETE']
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

const authService = async (email, password) => {
  const resultDB = await userIsValidService(email, password)
  return {
    success: true,
    message: 'Operation performed successfully',
    data: userMapper.toUserDTO(resultDB)
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

module.exports = {
  userIsValidService,
  verifyEmailAlreadyExists,
  checkPermissionService,
  authService,
  registerService,
  listAllUsersService,
  listByIdUserService
}
