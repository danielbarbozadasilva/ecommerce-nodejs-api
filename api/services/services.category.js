const { category } = require('../models/models.index')

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
    const resultDB = await category
      .find({
        store: storeid,
        _id: categoryid
      })
      .populate(['products'])

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
    await category.findOneAndUpdate(
      { _id: categoryid },
      {
        $set: {
          name: body.name,
          code: body.code,
          availability: body.availability,
          product: body.product
        }
      }
    )

    return {
      success: true,
      message: 'Data updated successfully'
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

const listCategoryWithProductsService = async (categoryid) => {
  try {
    const resultDB = await category.findById(categoryid).populate(['products'])

    return {
      success: true,
      message: 'Operation performed successfully',
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
  listCategoryWithProductsService
}
