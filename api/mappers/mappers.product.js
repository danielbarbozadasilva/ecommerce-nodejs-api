const {
  formatPriceBr,
  formatAddressImage
} = require('../utils/helpers/helpers.format')

const toDTO = (model, metaData) => {
  let media = 0
  let cont = 0

  return {
    id: model._id,
    title: model.title,
    availability: model.availability,
    description: model.description,
    photos: model.photos.map((item) => formatAddressImage(item)),
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
    },
    rating: model.rating.map((item) => {
    media += item.score,
    cont++
      return {
        _id: item._id,
        name: item.name,
        text: item.text,
        score: item.score,
        product: item.product,
        client: item.client
      }
    }),
    total: media / cont,
    metaData: metaData.total,
    likes: model.likes
  }
}

const toDTOProduct = (model) => {
  return {
    id: model._id,
    title: model.title,
    availability: model.availability,
    description: model.description,
    photos: model.photos.map((item) => formatAddressImage(item)),
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
    likes: model.likes
  }
}

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
    photos: model.photos.map((item) => formatAddressImage(item)),
    price: formatPriceBr(model.product.price),
    promotion: formatPriceBr(model.product.promotion),
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
  toDTORating,
  toDTOProduct
}
