const {
  client,
  solicitation,
  product,
  variation
} = require('../models/models.index')
const clientMapper = require('../mappers/mappers.client')
const ErrorGeneric = require('../utils/errors/erros.generic-error')

const listAllClientsService = async (offset, limit, store) => {
  try {
    const resultDB = await client.paginate(
      { store },
      { offset, limit, populate: 'user' }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listClientSolicitationService = async (offset, limit, store, search) => {
  try {
    const searchExp = new RegExp(search, 'i')

    const resultClient = await client.find({
      store,
      $text: { $search: searchExp, $diacriticSensitive: false }
    })

    const ordered = await solicitation.paginate(
      { store, client: { $in: resultClient.map((item) => item._id) } },
      { offset, limit, populate: ['client', 'payment', 'delivery'] }
    )

    ordered.docs = await Promise.all(
      ordered.docs.map(async (ord) => {
        ord.cart = await Promise.all(
          ord.cart.map(async (item) => {
            item.product = await product.findById(item.product)
            item.variation = await variation.findById(item.variation)
            return item
          })
        )
        return ordered
      })
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: ordered
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listClientSearchService = async (offset, limit, store, search) => {
  try {
    const resultDB = await client.paginate(
      {
        store,
        $or: [
          { $text: { $search: search, $diacriticSensitive: false } },
          { phones: { $regex: search } }
        ]
      },
      { offset, limit, populate: { path: 'user', select: '-salt -hash' } }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listAdminService = async (id, store) => {
  try {
    const resultDB = await client
      .findOne({ id }, { store })
      .populate({ path: 'user', select: '-salt -hash' })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}
module.exports = {
  listAllClientsService,
  listClientSolicitationService,
  listClientSearchService,
  listAdminService
}
