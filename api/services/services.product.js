const {
  product,
  category,
  variation,
  rating
} = require('../models/models.index')
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

const listByIdProductService = async (productid) => {
  try {
    const resultDB = await product.paginate(
      { _id: productid },
      {
        populate: ['store', 'category']
      }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: productMapper.toDTOList(...resultDB.docs)
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
      }
    )

    await category.updateMany({
      $pull: { products: resultProduct._id }
    })

    await category.findOneAndUpdate(
      { _id: body.category },
      {
        $push: { products: productid }
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

const updateImageProductService = async (productid, files, storeid) => {
  try {
    const result = await product.findOne({ _id: productid, store: storeid })

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

const deleteProductService = async (productid, storeid) => {
  try {
    await product.findOneAndDelete({
      _id: productid,
      store: storeid
    })

    await category.updateMany({
      $pull: { products: productid }
    })

    return {
      success: true,
      message: 'Operation performed successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listAvailableProductService = async (storeid, sort, offset, limit) => {
  try {
    const resultDB = await product.paginate(
      { store: storeid, availability: true },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        sort: getSort(sort),
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

const searchProductService = async (storeid, sort, offset, limit, search) => {
  try {
    const resultDB = await product.paginate(
      {
        store: storeid,
        $text: { $search: search, $diacriticSensitive: false }
      },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        sort: getSort(sort),
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

const listVariationsProductService = async (productid) => {
  try {
    const resultDB = await variation.find({ product: productid })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listRatingProductService = async (productid) => {
  try {
    const resultDB = await rating.find({ product: productid })

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
  listAllProductService,
  listByIdProductService,
  createProductService,
  updateProductService,
  updateImageProductService,
  deleteProductService,
  listAvailableProductService,
  searchProductService,
  listVariationsProductService,
  listRatingProductService
}
