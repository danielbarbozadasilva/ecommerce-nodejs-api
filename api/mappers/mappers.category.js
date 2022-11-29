const {
  formatPriceBr,
  formatAddressImage
} = require('../utils/helpers/helpers.format')

const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  code: model.code,
  availability: model.availability,
  photo: formatAddressImage(model.photo)
})

const toDTOWithProducts = (model) => ({
  title: model.title,
  availability: model.availability,
  description: model.description,
  photos: model.photos.map((item) => formatAddressImage(item)),
  price: formatPriceBr(model.price),
  promotion: formatPriceBr(model.promotion),
  sku: model.sku,
  category: model.category,
  store: model.store,
  rating: model.rating
})

module.exports = {
  toDTO,
  toDTOWithProducts
}
