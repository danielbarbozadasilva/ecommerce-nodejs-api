const { formatAddressImage } = require('../utils/helpers/helpers.format')

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
  photo: formatAddressImage(model.photo)
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
