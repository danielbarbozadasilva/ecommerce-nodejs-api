const toDTO = (model) => ({
  code: model.code,
  name: model.name,
  price: model.price,
  promotion: model.promotion,
  delivery: model.delivery,
  quantity: model.quantity,
  store: model.store,
  product: model.product
})

module.exports = {
  toDTO
}
