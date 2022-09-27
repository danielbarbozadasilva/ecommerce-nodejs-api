const { solicitation, product, variation } = require('../models/models.index')
const solicitationMapper = require('../mappers/mappers.solicitation')

const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllSolicitationService = async (offset, limit, storeid) => {
  try {
    const resultDB = await solicitation.paginate(
      { store: storeid },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        populate: ['client', 'payment', 'delivery']
      }
    )
    solicitation.docs = await Promise.all(
      solicitation.docs.map(async (solic) => {
        solic.cart = await Promise.all(
          solic.cart.map(async (item) => {
            item.product = await product.findById(item.product)
            item.variation = await variation.findById(item.variation)
            return item
          })
        )
        return solic
      })
    )
    return {
      success: true,
      message: 'Solicitation listed successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllSolicitationService
}
