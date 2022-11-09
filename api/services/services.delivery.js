const { ObjectId } = require('mongodb')
const Correios = require('node-correios')

const correios = new Correios()
const {
  deliveries,
  orderregistrations,
  solicitation,
  product,
  client,
  user,
  payment
} = require('../models/models.index')
const emailUtils = require('../utils/email/email.index')
const emailUpdateSolicitation = require('../utils/email/email.update_payment')
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

const searchCartSolicitation = async (id) => {
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
      data: deliveryMapper.toDTOCart(...result)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const sendEmailUpdate = async (id) => {
  const result = await searchCartSolicitation(id)
  
  emailUtils.utilSendEmail({
    to: result.data.user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `E-commerce - Seu pedido saiu para Entrega!`,
    html: emailUpdateSolicitation.sendSolicitationUpdateEmail(result.data)
  })
}

const updateDeliveryService = async (body, id) => {
  try {
    const resultSolicitation = await solicitation.findOne({ deliveries: id })

    const resultDB = await orderregistrations.findOneAndUpdate(
      { solicitation: resultSolicitation._id, type: 'solicitation' },
      {
        $set: {
          solicitation: resultSolicitation._id,
          type: 'started',
          situation: body.status,
          payload: body
        }
      },
      { new: true }
    )

    await deliveries.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          trackingCode: body.trackingCode
        }
      },
      { new: true }
    )

    await sendEmailUpdate(resultSolicitation._id)

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
