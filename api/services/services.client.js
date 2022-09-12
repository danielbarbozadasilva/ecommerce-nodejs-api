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
    const clientDB = await client
      .findById(clientid)
      .populate({ path: 'user', select: '-salt -hash' })

    clientDB.user.name = body.name
    clientDB.name = body.name
    clientDB.user.email = body.email
    clientDB.cpf = body.cpf
    clientDB.phones = body.phones
    clientDB.address = body.address
    clientDB.birthDate = body.birthDate

    await clientDB.user.save()
    await clientDB.save()

    return {
      success: true,
      message: 'Operation performed successfully',
      data: clientDB
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

const listByIdClientService = async (clientid, store) => {
  try {
    const resultDB = await client
      .findOne({ user: clientid }, { store })
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
        zipCode: body.address.zipCode
      },
      store: body.store,
      birthDate: body.birthDate,
      user: userDB._id
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: {
        clientDB: { ...clientDB._doc, email: user.email }
      }
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateClientService = async (id, body) => {
  try {
    const clientDB = await client.findOne({ user: id }).populate('user')

    const salt = cryptography.createSalt()

    clientDB.user.name = body.name
    clientDB.name = body.name
    clientDB.user.email = body.email
    clientDB.salt = salt
    clientDB.hash = cryptography.createHash(body.password, salt)
    clientDB.cpf = body.cpf
    clientDB.phones = body.phones
    clientDB.address = body.address
    clientDB.birthDate = body.birthDate

    await clientDB.user.save()
    await clientDB.save()

    // criar mapper assim:
    clientDB.user = {
      email: clientDB.user.email,
      _id: clientDB.user._id,
      permissions: clientDB.user.permissions
    }

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
  listByIdClientAdminService,
  updateClientAdminService,
  deleteClientAdminService,
  listSolicitationService,
  listByIdClientService,
  createClientService,
  updateClientService
}
