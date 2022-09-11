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
const updateClientAdminService = async (clientid, body) => {
  try {
    await client.findOneAndUpdate(
      { _id: clientid },
      {
        $set: {
          cpf: body.cpf,
          name: body.name,
          email: body.email,
          phones: body.phones,
          birthDate: body.birthDate,
          address: {
            location: body.address.location,
            number: body.address.number,
            complement: body.address.complement,
            district: body.address.district,
            city: body.address.city,
            zipCode: body.address.zipCode
          }
        }
      }
    )
    return {
      success: true,
      message: 'Operation performed successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteClientAdminService = async (clientid) => {
  try {
    await client.deleteOne({ _id: clientid })

    return {
      success: true,
      message: 'Admin deleted successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdClientAdminService = async (clientid, store) => {
  try {
    const resultDB = await client
      .findOne({ _id: clientid }, { store })
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

const listSolicitationService = async (offset, limit, store, clientid) => {
  try {
    const resp = await solicitation.paginate(
      { store, client: clientid },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        populate: ['client', 'payment', 'delivery']
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
  listByIdClientAdminService,
  updateClientAdminService,
  deleteClientAdminService,
  listSolicitationService
}
