const { ObjectId } = require('mongodb')
const {
  solicitation,
  orderRegistration,
  product,
  payment,
  store,
  client,
  deliveries
} = require('../models/models.index')

const solicitationMapper = require('../mappers/mappers.solicitation')
const emailUtils = require('../utils/utils.email')
const {
  sendSolicitationClientEmail,
  sendSolicitationAdminEmail,
  cancelSolicitationEmail
} = require('../utils/utils.email.send_solicitation')
const { calculateShipping } = require('../utils/util.shipping')

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

const updateQuantity = async (data) => {
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

const deleteSolicitationService = async (storeid, id) => {
  try {
    const resultDB = await solicitation
      .findOne({ store: storeid, _id: id })
      .populate({ path: 'client', populate: { path: 'user' } })

    resultDB.canceled = true
    await resultDB.save()

    await orderRegistration.create({
      solicitation: resultDB._id,
      type: 'solicitation',
      situation: 'canceled'
    })

    emailUtils.utilSendEmail({
      to: resultDB.client.email,
      from: process.env.SENDGRID_SENDER,
      subject: `Seu pedido foi cancelado`,
      html: cancelSolicitationEmail(resultDB)
    })

    await verifyQuantity(resultDB)
    // await updateQuantity('cancel_solicitation', resultDB)

    return {
      success: true,
      message: 'Solicitation deleted successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const showCartSolicitationService = async (solicitationid) => {
  try {
    const resultDB = await solicitation.aggregate([
      { $match: { _id: ObjectId(solicitationid) } },
      {
        $lookup: {
          from: product.collection.name,
          localField: 'cart.product',
          foreignField: '_id',
          as: 'products'
        }
      }
    ])
    return {
      success: true,
      message: 'Cart listed successfully',
      data: solicitationMapper.toDTOCart(resultDB[0])
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const verifyQuantity = async (cart) => {
  let checkFound = true

  await Promise.all(
    cart.map(async (item) => {
      const resultDB = await product.findOne(item._id)
      if (resultDB.quantity < item.quantity) {
        checkFound = false
      }
    })
  )

  if (!checkFound) {
    throw new ErrorBusinessRule('Produto não possui quantidade em estoque!')
  }
}

const verifyPrice = async (cart) => {
  let checkPrice = true

  await Promise.all(
    cart.map(async (item) => {
      const resultDB = await product.findById(item.product)
      if (
        (resultDB.promotion || resultDB.price) * item.quantity !==
        item.unitPrice * item.quantity
      ) {
        checkPrice = false
      }
    })
  )

  if (!checkPrice) {
    throw new ErrorUnprocessableEntity('Carrinho inválido!')
  }
}

// const checkShipping = async (cart, deliveries) => {
//   const productDB = await Promise.all(
//     cart.map(async (item) => {
//       item.product = await product.findById(item.product)
//       return item
//     })
//   )
// console.log(deliveries);
//   const resultCalc = await calculateShipping(
//     deliveries.address.zipCode,
//     productDB
//   )

//   if (resultCalc.Erro != 0) {
//     throw new ErrorUnprocessableEntity('Dados de entrega inválidos!')
//   }

//   return resultCalc
// }

const checkCard = async (cart, payment) => {
  let totalPrice = 0
  let total = 0

  await Promise.all(
    cart.map(async (item) => {
      const resultDB = await product.findById(item.product)
      total += resultDB.promotion || resultDB.price
    })
  )
  totalPrice = total + cart[0].shipping

  const checkTotal =
    totalPrice.toFixed(2) === payment.price.toFixed(2) &&
    (!payment.installments || payment.installments <= 6)

  if (!checkTotal) {
    throw new ErrorBusinessRule('Dados de Pagamento Inválidos!')
  }
}

const sendEmailAdmin = async (clientid, solicitationid) => {
  const resultClient = await client.findById(clientid).populate('user')
  const resultSolicitation = await solicitation.aggregate([
    { $match: { _id: ObjectId(solicitationid) } },
    {
      $lookup: {
        from: product.collection.name,
        localField: 'cart.product',
        foreignField: '_id',
        as: 'products'
      }
    }
  ])

  emailUtils.utilSendEmail({
    to: resultClient.user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `E-commerce - Pedido ${solicitationid} recebido!`,
    html: sendSolicitationAdminEmail(
      resultSolicitation[0].cart,
      [resultClient],
      resultSolicitation[0].products
    )
  })
}

const sendEmailClient = async (clientid, storeid, solicitationid) => {
  const resultClient = await client.findById(clientid).populate('user')
  const resultStore = await store.findById(storeid)
  const resultSolicitation = await solicitation.aggregate([
    { $match: { _id: ObjectId(solicitationid) } },
    {
      $lookup: {
        from: product.collection.name,
        localField: 'cart.product',
        foreignField: '_id',
        as: 'products'
      }
    }
  ])
  emailUtils.utilSendEmail({
    to: resultClient.user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `Solicitação ${solicitationid} recebido!`,
    html: sendSolicitationClientEmail(
      resultStore,
      resultSolicitation[0].cart,
      [resultClient],
      resultSolicitation[0].products
    )
  })
}

const createSolicitationService = async (storeid, clientid, body) => {
  await verifyQuantity(body.cart)
  await verifyPrice(body.cart)
  await checkCard(body.cart, body.payment)

  try {
    const resultPayment = await payment.create({
      price: body.payment.price,
      type: body.payment.type,
      installments: body.payment.installments || 1,
      addressDeliveryIgualCharging: body.payment.addressDeliveryIgualCharging,
      address: body.payment.address,
      card: body.payment.card,
      status: 'starting',
      store: storeid,
      pagSeguroCode: Math.floor(Math.random() * new Date().getTime())
    })

    const resultDeliveries = await deliveries.create({
      price: body.deliveries.price,
      type: body.deliveries.type,
      deliveryTime: body.deliveries.deliveryTime,
      address: body.deliveries.address,
      status: 'not started',
      store: storeid,
      trackingCode: Math.floor(Math.random() * new Date().getTime())
    })

    const resultSolicitation = await solicitation.create({
      client: clientid,
      store: storeid,
      cart: body.cart,
      payment: resultPayment._id,
      deliveries: resultDeliveries._id
    })

    await orderRegistration.create({
      solicitation: resultSolicitation._id,
      type: 'solicitation',
      situation: 'created_solicitation'
    })

    await updateQuantity(body.cart)
    await sendEmailAdmin(clientid, resultSolicitation._id)
    await sendEmailClient(clientid, storeid, resultSolicitation._id)

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
