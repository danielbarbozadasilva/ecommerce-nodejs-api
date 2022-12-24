const { rating, product } = require('../models/models.index')
const ratingMapper = require('../mappers/mappers.rating')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listRatingProductService = async (productid) => {
  try {
    const resultDB = await rating.find({ product: productid })

    return {
      success: true,
      message: 'Product ratings successfully listed',
      data: resultDB.map((item) => ratingMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createRatingProductService = async (body) => {
  try {
    const resultDB = await rating.create({
      name: body.name,
      text: body.text,
      score: body.score,
      client: body.clientid,
      product: body.productid
    })

    await product.findOneAndUpdate(
      { _id: body.productid },
      {
        $push: { rating: resultDB._id }
      }
    )

    return {
      success: true,
      message: 'Product ratings created successfully',
      data: ratingMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdRatingProductService = async (ratingid, productid) => {
  try {
    const resultDB = await rating.findOne({
      _id: ratingid,
      product: productid
    })

    return {
      success: true,
      message: 'Product ratings listed successfully',
      data: ratingMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteRatingProductService = async (clientid, productid) => {
  try {
    const resultDB = await rating.findOneAndDelete({
      client: clientid,
      product: productid
    })

    await product.findOneAndUpdate(
      { _id: productid },
      {
        $pull: { rating: resultDB._id }
      }
    )

    return {
      success: true,
      message: 'Rating successfully deleted'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listRatingProductService,
  createRatingProductService,
  listByIdRatingProductService,
  deleteRatingProductService
}
