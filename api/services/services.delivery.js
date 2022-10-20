const { ObjectId } = require('mongodb')
const {
  delivery,
  orderRegistration,
  solicitation
} = require('../models/models.index')
const emailUtils = require('../utils/email/utils.email')
const emailUpdateSolicitation = require('../utils/email/utils.email.update_solicitation')
const deliveryMapper = require('../mappers/mappers.delivery')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listByIdDeliveryService = async (id) => {
  try {
    const deliveryDB = await delivery.findById(id)

    const resultDB = await orderRegistration.find({
      solicitation: deliveryDB.solicitation,
      type: 'solicitation'
    })

    return {
      success: true,
      message: 'Products listed successfully',
      data: resultDB.map((item) => deliveryMapper.toDTO(item))
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
    const deliveryDB = await delivery.findById(id)

    const resultDB = await orderRegistration.findOneAndUpdate(
      { solicitation: deliveryDB.solicitation, type: 'solicitation' },
      {
        $set: {
          solicitation: deliveryDB.solicitation,
          tipy: 'entrega',
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

module.exports = {
  listByIdDeliveryService,
  updateDeliveryService
}
