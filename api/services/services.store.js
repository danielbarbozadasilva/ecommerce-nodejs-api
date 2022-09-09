const { store } = require('../models/models.index')
const storeMapper = require('../mappers/mappers.store')

const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllStoresService = async () => {
  try {
    const resultDB = await store.find({}).sort({ name: 1 })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => storeMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllStoresService
}
