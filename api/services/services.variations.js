const { variations } = require('../models/models.index')
const variationsMapper = require('../mappers/mappers.variations')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listVariationsService = async (storeid, productid) => {
  try {
    const resultDB = await variations.find({
      store: storeid,
      product: productid
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => variationsMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createVariationsService = async (storeid, productid, body) => {
  try {
    const resultDB = await variations.create({
      code: body.code,
      name: body.name,
      price: body.price,
      promotion: body.promotion,
      delivery: body.delivery,
      quantity: body.quantity,
      store: storeid,
      product: productid
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: variationsMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdVariationsService = async (storeid, productid, variationid) => {
  try {
    const resultDB = await variations.findOne({
      _id: variationid,
      store: storeid,
      product: productid
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: variationsMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listVariationsService,
  createVariationsService,
  listByIdVariationsService
}
