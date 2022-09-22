const { product, category } = require('../models/models.index')
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
      data: resultDB.docs.map((item) => productMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createProductService = async (storeid, body) => {
  try {
    const resultProduct = await product.create({
      title: body.title,
      availability: true,
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

const updateProductService = async (body, productid, storeid) => {
  try {
    const resultProduct = await product.findOneAndUpdate(
      { _id: productid },
      {
        $set: {
          title: body.title,
          description: body.description,
          availability: body.availability,
          photos: body.photos,
          price: body.price,
          promotion: body.promotion,
          sku: body.sku,
          category: body.category,
          store: storeid
        }
      },
      { new: true }
    )

    await category.findByIdAndUpdate(
      { _id: body.category },
      {
        $push: { products: productid }
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

const updateImageProductService = async (id, files, storeid) => {
  try {
    const result = await product.findOne({ _id: id, store: storeid })

    const newImage = files.map((item) => item.filename)
    result.fotos = result.fotos.filter((item) => item).concat(newImage)

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
  listAllProductService,
  createProductService,
  updateProductService,
  updateImageProductService
}
