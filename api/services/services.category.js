const { category, product } = require('../models/models.index')

const categoryMapper = require('../mappers/mappers.category')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listCategoryByStoreService = async (storeid) => {
  try {
    const resultDB = await category.find({ store: storeid })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => categoryMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listCategoryAvailabilityByStoreService = async (storeid) => {
  try {
    const resultDB = await category.find({ store: storeid, availability: true })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => categoryMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listCategoryByIdService = async (storeid, categoryid) => {
  try {
    const resultDB = await category.find({
      _id: categoryid,
      store: storeid
    })
    // .populate('product')

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => categoryMapper.toDTOWithProducts(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createCategoryByStoreService = async (storeid, body) => {
  try {
    const resultDB = await category.create({
      name: body.name,
      code: body.code,
      availability: true,
      store: storeid
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: categoryMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateCategoryService = async (categoryid, body) => {
  try {
    const result = await category.findOneAndUpdate(
      { _id: categoryid },
      {
        $set: {
          name: body.name,
          code: body.code,
          availability: body.availability,
          products: body.products
        }
      },
      { new: true }
    )

    return {
      success: true,
      message: 'Data updated successfully',
      data: categoryMapper.toDTOWithProducts(result)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteCategoryService = async (categoryid) => {
  try {
    await category.deleteOne({ _id: categoryid })

    return {
      success: true,
      message: 'Data deleted successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listCategoryWithProductsService = async (categoryid, offset, limit) => {
  try {
    const resultDB = await product.paginate(
      { category: categoryid },
      { offset: Number(offset) || 0, limit: Number(limit) || 30 }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => categoryMapper.toDTOWithProducts(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateProductsByIdCategoryService = async (categoryid, body) => {
  try {
    await category.findOneAndUpdate(
      { _id: categoryid },
      {
        $set: {
          products: body.products
        }
      },
      { new: true }
    )

    const resultDB = await product.updateMany(
      { _id: { $in: [resultDB.product] } },
      { $set: { category: categoryid }, multi: true }
    )

    return {
      success: true,
      message: 'Data updated successfully',
      data: resultDB.map((item) => categoryMapper.toDTOWithProducts(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listCategoryByStoreService,
  listCategoryAvailabilityByStoreService,
  listCategoryByIdService,
  createCategoryByStoreService,
  updateCategoryService,
  deleteCategoryService,
  listCategoryWithProductsService,
  updateProductsByIdCategoryService
}
