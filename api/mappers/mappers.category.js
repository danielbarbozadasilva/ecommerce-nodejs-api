const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  code: model.code,
  availability: model.availability,
  product: model.product,
  store: model.store
})

module.exports = {
  toDTO
}
