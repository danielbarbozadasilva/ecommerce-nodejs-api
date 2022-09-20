const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  email: model.email,
  cpf: model.cpf,
  phones: model.phones,
  birthDate: model.birthDate,
  user: model.user,
  address: {
    location: model.address.location,
    number: model.address.number,
    complement: model.address.complement,
    district: model.address.district,
    city: model.address.city,
    zipCode: model.address.zipCode,
    state: model.address.state
  }
})

const toDTOList = (userDB, clientDB) => ({
  id: clientDB._id,
  name: userDB.name,
  email: userDB.email,
  cpf: clientDB.cpf,
  phones: clientDB.phones,
  birthDate: clientDB.birthDate,
  user: clientDB.user,
  address: {
    location: clientDB.address.location,
    number: clientDB.address.number,
    complement: clientDB.address.complement,
    district: clientDB.address.district,
    city: clientDB.address.city,
    zipCode: clientDB.address.zipCode,
    state: clientDB.address.state
  }
})

const toClientDTO = (model) => ({
  user: {
    id: model.user._id,
    name: model.user.name,
    email: model.user.email,
    store: model.user.store,
    permissions: model.user.permissions
  },
  client: {
    id: model._id,
    name: model.name,
    birthDate: model.birthDate,
    cpf: model.cpf,
    phones: model.phones,
    deleted: model.deleted,
    store: model.store
  },
  address: {
    location: model.address.location,
    number: model.address.number,
    complement: model.address.complement,
    district: model.address.district,
    city: model.address.city,
    zipCode: model.address.zipCode,
    state: model.address.state
  }
})

module.exports = {
  toDTO,
  toClientDTO,
  toDTOList
}
