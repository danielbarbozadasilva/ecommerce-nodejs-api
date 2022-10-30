const { ObjectId } = require('mongodb')
const {
  solicitation,
  product,
  payment,
  user,
  client,
  deliveries
} = require('../models/models.index')

const clientMapper = require('../mappers/mappers.client')
const ErrorGeneric = require('../utils/errors/erros.generic-error')
const cryptography = require('../utils/utils.cryptography')

const listAllClientsService = async (offset, limit) => {
  try {
    const resultDB = await client.paginate({
      populate: 'user',
      offset: Number(offset || 0),
      limit: Number(limit || 30)
    })

    return {
      success: true,
      message: 'Successfully Listed Clients',
      data: resultDB.docs.map((item) => clientMapper.toClientDTO(item))
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listClientSolicitationService = async (offset, limit, search) => {
  try {
    const resultDB = await client.aggregate([
      {
        $match: {
          $text: {
            $search: `.*${search}.*`
          }
        }
      },
      {
        $lookup: {
          from: solicitation.collection.name,
          localField: '_id',
          foreignField: 'client',
          as: 'solicitations'
        }
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $skip: Number(offset) || 0 },
            { $limit: Number(limit) || 30 }
          ]
        }
      }
    ])

    return {
      success: true,
      message: 'Solicitations listed successfully',
      data: resultDB[0].data.map((item) =>
        clientMapper.toDTOClientSolicitations(item)
      )
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listClientSearchService = async (offset, limit, search) => {
  try {
    const resultDB = await client.paginate({
      $or: [{ $text: { $search: `${search}`, $diacriticSensitive: false } }],
      $or: [{ phones: { $in: search } }],
      offset: Number(offset || 0),
      limit: Number(limit || 30)
    })
    return {
      success: true,
      message: 'Successfully Listed Clients',
      data: resultDB.docs.map((item) => clientMapper.toDTO(item))
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
            street: body.address.street,
            number: body.address.number,
            complement: body.address.complement,
            district: body.address.district,
            city: body.address.city,
            zipCode: body.address.zipCode,
            state: body.address.state
          },
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
          salt,
          hash: cryptography.createHash(body.password, salt)
        }
      },
      { new: true }
    )

    return {
      success: true,
      message: 'Client successfully updated',
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
      message: 'Client successfully deleted'
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listByIdClientService = async (clientid) => {
  try {
    const resultDB = await client
      .findOne({ _id: clientid })
      .populate('user', '-salt -hash')

    return {
      success: true,
      message: 'Client listed successfully',
      data: clientMapper.toClientDTO(resultDB)
    }
  } catch (err) {
    throw new ErrorGeneric(`Internal Server Error! ${err}`)
  }
}

const listSolicitationClientService = async (offset, limit, clientid) => {
  try {
    const resultDB = await solicitation.aggregate([
      { $match: { client: ObjectId(clientid) } },
      {
        $lookup: {
          from: product.collection.name,
          localField: 'cart.product',
          foreignField: '_id',
          as: 'products'
        }
      },
      {
        $lookup: {
          from: client.collection.name,
          localField: 'client',
          foreignField: '_id',
          as: 'client'
        }
      },
      {
        $lookup: {
          from: payment.collection.name,
          localField: 'payment',
          foreignField: '_id',
          as: 'payment'
        }
      },
      {
        $lookup: {
          from: deliveries.collection.name,
          localField: 'deliveries',
          foreignField: '_id',
          as: 'deliveries'
        }
      },
      {
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $skip: Number(offset) || 0 },
            { $limit: Number(limit) || 30 }
          ]
        }
      }
    ])

    return {
      success: true,
      message: 'Solicitations listed successfully',
      data: resultDB[0].data.map((item) =>
        clientMapper.toDTOSolicitations(item)
      )
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
      salt,
      hash: cryptography.createHash(body.password, salt)
    })

    const clientDB = await client.create({
      name: body.name,
      cpf: body.cpf,
      phones: body.phones,
      address: {
        street: body.address.street,
        number: body.address.number,
        complement: body.address.complement,
        district: body.address.district,
        city: body.address.city,
        zipCode: body.address.zipCode,
        state: body.address.state
      },
      user: userDB._id,
      birthDate: body.birthDate
    })

    return {
      success: true,
      message: 'Client created successfully',
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
  listSolicitationClientService,
  createClientService
}
