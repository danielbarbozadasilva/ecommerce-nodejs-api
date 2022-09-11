const { client } = require('../models/models.index')
const clientMapper = require('../mappers/mappers.client')

const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllClientsService = async () => {
  try {
    const resultDB = await client.find({}).sort({ name: 1 })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.map((item) => clientMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllClientsService
}
