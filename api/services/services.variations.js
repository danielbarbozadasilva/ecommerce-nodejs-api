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
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listVariationsService
}
