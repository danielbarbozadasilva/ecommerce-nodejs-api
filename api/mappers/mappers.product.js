const toDTO = (model) => ({
  id: model._id,
  title: model.title,
  availability: model.availability,
  description: model.description,
  photos: model.photos,
  price: model.price,
  promotion: model.promotion,
  sku: model.sku,
  store: model.storeid,
  category: {
    _id: model.category._id,
    name: model.category.name,
    code: model.category.code,
    store: model.category.store,
    availability: model.category.availability,
    products: model.category.products
  }
})

module.exports = {
  toDTO
}
