const { ObjectId } = require('mongodb')
const {
  solicitation,
  orderregistrations,
  product,
  payment,
  client,
  user,
  deliveries
} = require('../models/models.index')

const solicitationMapper = require('../mappers/mappers.solicitation')
const emailUtils = require('../utils/email/email.index')
const emailSolicitation = require('../utils/email/email.send_solicitation')
const emailCancelation = require('../utils/email/email.cancel_solicitation')
const { calculateShippingService } = require('./services.delivery')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const ErrorBusinessRule = require('../utils/errors/errors.business-rule')
const ErrorUnprocessableEntity = require('../utils/errors/errors.unprocessable-entity')

const listAllSolicitationService = async (offset, limit) => {
  try {
    const resultDB = await solicitation.aggregate([
      {
        $lookup: {
          from: product.collection.name,
          localField: 'cart.product',
          foreignField: '_id',
          as: 'products'
        }
      },
      {
        $lookup: {
          from: client.collection.name,
          localField: 'client',
          foreignField: '_id',
          as: 'client'
        }
      },
      {
        $lookup: {
          from: payment.collection.name,
          localField: 'payment',
          foreignField: '_id',
          as: 'payment'
        }
      },
      {
        $lookup: {
          from: deliveries.collection.name,
          localField: 'deliveries',
          foreignField: '_id',
          as: 'deliveries'
        }
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $skip: Number(offset) || 0 },
            { $limit: Number(limit) || 30 }
          ]
        }
      }
    ])

    return {
      success: true,
      message: 'Solicitations listed successfully',
      data: resultDB[0].data.map((item) => solicitationMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdSolicitationService = async (offset, limit, id) => {
  try {
    const resultDB = await solicitation.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: product.collection.name,
          localField: 'cart.product',
          foreignField: '_id',
          as: 'products'
        }
      },
      {
        $lookup: {
          from: client.collection.name,
          localField: 'client',
          foreignField: '_id',
          as: 'client'
        }
      },
      {
        $lookup: {
          from: payment.collection.name,
          localField: 'payment',
          foreignField: '_id',
          as: 'payment'
        }
      },
      {
        $lookup: {
          from: deliveries.collection.name,
          localField: 'deliveries',
          foreignField: '_id',
          as: 'deliveries'
        }
      },
      {
        $facet: {
          data: [
            { $skip: Number(offset) || 0 },
            { $limit: Number(limit) || 30 }
          ]
        }
      }
    ])

    return {
      success: true,
      message: 'Solicitations listed successfully',
      data: solicitationMapper.toDTO(...resultDB[0].data)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateQuantityCancelation = async (data) => {
  try {
    data.map(async (item) => {
      const resultProduct = await product.findOne({ _id: item.product })
      resultProduct.blockedQuantity -= item.quantity
      resultProduct.quantity += item.quantity
      resultProduct.save()
    })
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const showCartSolicitationService = async (id) => {
  try {
    const result = await solicitation.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: client.collection.name,
          localField: 'client',
          foreignField: '_id',
          as: 'client'
        }
      },
      { $unwind: '$client' },

      {
        $lookup: {
          from: user.collection.name,
          localField: 'client.user',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },

      {
        $lookup: {
          from: deliveries.collection.name,
          localField: 'deliveries',
          foreignField: '_id',
          as: 'deliveries'
        }
      },
      { $unwind: '$deliveries' },
      {
        $lookup: {
          from: product.collection.name,
          localField: 'cart.product',
          foreignField: '_id',
          as: 'products'
        }
      },
      {
        $lookup: {
          from: payment.collection.name,
          localField: 'payment',
          foreignField: '_id',
          as: 'payment'
        }
      },
      { $unwind: '$payment' }
    ])

    return {
      success: true,
      message: 'Cart listed successfully',
      data: solicitationMapper.toDTOCart(...result)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const sendEmailClientCancelation = async (id) => {
  const result = await showCartSolicitationService(id)

  emailUtils.utilSendEmail({
    to: result.data.user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `E-commerce - Pedido Cancelado!`,
    html: emailCancelation.cancelSolicitationClientEmail(result.data)
  })
}

const sendEmailAdminCancelation = async (id) => {
  const result = await showCartSolicitationService(id)

  emailUtils.utilSendEmail({
    to: result.data.user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `E-commerce - Pedido Cancelado!`,
    html: emailCancelation.cancelSolicitationAdminEmail(result.data)
  })
}

const deleteSolicitationService = async (id, clientid) => {
  try {
    const resultDB = await solicitation.findOneAndUpdate(
      { _id: id, client: clientid },
      {
        $set: {
          canceled: true
        }
      },
      { new: true }
    )

    await orderregistrations.create({
      solicitation: id,
      type: 'solicitation',
      situation: 'cancelado'
    })

    await updateQuantityCancelation(resultDB.cart)
    await sendEmailAdminCancelation(id)
    await sendEmailClientCancelation(id)

    return {
      success: true,
      message: 'Solicitation deleted successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const searchProductCart = async (cart) => {
  const productId = cart.map((item) => item.product)
  const productDB = await product.find({
    _id: {
      $in: productId
    }
  })
  return productDB
}

const verifyQuantity = async (cart) => {
  let checkFound = false

  const productDB = await searchProductCart(cart)

  cart.map((item, i) => {
    if (productDB[i].quantity < item.quantity) {
      checkFound = true
    }
  })

  if (checkFound) {
    throw new ErrorBusinessRule('Produto não possui quantidade em estoque!')
  }
}

const verifyPrice = async (cart) => {
  let checkPrice = false

  const productDB = await searchProductCart(cart)

  cart.map((item, i) => {
    if (
      (productDB[i].promotion || productDB[i].price) * item.quantity !==
      item.unitPrice * item.quantity
    ) {
      checkPrice = true
    }
  })

  if (checkPrice) {
    throw new ErrorUnprocessableEntity('Dados de carrinho inválidos!')
  }
}

const verifyShipping = async (body, price, code) => {
  const result = await calculateShippingService(body)

  const verify = result.data.map(
    (item) =>
      item.price.replace(',', '.') === String(price) &&
      String(item.code) === code
  )

  if (!verify) {
    throw new ErrorUnprocessableEntity('Dados de entrega inválidos!')
  }
}

const checkCard = async (cart, payment, shipping) => {
  let totalPrice = 0
  let total = 0

  const productDB = await searchProductCart(cart)
  cart.map((item, i) => {
    total += (productDB[i].promotion || productDB[i].price) * item.quantity
  })

  totalPrice = total + shipping

  const checkTotal =
    totalPrice.toFixed(2) === payment.price.toFixed(2) &&
    (!payment.installments || payment.installments <= 5)

  if (!checkTotal) {
    throw new ErrorBusinessRule('Dados de pagamento inválidos!')
  }
}

const sendEmailAdminSolicitation = async (id) => {
  const result = await showCartSolicitationService(id)

  emailUtils.utilSendEmail({
    to: result.data.user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `E-commerce - Pedido ${id} recebido!`,
    html: emailSolicitation.sendSolicitationAdminEmail(result.data)
  })
}

const sendEmailClientSolicitation = async (id) => {
  const result = await showCartSolicitationService(id)

  emailUtils.utilSendEmail({
    to: result.data.user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `Pedido ${id} recebido!`,
    html: emailSolicitation.sendSolicitationClientEmail(result.data)
  })
}

const updateQuantitySave = async (data) => {
  try {
    data.map(async (item) => {
      const resultProduct = await product.findOne({ _id: item.product })
      resultProduct.quantity -= item.quantity
      resultProduct.blockedQuantity += item.quantity
      resultProduct.save()
    })
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createSolicitationService = async (storeid, clientid, body) => {
  await verifyQuantity(body.cart)
  await verifyPrice(body.cart)
  await verifyShipping(body, body.deliveries.price, body.deliveries.type)
  await checkCard(body.cart, body.payment, body.shipping)

  try {
    const resultPayment = await payment.create({
      price: body.payment.price,
      type: body.payment.type,
      installments: body.payment.installments || 1,
      addressDeliveryIgualCharging: body.payment.addressDeliveryIgualCharging,
      address: body.payment.address,
      card: body.payment.card,
      status: 'Aguardando pagamento',
      store: storeid
    })

    const resultDeliveries = await deliveries.create({
      price: body.deliveries.price,
      type: body.deliveries.type,
      deliveryTime: body.deliveries.deliveryTime,
      address: body.deliveries.address,
      status: 'not started',
      store: storeid
    })

    const resultSolicitation = await solicitation.create({
      client: clientid,
      store: storeid,
      cart: body.cart,
      shipping: body.shipping,
      payment: resultPayment._id,
      deliveries: resultDeliveries._id
    })

    await orderregistrations.create({
      solicitation: resultSolicitation._id,
      type: 'solicitation',
      situation: 'created'
    })

    await updateQuantitySave(body.cart)
    await sendEmailAdminSolicitation(resultSolicitation._id)
    await sendEmailClientSolicitation(resultSolicitation._id)

    return {
      success: true,
      message: 'Solicitation created successfully',
      data: solicitationMapper.toDTOList(resultSolicitation, resultDeliveries)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllSolicitationService,
  listByIdSolicitationService,
  deleteSolicitationService,
  showCartSolicitationService,
  createSolicitationService
}
