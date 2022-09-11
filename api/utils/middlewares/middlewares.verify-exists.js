const { user, store, client } = require('../../models/models.index')
const ErrorUnprocessableEntity = require('../errors/errors.unprocessable-entity')
const ErrorBusinessRule = require('../errors/errors.business-rule')

const verifyIdUserDbMiddleware = async (req, res, next) => {
  const userDB = await user.findOne({ _id: req.params.userid })
  if (!userDB) {
    throw new ErrorUnprocessableEntity(`Não existe um usuário com esse id!`)
  }
  next()
}

const verifyIdClientDbMiddleware = async (req, res, next) => {
  const clientDB = await client.findOne({ _id: req.params.id })
  if (!clientDB) {
    throw new ErrorUnprocessableEntity(`Não existe um cliente com esse id!`)
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

const verifyEmailUserExists = async (req, res, next) => {
  const resultEmail = await user.findOne({ email: req.body.email })
  if (resultEmail) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

const verifyEmailBodyUserExists = async (req, res, next) => {
  const resultEmail = await user
    .findOne({ email: req.body.email })
    .where('_id')
    .ne(req.params.userid)

  if (resultEmail) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

const verifyCnpjStoreExists = async (req, res, next) => {
  const resulCnpj = await store.findOne({ cnpj: req.body.cnpj })
  if (resulCnpj) {
    throw new ErrorBusinessRule('Este cnpj já está em uso!')
  }
  next()
}

const verifyCpfUserExists = async (req, res, next) => {
  const resulCpf = await user.findOne({ cpf: req.body.cpf })
  if (resulCpf) {
    throw new ErrorBusinessRule('Este cpf já está em uso!')
  }
  next()
}

const verifyCpfBodyUserExists = async (req, res, next) => {
  const resulCpf = await user
    .findOne({ cpf: req.body.cpf })
    .where('_id')
    .ne(req.params.clientid)

  if (resulCpf) {
    throw new ErrorBusinessRule('Este cpf já está em uso!')
  }
  next()
}

const verifyCnpjBodyStoreExists = async (req, res, next) => {
  const resulCnpj = await store
    .findOne({ cnpj: req.body.cnpj })
    .where('_id')
    .ne(req.params.storeid)

  if (resulCnpj) {
    throw new ErrorBusinessRule('Este cnpj já está em uso!')
  }
  next()
}

const verifyEmailStoreExists = async (req, res, next) => {
  const resultEmail = await store.findOne({ email: req.body.email })
  if (resultEmail) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

const verifyEmailBodyStoreExists = async (req, res, next) => {
  const resultEmail = await store
    .findOne({ email: req.body.email })
    .where('_id')
    .ne(req.params.storeid)

  if (resultEmail) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

module.exports = {
  verifyIdUserDbMiddleware,
  verifyIdClientDbMiddleware,
  verifyIdStoreDbMiddleware,
  verifyEmailUserExists,
  verifyCpfUserExists,
  verifyCpfBodyUserExists,
  verifyCnpjStoreExists,
  verifyEmailBodyUserExists,
  verifyCnpjBodyStoreExists,
  verifyEmailStoreExists,
  verifyEmailBodyStoreExists
}
