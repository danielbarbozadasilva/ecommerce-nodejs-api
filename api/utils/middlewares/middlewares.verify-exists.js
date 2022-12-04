const {
  user,
  client,
  category,
  product,
  rating,
  solicitation,
  deliveries,
  payment
} = require('../../models/models.index')
const ErrorUnprocessableEntity = require('../errors/errors.unprocessable-entity')
const ErrorBusinessRule = require('../errors/errors.business-rule')

const verifyIdUser = async (req, res, next) => {
  const userDB = await user.findOne({ _id: req.params.userid })
  if (!userDB) {
    throw new ErrorUnprocessableEntity(`Não existe um usuário com esse id!`)
  }
  next()
}

const verifyIdClient = async (req, res, next) => {
  const id = req.params.clientid || req.query.clientid
  const clientDB = await client.findOne({ _id: id })
  if (!clientDB) {
    throw new ErrorUnprocessableEntity(`Não existe um cliente com esse id!`)
  }
  next()
}

const verifyIdCategory = async (req, res, next) => {
  const categoryDB = await category.findOne({ _id: req.params.categoryid })
  if (!categoryDB) {
    throw new ErrorUnprocessableEntity(`Não existe uma categoria com esse id!`)
  }
  next()
}

const verifyIdProduct = async (req, res, next) => {
  const id = req.params.productid || req.query.productid
  const productDB = await product.findOne({ _id: id })
  if (!productDB) {
    throw new ErrorUnprocessableEntity(`Não existe um produto com esse id!`)
  }
  next()
}

const verifyIdRating = async (req, res, next) => {
  const ratingDB = await rating.findOne({ _id: req.params.ratingid })
  if (!ratingDB) {
    throw new ErrorUnprocessableEntity(
      `Não existe nenhuma avaliação com esse id!`
    )
  }
  next()
}

const verifyIdSolicitation = async (req, res, next) => {
  const solicitationDB = await solicitation.findOne({
    solicitationNumber: req.params.solicitationNumber
  })
  if (!solicitationDB) {
    throw new ErrorUnprocessableEntity(`Pedido não encontrado!`)
  }
  next()
}

const verifyIsAlreadyCanceledSolicitation = async (req, res, next) => {
  const solicitationDB = await solicitation.findOne({
    solicitationNumber: req.params.solicitationNumber,
    canceled: false
  })
  if (!solicitationDB) {
    throw new ErrorUnprocessableEntity(`Este pedido já foi cancelado!`)
  }
  next()
}

const verifyIdDelivery = async (req, res, next) => {
  const deliveryDB = await deliveries.findOne({
    _id: req.params.deliveryid
  })

  if (!deliveryDB) {
    throw new ErrorUnprocessableEntity(`Entrega não encontrada!`)
  }
  next()
}

const verifyIdPayment = async (req, res, next) => {
  const paymentDB = await payment.findOne({
    _id: req.params.paymentid
  })

  if (!paymentDB) {
    throw new ErrorUnprocessableEntity(`Pagamento não encontrado!`)
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
    throw new ErrorBusinessRule(`Você já avaliou esse produto!`)
  }
  next()
}

const verifyEmail = async (req, res, next) => {
  const resultDB = await user.findOne({ email: req.body.email })
  if (!resultDB) {
    throw new ErrorBusinessRule('E-mail inválido!')
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
  verifyIdUser,
  verifyIdClient,
  verifyIdCategory,
  verifyIdProduct,
  verifyIdRating,
  verifyIdSolicitation,
  verifyIsAlreadyCanceledSolicitation,
  verifyIdDelivery,
  verifyIdPayment,
  verifyEmailUserExists,
  verifyCpfUserExists,
  verifyRatingExistsMiddleware,
  verifyRatingNotExistsMiddleware,
  verifyEmail
}
