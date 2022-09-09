const toDTO = (model) => ({
  _id: model._id,
  name: model.name,
  cnpj: model.cnpj,
  email: model.email,
  phone: model.phone,
  address: model.address
})

module.exports = {
  toDTO
}
