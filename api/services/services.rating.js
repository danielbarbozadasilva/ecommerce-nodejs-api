const { rating } = require('../models/models.index')
const ratingMapper = require('../mappers/mappers.rating')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listRatingProductService = async (storeid, productid) => {
  try {
    const resultDB = await rating.find({ store: storeid, product: productid })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => ratingMapper.toDTOWithProducts(item))
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
      data: resultDB.map((item) => ratingMapper.toDTOWithProducts(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listRatingProductService,
  listByIdRatingProductService
}
