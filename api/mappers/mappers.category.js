const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  code: model.code,
  availability: model.availability,
  product: model.product,
  store: model.store
})

const toDTOWithProducts = (model) => ({
  id: model._id,
  name: model.name,
  code: model.code,
  availability: model.availability,
  product: model.product,
  store: model.store,
  products: model.map((item) => ({
    title: item.product.title,
    availability: item.product.availability,
    description: item.product.description,
    photos: item.product.photos,
    price: item.product.price,
    promotion: item.product.promotion,
    sku: item.product.sku,
    category: item.product.category,
    store: item.product.store,
    rating: item.product.rating,
    variations: item.product.variations
  }))
})

module.exports = {
  toDTO,
  toDTOWithProducts
}
