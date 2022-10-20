const { ObjectId } = require('mongodb')
const { delivery, orderRegistration } = require('../models/models.index')
const deliveryMapper = require('../mappers/mappers.delivery')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listByIdDeliveryService = async (id) => {
  try {
    // const resultDB = await orderRegistration.find({
    //   solicitation: deliveryDB.solicitation,
    //   type: 'solicitation'
    // })
    const resultDB = await orderRegistration.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $lookup: {
          from: orderRegistration.collection.name,
          localField: 'solicitation',
          foreignField: 'solicitation',
          as: 'result'
        }
      }
    ])

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
  listByIdDeliveryService
}
