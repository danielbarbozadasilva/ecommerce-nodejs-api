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
        populate: 'user',
        offset: Number(offset || 0),
        limit: Number(limit || 30)
      }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.docs.map((item) => clientMapper.toClientDTO(item))
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
    const resultDB = await client.paginate({
      store,
      $or: [{ $text: { $search: `${search}`, $diacriticSensitive: false } }],
      $or: [{ phones: { $in: search } }],
      offset: Number(offset || 0),
      limit: Number(limit || 30)
    })
    return {
      success: true,
      message: 'Operation performed successfully',
      data: resultDB.docs.map((item) => clientMapper.toDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const updateClientService = async (id, store, body) => {
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
            zipCode: body.address.zipCode,
            state: body.address.state
          },
          store,
          birthDate: body.birthDate
        }
      },
      { new: true }
    )

    const userDB = await user.findOneAndUpdate(
      { _id: clientDB.user },
      {
        $set: {
          name: body.name,
          email: body.email,
          store,
          salt,
          hash: cryptography.createHash(body.password, salt)
        }
      },
      { new: true }
    )

    return {
      success: true,
      message: 'Operation performed successfully',
      data: clientMapper.toDTOList(userDB, clientDB)
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

const listByIdClientService = async (clientid, storeid) => {
  try {
    const resultDB = await client
      .findOne({ _id: clientid, store: storeid })
      .populate('user', '-salt -hash')

    return {
      success: true,
      message: 'Operation performed successfully',
      data: clientMapper.toClientDTO(resultDB)
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

const createClientService = async (store, body) => {
  try {
    const salt = cryptography.createSalt()

    const userDB = await user.create({
      name: body.name,
      email: body.email,
      store,
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
        zipCode: body.address.zipCode,
        state: body.address.state
      },
      store,
      user: userDB._id,
      birthDate: body.birthDate
    })

    return {
      success: true,
      message: 'Operation performed successfully',
      data: clientMapper.toDTOList(userDB, clientDB)
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
