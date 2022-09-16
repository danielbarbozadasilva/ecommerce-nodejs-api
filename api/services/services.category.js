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

module.exports = {
  listCategoryByStoreService,
  listCategoryAvailabilityByStoreService,
  listCategoryByIdService,
  createCategoryByStoreService
}
