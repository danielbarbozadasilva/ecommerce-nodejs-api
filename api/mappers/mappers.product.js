const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  code: model.code,
  availability: model.availability,
  products: model?.products?.map((item) => ({
    id: item
  })),
  store: model.store
})

module.exports = {
  toDTO
}
