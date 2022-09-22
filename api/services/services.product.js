const { product, category } = require('../models/models.index')
const productMapper = require('../mappers/mappers.product')
const fileUtils = require('../utils/utils.file')
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
      data: resultDB.docs.map((item) => productMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createProductService = async (storeid, body) => {
  try {
    // fileUtils.utilMove(body.image.oldPath, body.image.newPath)

    const resultProduct = await product.create({
      title: body.title,
      availability: body.availability,
      description: body.description,
      // photos: body.photos,
      price: body.price,
      promotion: body.promotion,
      sku: body.sku,
      category: body.category,
      store: storeid
    })

    await category.findOneAndUpdate(
      { _id: body.category },
      {
        $push: { products: resultProduct._id }
      }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: productMapper.toDTO(resultProduct)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllProductService,
  createProductService
}
