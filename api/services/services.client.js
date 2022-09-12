const {
  user,
  client,
  solicitation,
  product,
  variation
} = require('../models/models.index')
const clientMapper = require('../mappers/mappers.client')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const cryptography = require('../utils/utils.cryptography')

const listAllClientsService = async (offset, limit, store) => {
  try {
    const resultDB = await client.paginate(
      { store },
      {
        offset: Number(offset || 0),
        limit: Number(limit || 30),
        populate: 'user',
        select: '-salt -hash'
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
    const resultClient = await client.find({
      store,
      $text: { $search: new RegExp(search, 'i'), $diacriticSensitive: false }
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
          { phones: { $regex: new RegExp(search, 'i') } }
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

const updateClientService = async (id, body) => {
  try {
    const salt = cryptography.createSalt()

    const clientDB = await client.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: body.name,
          cpf: body.cpf,
          phones: body.phones,
          address: {
            location: body.address.location,
            number: body.address.number,
            complement: body.address.complement,
            district: body.address.district,
            city: body.address.city,
            zipCode: body.address.zipCode
          },
          store: body.store,
          birthDate: body.birthDate
        }
      }
    )

    await user.findOneAndUpdate(
      { _id: clientDB.user },
      {
        $set: {
          name: body.name,
          email: body.email,
          store: body.store,
          salt,
          hash: cryptography.createHash(body.password, salt)
        }
      }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: clientDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const deleteClientService = async (id) => {
  try {
    const resultClient = await client.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          deleted: true
        }
      }
    )

    await user.deleteOne({ _id: resultClient.user })

    return {
      success: true,
      message: 'Deleted successfully'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdClientService = async (clientid, store) => {
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

const createClientService = async (body) => {
  try {
    const salt = cryptography.createSalt()

    const userDB = await user.create({
      name: body.name,
      email: body.email,
      store: body.store,
      salt,
      hash: cryptography.createHash(body.password, salt)
    })

    const clientDB = await client.create({
      name: body.name,
      cpf: body.cpf,
      phones: body.phones,
      address: {
        location: body.address.location,
        number: body.address.number,
        complement: body.address.complement,
        district: body.address.district,
        city: body.address.city,
        state: body.address.state,
        zipCode: body.address.zipCode
      },
      store: body.store,
      birthDate: body.birthDate,
      user: userDB._id
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: clientDB
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

module.exports = {
  listAllClientsService,
  listClientSolicitationService,
  listClientSearchService,
  updateClientService,
  deleteClientService,
  listByIdClientService,
  listSolicitationService,
  createClientService
}
