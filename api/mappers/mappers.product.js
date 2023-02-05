const {
  formatPriceBr,
  formatAddressImage
} = require('../utils/helpers/helpers.format')

const toDTO = (model) => {
  let media = 0
  let count = 0

  return {
    countDocs: model?.metadata[0]?.total,
    data: model.data.map((item) => ({
      id: item._id,
      title: item.title,
      availability: item.availability,
      description: item.description,
      photos: item.photos.map((data) => formatAddressImage(data)),
      price: item.price,
      promotion: item.promotion,
      sku: item.sku,
      quantity: item.quantity,
      store: item.storeid,
      dimensions: {
        height: item.dimensions.height,
        width: item.dimensions.width,
        depth: item.dimensions.depth
      },
      weight: item.weight,
      freeShipping: item.freeShipping,
      category: {
        _id: item.category._id,
        name: item.category.name,
        code: item.category.code,
        store: item.category.store,
        availability: item.category.availability,
        products: item.category.products
      },
      rating: item.rating.map((data) => {
        media += data.score, 
        count++
        return {
          _id: data._id,
          name: data.name,
          text: data.text,
          score: data.score,
          product: data.product,
          client: data.client
        }
      }),
      totalScore: media / count,
      likes: model.likes
    }))
  }
}

const toDTOList = (model) => ({
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
  category: model.category._id,
  categoryName: model.category.name,
  likes: model.likes,
  rating: model.rating
    ? [
        {
          id: model.rating._id,
          name: model.rating.name,
          text: model.rating.text,
          score: model.rating.score,
          product: model.rating.product,
          client: model.rating.client
        }
      ]
    : {}
})

const toDTOProduct = (model) => ({
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
  height: model.dimensions.height,
  width: model.dimensions.width,
  depth: model.dimensions.depth,
  weight: model.weight,
  freeShipping: model.freeShipping ? '1' : '0',
  category: model.category._id,
  categoryName: model.category.name,
  likes: model.likes,
  rating: model.rating
    ? [
        {
          id: model.rating._id,
          name: model.rating.name,
          text: model.rating.text,
          score: model.rating.score,
          product: model.rating.product,
          client: model.rating.client
        }
      ]
    : {}
})

const toDTORating = (model) => ({
  id: model._id,
  name: model.name,
  text: model.text,
  score: model.score,
  product: {
    id: model.product._id,
    title: model.product.title,
    availability: model.product.availability,
    description: model.product.description,
    photos: model.photos?.map((item) => formatAddressImage(item)),
    price: formatPriceBr(model.product.price),
    promotion: formatPriceBr(model.product.promotion),
    sku: model.product.sku,
    quantity: model.quantity,
    dimensions: {
      height: model.product.dimensions.height,
      width: model.product.dimensions.width,
      depth: model.product.dimensions.depth
    },
    weight: model.weight,
    freeShipping: model.freeShipping
  }
})

module.exports = {
  toDTO,
  toDTORating,
  toDTOProduct,
  toDTOList
}
