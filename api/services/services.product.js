const { product } = require('../models/models.index')

const productMapper = require('../mappers/mappers.product')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const getSort = (sortType) => {
  switch (sortType) {
    case 'alfabetica_a-z':
      return { title: 1 }
    case 'alfabetica_z-a':
      return { title: -1 }
    case 'preco-crescente':
      return { price: 1 }
    case 'preco-decrescente':
      return { price: -1 }
    default:
      return {}
  }
}

const listAllProductService = async (storeid, sortType, offset, limit) => {
  try {
    const resultDB = await product.paginate(
      { store: storeid },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        sort: getSort(sortType),
        populate: ['category']
      }
    )

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
  listAllProductService
}
