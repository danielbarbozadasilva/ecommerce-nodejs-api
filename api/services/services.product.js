const { product, rating } = require('../models/models.index')
const productMapper = require('../mappers/mappers.product')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const getSort = (sortType) => {
  switch (sortType) {
    case 'alfabetica_a-z':
      return { title: 1 }
    case 'alfabetica_z-a':
      return { title: -1 }
    case 'price-crescente':
      return { price: 1 }
    case 'price-decrescente':
      return { price: -1 }
    default:
      return {}
  }
}

const listAllProductService = async (sortType, offset, limit) => {
  try {
    const resultDB = await product.paginate({
      offset: Number(offset || 0),
      limit: Number(limit || 30),
      sort: getSort(sortType),
      populate: ['category']
    })

    return {
      success: true,
      message: 'Products listed successfully',
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
        populate: ['category']
      }
    )

    return {
      success: true,
      message: 'Product listed successfully',
      data: productMapper.toDTO(...resultDB.docs)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createProductService = async (body) => {
  try {
    const resultProduct = await product.create({
      title: body.title,
      availability: true,
      description: body.description,
      price: body.price,
      promotion: body.promotion,
      sku: body.sku,
      quantity: body.quantity,
      category: body.category,
      dimensions: {
        height: body.dimensions.height,
        width: body.dimensions.width,
        depth: body.dimensions.depth
      },
      weight: body.weight,
      freeShipping: body.freeShipping
    })

    return {
      success: true,
      message: 'Product created successfully',
      data: productMapper.toDTO(resultProduct)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateProductService = async (body, productid) => {
  try {
    await product.findOneAndUpdate(
      { _id: productid },
      {
        $set: {
          title: body.title,
          availability: body.availability,
          description: body.description,
          price: body.price,
          promotion: body.promotion,
          sku: body.sku,
          quantity: body.quantity,
          category: body.category,
          dimensions: {
            height: body.dimensions.height,
            width: body.dimensions.width,
            depth: body.dimensions.depth
          },
          weight: body.weight,
          freeShipping: body.freeShipping
        }
      }
    )

    return {
      success: true,
      message: 'Product successfully updated'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateImageProductService = async (productid, files) => {
  try {
    const result = await product.findOne({ _id: productid })

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

    return {
      success: true,
      message: 'Product successfully deleted'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listAvailableProductService = async (sort, offset, limit) => {
  try {
    const resultDB = await product.paginate(
      { availability: true },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        sort: getSort(sort),
        populate: ['category']
      }
    )

    return {
      success: true,
      message: 'Products listed successfully',
      data: resultDB.docs.map((item) => productMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const searchProductService = async (sort, offset, limit, search) => {
  try {
    const resultDB = await product.paginate(
      {
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
      message: 'Products listed successfully',
      data: resultDB.docs.map((item) => productMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listRatingProductService = async (productid) => {
  try {
    const resultDB = await rating
      .find({ product: productid })
      .populate('product')

    return {
      success: true,
      message: 'Product reviews listed successfully',
      data: resultDB.map((item) => productMapper.toDTORating(item))
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
  listRatingProductService
}
