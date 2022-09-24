const toDTOWithProducts = (model) => ({
  id: model._id,
  name: model.name,
  code: model.code,
  availability: model.availability,
  product: model.product,
  store: model.store,
  products: model?.products?.map((item) => ({
    title: item.title,
    availability: item.availability,
    description: item.description,
    photos: item.photos,
    price: item.price,
    promotion: item.promotion,
    sku: item.sku,
    category: item.category,
    store: item.store,
    rating: item.rating,
    variations: item.variations
  }))
})

module.exports = {
  toDTOWithProducts
}
