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

const listByIdStoreService = async (id) => {
  try {
    const resultDB = await store.findById(id)

    return {
      success: true,
      message: 'Operation performed successfully',
      data: storeMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateStoreService = async (id, body) => {
  try {

    const resultDB = await store.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          cnpj: body.cnpj,
          name: body.name,
          email: body.email,
          phone: body.phone,
          address: body.address
        }
      }
    )

    return {
      success: true,
      message: 'Data updated successfully',
      data: storeMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}
module.exports = {
  listAllStoresService,
  listByIdStoreService,
  updateStoreService
}
