const { variation, product } = require('../models/models.index')
const variationsMapper = require('../mappers/mappers.variations')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listVariationsService = async (storeid, productid) => {
  try {
    const resultDB = await variation.find({
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
    const resultDB = await variation.create({
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
    const resultDB = await variation.findOne({
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

const updateVariationsService = async (id, storeid, productid, body) => {
  try {
    const resultDB = await variation.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          code: body.code,
          name: body.name,
          price: body.price,
          promotion: body.promotion,
          delivery: body.delivery,
          quantity: body.quantity,
          store: storeid,
          product: productid,
          photos: body.photos
        }
      },
      { new: true }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: variationsMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateImageVariationService = async (id, storeid, productid, files) => {
  try {
    const result = await product.findOne({
      _id: id,
      store: storeid,
      product: productid
    })

    const newImage = files.map((item) => item.filename)
    result.photos = result.photos.filter((item) => item).concat(newImage)

    await result.save()

    return {
      success: true,
      message: 'Operation performed successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listVariationsService,
  createVariationsService,
  listByIdVariationsService,
  updateVariationsService,
  updateImageVariationService
}
