const toDTO = (model) => ({
  _id: model.id,
  code: model.code,
  name: model.name,
  price: model.price,
  promotion: model.promotion,
  delivery: {
    dimensions: {
      height: model.delivery.dimensions.height,
      width: model.delivery.dimensions.width,
      depth: model.delivery.dimensions.depth
    },
    weight: model.delivery.weight,
    freeShipping: model.delivery.freeShipping
  },
  quantity: model.quantity,
  store: model.store,
  product: model.product,
  photos: model.photos
})

module.exports = {
  toDTO
}
