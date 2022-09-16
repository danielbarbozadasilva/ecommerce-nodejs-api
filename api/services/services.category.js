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

module.exports = {
  listCategoryByStoreService
}
