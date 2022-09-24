const {
  user,
  store,
  client,
  category,
  product,
  rating
} = require('../../models/models.index')
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
  const clientDB = await client.findOne({ _id: req.params.clientid })
  if (!clientDB) {
    throw new ErrorUnprocessableEntity(`Não existe um cliente com esse id!`)
  }
  next()
}

const verifyIdStoreDbMiddleware = async (req, res, next) => {
  const id = req.query.storeid || req.params.storeid
  const storeDB = await store.findOne({ _id: id })
  if (!storeDB) {
    throw new ErrorUnprocessableEntity(`Não existe uma loja com esse id!`)
  }
  next()
}

const verifyIdCategoryDbMiddleware = async (req, res, next) => {
  const categoryDB = await category.findOne({ _id: req.params.categoryid })
  if (!categoryDB) {
    throw new ErrorUnprocessableEntity(`Não existe uma categoria com esse id!`)
  }
  next()
}

const verifyIdProductDbMiddleware = async (req, res, next) => {
  const id = req.params.productid || req.body.product
  const productDB = await product.findOne({ _id: id })
  if (!productDB) {
    throw new ErrorUnprocessableEntity(`Não existe um produto com esse id!`)
  }
  next()
}

const verifyIdRatingDbMiddleware = async (req, res, next) => {
  const ratingDB = await rating.findOne({ _id: req.params.ratingid })
  if (!ratingDB) {
    throw new ErrorUnprocessableEntity(
      `Não existe nenhuma curtida com esse id!`
    )
  }
  next()
}

const verifyEmailUserExists = async (req, res, next) => {
  const resultDB = await user
    .findOne({ email: req.body.email })
    .where('_id')
    .ne(req.params.userid)

  if (resultDB) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

const verifyCpfUserExists = async (req, res, next) => {
  const resulCpf = await client
    .findOne({ cpf: req.body.cpf })
    .where('_id')
    .ne(req.params.clientid)

  if (resulCpf) {
    throw new ErrorBusinessRule('Este cpf já está em uso!')
  }
  next()
}

const verifyCnpjStoreExists = async (req, res, next) => {
  const id = req.query.storeid || req.params.storeid

  const resulCnpj = await store
    .findOne({ cnpj: req.body.cnpj })
    .where('_id')
    .ne(id)

  if (resulCnpj) {
    throw new ErrorBusinessRule('Este cnpj já está em uso!')
  }
  next()
}

const verifyEmailStoreExists = async (req, res, next) => {
  const id = req.query.storeid || req.params.storeid

  const resultEmail = await store
    .findOne({ email: req.body.email })
    .where('_id')
    .ne(id)
  if (resultEmail) {
    throw new ErrorBusinessRule('Este e-mail já está em uso!')
  }
  next()
}

module.exports = {
  verifyIdUserDbMiddleware,
  verifyIdClientDbMiddleware,
  verifyIdStoreDbMiddleware,
  verifyIdCategoryDbMiddleware,
  verifyIdProductDbMiddleware,
  verifyIdRatingDbMiddleware,
  verifyEmailUserExists,
  verifyCpfUserExists,
  verifyCnpjStoreExists,
  verifyEmailStoreExists
}
