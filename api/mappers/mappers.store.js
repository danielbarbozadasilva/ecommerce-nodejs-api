const toDTO = (model) => ({
  id: model._id,
  cnpj: model.cnpj,
  name: model.name,
  email: model.email,
  phones: model.phones,
  address: {
    location: model.address.location,
    number: model.address.number,
    complement: model.address.complement,
    district: model.address.district,
    city: model.address.city,
    zipCode: model.address.zipCode
  }
})

module.exports = {
  toDTO
}
