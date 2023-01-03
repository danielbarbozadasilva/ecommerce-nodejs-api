const {
  formatPriceBr,
  formatAddressImage
} = require('../utils/helpers/helpers.format')

const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  code: model.code,
  availability: model.availability ? '1' : '0',
  photo: formatAddressImage(model.photo)
})

const toDTOList = (model) => ({
  id: model._id,
  name: model.name,
  code: model.code,
  availability: model.availability ? 'Sim' : 'Não',
  photo: formatAddressImage(model.photo),
  product: model.product.map((item) => ({
    id: item._id,
    title: item.title,
    availability: item.availability,
    description: item.description,
    photos: item.photos,
    price: formatPriceBr(item.price),
    promotion: formatPriceBr(item.promotion),
    sku: item.sku,
    quantity: item.quantity,
    blockedQuantity: item.blockedQuantity,
    dimensions: {
      height: item.dimensions.height,
      width: item.dimensions.width,
      depth: item.dimensions.depth
    },
    weight: item.weight,
    freeShipping: item.freeShipping
  }))
})

const toDTOWithProducts = (model) => ({
  id: model._id,
  title: model.title,
  availability: model.availability,
  description: model.description,
  photos: model.photos.map((item) => formatAddressImage(item)),
  price: model.price,
  promotion: model.promotion,
  sku: model.sku,
  category: model.category,
  store: model.store,
  rating: model.rating
})

module.exports = {
  toDTO,
  toDTOList,
  toDTOWithProducts
}
