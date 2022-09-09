const { user, store } = require('../../models/models.index')
const ErrorUnprocessableEntity = require('../errors/errors.unprocessable-entity')
const ErrorBusinessRule = require('../errors/errors.business-rule')

const verifyIdUserDbMiddleware = async (req, res, next) => {
  const userDB = await user.findOne({ _id: req.params.userid })
  if (!userDB) {
    throw new ErrorUnprocessableEntity(`Não existe um usuário com esse id!`)
  }
  next()
}

const verifyIdStoreDbMiddleware = async (req, res, next) => {
  const storeDB = await store.findOne({ _id: req.params.storeid })
  if (!storeDB) {
    throw new ErrorUnprocessableEntity(`Não existe uma loja com esse id!`)
  }
  next()
}

const verifyEmailExists = async (req, res, next) => {
  const resultEmail = await user.findOne({ email: req.body.email })
  if (resultEmail) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

const verifyCpfExists = async (req, res, next) => {
  const resulCpf = await user.findOne({ email: req.body.cpf })
  if (resulCpf !== null) {
    throw new ErrorBusinessRule('Este cpf já está em uso!')
  }
  next()
}

module.exports = {
  verifyIdUserDbMiddleware,
  verifyIdStoreDbMiddleware,
  verifyEmailExists,
  verifyCpfExists
}
