const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  code: model.code,
  availability: model.availability,
  products: model?.products?.map((item) => ({
    id: item
  }))
})

const toDTOWithProducts = (model) => ({
  title: model.title,
  availability: model.availability,
  description: model.description,
  photos: model.photos,
  price: model.price.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  promotion: model.promotion.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  sku: model.sku,
  category: model.category,
  store: model.store,
  rating: model.rating
})

module.exports = {
  toDTO,
  toDTOWithProducts
}
