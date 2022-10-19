const toDTO = (model) => ({
  _id: model.id,
  code: model.code,
  name: model.name,
  price: model.price,
  promotion: model.promotion,
  deliveries: {
    dimensions: {
      height: model.deliveries.dimensions.height,
      width: model.deliveries.dimensions.width,
      depth: model.deliveries.dimensions.depth
    },
    weight: model.deliveries.weight,
    freeShipping: model.deliveries.freeShipping
  },
  quantity: model.quantity,
  store: model.store,
  product: model.product,
  photos: model.photos
})

module.exports = {
  toDTO
}
