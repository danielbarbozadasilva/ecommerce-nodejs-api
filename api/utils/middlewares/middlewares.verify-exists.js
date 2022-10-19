const {
  user,
  client,
  category,
  product,
  rating,
  solicitation
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
  const id = req.params.clientid || req.query.clientid
  const clientDB = await client.findOne({ _id: id })
  if (!clientDB) {
    throw new ErrorUnprocessableEntity(`Não existe um cliente com esse id!`)
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
  const id = req.params.productid || req.query.productid
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
      `Não existe nenhuma avaliação com esse id!`
    )
  }
  next()
}

const verifyIdSolicitationDbMiddleware = async (req, res, next) => {
  const solicitationDB = await solicitation.findOne({
    _id: req.params.solicitationid
  })
  if (!solicitationDB) {
    throw new ErrorUnprocessableEntity(`Pedido não encontrado!`)
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

const verifyRatingExistsMiddleware = async (req, res, next) => {
  const ratingDB = await rating.findOne({
    client: req.query.clientid,
    product: req.query.productid
  })

  if (ratingDB) {
    throw new ErrorBusinessRule(`Você já curtiu esse produto!`)
  }
  next()
}

const verifyRatingNotExistsMiddleware = async (req, res, next) => {
  const ratingDB = await rating.findOne({
    client: req.query.clientid,
    product: req.query.productid
  })

  if (!ratingDB) {
    throw new ErrorUnprocessableEntity(`Esta curtida não existe!`)
  }
  next()
}

module.exports = {
  verifyIdUserDbMiddleware,
  verifyIdClientDbMiddleware,
  verifyIdCategoryDbMiddleware,
  verifyIdProductDbMiddleware,
  verifyIdRatingDbMiddleware,
  verifyIdSolicitationDbMiddleware,
  verifyEmailUserExists,
  verifyCpfUserExists,
  verifyRatingExistsMiddleware,
  verifyRatingNotExistsMiddleware
}
