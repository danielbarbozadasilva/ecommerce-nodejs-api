const { ObjectId } = require('mongodb')
const Correios = require('node-correios')

const correios = new Correios()
const {
  deliveries,
  orderregistrations,
  solicitation,
  product,
  client,
  user
} = require('../models/models.index')
const emailUtils = require('../utils/email/utils.email')
const emailUpdateSolicitation = require('../utils/email/utils.email.update_solicitation')
const deliveryMapper = require('../mappers/mappers.delivery')

const config = require('../utils/util.correios')
const { calcBox } = require('../utils/helpers/helpers.calcBox')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listByIdDeliveryService = async (id) => {
  try {
    const resultDB = await solicitation.aggregate([
      {
        $lookup: {
          from: deliveries.collection.name,
          localField: 'deliveries',
          foreignField: '_id',
          as: 'deliveries'
        }
      },
      {
        $lookup: {
          from: orderregistrations.collection.name,
          localField: '_id',
          foreignField: 'solicitation',
          as: 'orderregistrations'
        }
      },
      {
        $match: {
          'deliveries._id': new ObjectId(id),
          'orderregistrations.type': 'solicitation'
        }
      }
    ])

    return {
      success: true,
      message: 'Delivery listed successfully',
      data: deliveryMapper.toDTO(...resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const sendEmailUpdate = async (solicitationid) => {
  const result = await solicitation.aggregate([
    { $match: { _id: ObjectId(solicitationid) } },
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
        from: product.collection.name,
        localField: 'cart.product',
        foreignField: '_id',
        as: 'products'
      }
    },
    { $unwind: '$products' }
  ])

  emailUtils.utilSendEmail({
    to: result[0].user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `E-commerce - Seu pedido ${solicitationid} saiu para entrega!`,
    html: emailUpdateSolicitation.sendSolicitationUpdateEmail(result)
  })
}

const updateDeliveryService = async (body, id) => {
  try {
    const solicitationDB = await solicitation.findOne({ deliveries: id })

    const resultDB = await orderregistrations.findOneAndUpdate(
      { solicitation: solicitationDB._id, type: 'solicitation' },
      {
        $set: {
          solicitation: solicitationDB._id,
          type: 'started',
          situation: body.status,
          payload: body
        }
      },
      { new: true }
    )

    await sendEmailUpdate(solicitationDB._id)

    return {
      success: true,
      message: 'Request updated successfully!',
      data: deliveryMapper.toDTOList(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const calculateShippingService = async (body) => {
  try {
    const productId = body.cart.map((item) => item.product)
    const productDB = await product.find({
      _id: {
        $in: productId
      }
    })

    const box = calcBox(productDB)

    const totalWeight = productDB.reduce(
      (all, item, i) => all + item.weight * body.cart[i].quantity,
      0
    )

    const finalPrice = productDB.reduce(
      (all, item, i) =>
        all + (item.promotion || item.price) * body.cart[i].quantity,
      0
    )

    const result = await correios.calcPrecoPrazo({
      nCdServico: config.nCdServico,
      sCepOrigem: config.sCepOrigem,
      sCepDestino: body.zipCode,
      nVlPeso: totalWeight,
      nCdFormato: 1,
      nVlComprimento: box.length,
      nVlAltura: box.height,
      nVlLargura: box.width,
      nVlDiamentro: 0,
      nVlValorDeclarado: finalPrice < 23.5 ? 23.5 : finalPrice
    })

    return {
      success: true,
      message: 'Shipping calculated successfully!',
      data: result.map((item) => deliveryMapper.toDTOShipping(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listByIdDeliveryService,
  updateDeliveryService,
  calculateShippingService
}
