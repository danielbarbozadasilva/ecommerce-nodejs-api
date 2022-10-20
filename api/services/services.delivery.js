const { ObjectId } = require('mongodb')
const Correios = require('node-correios')

const correios = new Correios()
const {
  deliveries,
  orderregistrations,
  solicitation,
  product
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
          'orderregistrations.type': 'started'
        }
      } 
    ])
  
    return {
      success: true,
      message: 'Deliveries listed successfully',
      data: deliveryMapper.toDTO(...resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const sendEmailUpdate = async (solicitationid) => {
  const result = await solicitation.findById(solicitationid).populate({
    path: 'client',
    populate: { path: 'user' }
  })

  emailUtils.utilSendEmail({
    to: result.user.email,
    from: process.env.SENDGRID_SENDER,
    subject: `E-commerce - Seu pedido ${solicitationid} saiu para entrega!`,
    html: emailUpdateSolicitation.sendSolicitationUpdateEmail(result.data)
  })
}

const updateDeliveryService = async (body, id) => {
  try {
    const deliveryDB = await deliveries.findById(id)

    const resultDB = await orderregistration.findOneAndUpdate(
      { solicitation: deliveryDB.solicitation, type: 'solicitation' },
      {
        $set: {
          solicitation: deliveryDB.solicitation,
          type: 'started',
          situation: body.status,
          payload: body
        }
      },
      { new: true }
    )

    await sendEmailUpdate(deliveryDB.solicitation)

    return {
      success: true,
      message: 'Delivery listed successfully',
      data: resultDB
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

    const totalWeight = product.reduce(
      (all, item) =>
        all +
        item.weight * body.cart.reduce((all, item) => all + item.quantity, 0),
      0
    )

    const finalPrice = body.cart.reduce((all, item) => all * item.quantity, 0)

    const resultAll = await Promise.all(
      config.nCdServico.split(',').map(async (service) => {
        const result = await correios.calcPrecoPrazo({
          nCdServico: service,
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
        return result[0]
      })
    )
    return resultAll
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listByIdDeliveryService,
  updateDeliveryService,
  calculateShippingService
}
