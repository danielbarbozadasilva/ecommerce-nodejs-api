const toDTO = (model) => ({
  id: model._id,
  title: model.title,
  availability: model.availability,
  description: model.description,
  photos: model.photos,
  price: model.price,
  promotion: model.promotion,
  sku: model.sku,
  quantity: model.quantity,
  store: model.storeid,
  dimensions: {
    height: model.dimensions.height,
    width: model.dimensions.width,
    depth: model.dimensions.depth
  },
  weight: model.weight,
  freeShipping: model.freeShipping,
  category: {
    _id: model.category._id,
    name: model.category.name,
    code: model.category.code,
    store: model.category.store,
    availability: model.category.availability,
    products: model.category.products
  }
})

const toDTORating = (model) => ({
  id: model._id,
  name: model.name,
  text: model.text,
  score: model.score,
  store: model.store,
  product: {
    id: model.product._id,
    title: model.product.title,
    availability: model.product.availability,
    description: model.product.description,
    photos: model.product.photos,
    price: model.product.price,
    promotion: model.product.promotion,
    sku: model.product.sku,
    quantity: model.quantity,
    dimensions: {
      height: model.dimensions.height,
      width: model.dimensions.width,
      depth: model.dimensions.depth
    },
    weight: model.weight,
    freeShipping: model.freeShipping
  }
})

module.exports = {
  toDTO,
  toDTORating
}
