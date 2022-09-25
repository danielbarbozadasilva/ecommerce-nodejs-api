const { store } = require('../models/models.index')
const storeMapper = require('../mappers/mappers.store')

const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllStoresService = async () => {
  try {
    const resultDB = await store.find({}).sort({ name: 1 })

    return {
      success: true,
      message: 'Stores listed successfully',
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
      message: 'Store listed successfully',
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
          phones: body.phones,
          address: {
            location: body.address.location,
            number: body.address.number,
            complement: body.address.complement,
            district: body.address.district,
            city: body.address.city,
            zipCode: body.address.zipCode
          }
        }
      },
      { new: true }
    )

    return {
      success: true,
      message: 'Store successfully updated',
      data: storeMapper.toDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteStoreService = async (id) => {
  try {
    await store.deleteOne({ _id: id })

    return {
      success: true,
      message: 'Store successfully deleted'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const createStoreService = async (body) => {
  try {
    const result = await store.create({
      cnpj: body.cnpj,
      name: body.name,
      email: body.email,
      phones: body.phones,
      address: {
        location: body.address.location,
        number: body.address.number,
        complement: body.address.complement,
        district: body.address.district,
        city: body.address.city,
        zipCode: body.address.zipCode
      }
    })

    return {
      success: true,
      message: 'Store created successfully',
      data: storeMapper.toDTO(result)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllStoresService,
  listByIdStoreService,
  updateStoreService,
  deleteStoreService,
  createStoreService
}
