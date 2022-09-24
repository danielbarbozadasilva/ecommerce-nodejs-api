const { rating, product } = require('../models/models.index')
const ratingMapper = require('../mappers/mappers.rating')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listRatingProductService = async (storeid, productid) => {
  try {
    const resultDB = await rating.find({ store: storeid, product: productid })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => ratingMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createRatingProductService = async (storeid, productid, body) => {
  try {
    const resultDB = await rating.create({
      name: body.name,
      text: body.text,
      score: body.score,
      product: productid,
      store: storeid
    })

    await product.findOneAndUpdate(
      { _id: productid },
      {
        $push: { rating: resultDB._id }
      }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: ratingMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdRatingProductService = async (ratingid, storeid, productid) => {
  try {
    const resultDB = await rating.findOne({
      _id: ratingid,
      store: storeid,
      product: productid
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: ratingMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteRatingProductService = async (ratingid) => {
  try {
    await rating.deleteOne({ _id: ratingid })

    await product.findOneAndUpdate(
      { rating: ratingid },
      {
        $pull: { rating: ratingid }
      }
    )

    return {
      success: true,
      message: 'Operation performed successfully'
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
