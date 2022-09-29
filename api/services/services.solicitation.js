const { solicitation, orderRegistration, product, variation } = require('../models/models.index')
const solicitationMapper = require('../mappers/mappers.solicitation')
const emailUtils = require("../utils/utils.email")
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllSolicitationService = async (offset, limit, storeid) => {
  try {
    const resultDB = await solicitation.paginate(
      { store: storeid },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        populate: ['client', 'payment', 'delivery']
      }
    )
    resultDB.docs = await Promise.all(
      resultDB.docs.map(async (solic) => {
        solic.cart = await Promise.all(
          solic.cart.map(async (item) => {
            item.product = await product.findById(item.product)
            item.variation = await variation.findById(item.variation)
            return item
          })
        )
        return solic
      })
    )
    return {
      success: true,
      message: 'Solicitations listed successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdSolicitationService = async (offset, limit, storeid, id) => {
  try {
    const resultDB = await solicitation.paginate(
      { store: storeid, _id: id },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        populate: ['client', 'payment', 'delivery', 'store']
      }
    )
    resultDB.docs = await Promise.all(
      resultDB.docs.map(async (solic) => {
        solic.cart = await Promise.all(
          solic.cart.map(async (item) => {
            item.product = await product.findById(item.product)
            item.variation = await variation.findById(item.variation)
            return item
          })
        )
        return solic
      })
    )

    return {
      success: true,
      message: 'Solicitation listed successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const verifyQuantity = async (data) => {
  
  try {
    var available = true;
  const cart = await Promise.all(data.map(async item => {
    item.variation = await variation.findById(item.variation._id || item.variation )
}))

  cart.forEach(item => {
      if( !item.variation.quantity || item.variation.quantity < item.quantity ){
          available = false;
      }
  })
} catch (err) {
  throw new ErrorGeneric(`Internal Server Error! ${err}`)
}
}

const updateQuantity = async(type, data) =>{
  try {

  await Promise.all(data.cart.map(async item => {

    item.variation = await variation.findById(item.variation._id || item.variation )

    if( type === "save_solicitation" ){
        item.variation.quantity -= item.quantity
        item.variation.blockedQuantity += item.quantity
    } else if( type === "confirm_solicitation" ){
        item.variation.blockedQuantity -= item.quantity
    } else if( type === "cancel_solicitation" ){
        item.variation.blockedQuantity -= item.quantity
        item.variation.quantity += item.quantity
    }

    await item.variacao.save()
    return item
}))

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
      html: Email(resultDB)
    })

    await verifyQuantity(resultDB)
    await updateQuantity('cancel_solicitation', resultDB)

    return {
      success: true,
      message: 'Solicitation deleted successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const showCartSolicitationService = async (storeid, id) => {
  try {
    const resultDB = await solicitation.findOne({ store: storeid, _id: id })    
    resultDB.cart = await Promise.all(solicitation.cart.map(async (item) => {
        item.product = await product.findById(item.product)
        item.variation = await variation.findById(item.variation)
        return item
    }))
    // return res.send({ carrinho: pedido.carrinho });
    return {
      success: true,
      message: 'Cart listed successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllSolicitationService,
  listByIdSolicitationService,
  deleteSolicitationService,
  showCartSolicitationService
