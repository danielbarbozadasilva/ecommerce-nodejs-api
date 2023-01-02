const { ObjectId } = require('mongodb')
const { product, rating, client, category } = require('../models/models.index')
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
      return { title: 1 }
  }
}

const listAllProductService = async (sortType, offset, limit) => {
  try {
    const resultDB = await product.aggregate([
      {
        $lookup: {
          from: rating.collection.name,
          localField: '_id',
          foreignField: 'product',
          as: 'rating'
        }
      },
      {
        $sort: getSort(sortType)
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: offset }, { $limit: limit }]
        }
      }
    ])
    return {
      success: true,
      message: 'Products listed successfully',
      data: resultDB.map((item) => productMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listProductService = async (sortType) => {
  try {
    const resultDB = await product.aggregate([
      {
        $lookup: {
          from: rating.collection.name,
          localField: '_id',
          foreignField: 'product',
          as: 'rating'
        }
      },
      {
        $sort: getSort(sortType)
      }
    ])

    return {
      success: true,
      message: 'Products listed successfully',
      data: resultDB.map((item) => productMapper.toDTOProduct(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdProductService = async (productid) => {
  try {
    const resultDB = await product.aggregate([
      {
        $match: { _id: ObjectId(productid) }
      },
      {
        $lookup: {
          from: client.collection.name,
          localField: 'likes',
          foreignField: '_id',
          as: 'client'
        }
      },
      {
        $unwind: {
          path: '$client',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: rating.collection.name,
          localField: '_id',
          foreignField: 'product',
          as: 'rating'
        }
      },
      {
        $unwind: {
          path: '$rating',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: category.collection.name,
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true
        }
      }
    ])
    return {
      success: true,
      message: 'Product listed successfully',
      data: productMapper.toDTOProduct(...resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createProductService = async (body, files) => {
  try {
    const image = files?.map((item) => item.filename)

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
        height: body.height,
        width: body.width,
        depth: body.depth
      },
      weight: body.weight,
      freeShipping: body.freeShipping,
      photos: image
    })

    return {
      success: true,
      message: 'Product created successfully',
      data: productMapper.toDTOProduct(resultProduct)
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
          height: body.height,
          width: body.width,
          depth: body.depth,
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
        sort,
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

const searchProductService = async (sortType, offset, limit, search) => {
  try {
    const resultDB = await product.aggregate([
      {
        $match: {
          title: {
            $regex: `.*${search}.*`,
            $options: 'i'
          }
        }
      },
      {
        $lookup: {
          from: rating.collection.name,
          localField: '_id',
          foreignField: 'product',
          as: 'rating'
        }
      },
      {
        $sort: getSort(sortType)
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: offset }, { $limit: limit }]
        }
      }
    ])
    return {
      success: true,
      message: 'Products listed successfully',
      data: resultDB.map((item) => productMapper.toDTO(item))
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

const listCategoryProductsService = async (sortType, offset, limit, id) => {
  try {
    const resultDB = await product.aggregate([
      {
        $match: { category: ObjectId(id) }
      },
      {
        $lookup: {
          from: product.collection.name,
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: rating.collection.name,
          localField: '_id',
          foreignField: 'product',
          as: 'rating'
        }
      },
      {
        $sort: getSort(sortType)
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [{ $skip: offset }, { $limit: limit }]
        }
      }
    ])

    return {
      success: true,
      message: 'Products listed successfully',
      data: resultDB.map((item) => productMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllProductService,
  listProductService,
  listByIdProductService,
  createProductService,
  updateProductService,
  updateImageProductService,
  deleteProductService,
  listAvailableProductService,
  searchProductService,
  listRatingProductService,
  listCategoryProductsService
}
