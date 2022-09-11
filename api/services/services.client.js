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
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        populate: 'user'
      }
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
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        populate: ['client', 'payment', 'delivery']
      }
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
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        populate: { path: 'user', select: '-salt -hash' }
      }
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

const listSolicitationService = async (offset, limit, store, id) => {
  try {
    const resp = await solicitation.paginate(
      { store, cliente: id },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        populate: ['client', 'pagamento', 'entrega']
      }
    )
    resp.docs = await Promise.all(
      resp.docs.map(async (solic) => {
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
      message: 'Operation performed successfully',
      data: resp
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllClientsService,
  listClientSolicitationService,
  listClientSearchService,
  listAdminService,
  listSolicitationService
}
