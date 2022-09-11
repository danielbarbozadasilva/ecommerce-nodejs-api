const toDTO = (model) => ({
  user: model.user,
  name: model.name,
  birthDate: model.birthDate,
  cpf: model.cpf,
  phones: model.phones,
  deleted: model.deleted,
  store: model.store,
  address: {
    location: model.address.location,
    number: model.address.number,
    complement: model.address.complement,
    district: model.address.district,
    city: model.address.city,
    state: model.address.state,
    zipCode: model.address.zipCode
  }
})

module.exports = {
  toDTO
}
