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

const toDTOList = (model) => ({
  id: model._id,
  title: model.title,
  availability: model.availability,
  description: model.description,
  photos: model.photos,
  price: model.price,
  promotion: model.promotion,
  sku: model.sku,
  store: {
    id: model.store._id,
    cnpj: model.store.cnpj,
    name: model.store.name,
    email: model.store.email,
    phones: model.store.phones,
    address: {
      location: model.store.address.location,
      number: model.store.address.number,
      complement: model.store.address.complement,
      district: model.store.address.district,
      city: model.store.address.city,
      zipCode: model.store.address.zipCode
    }
  },
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
    sku: model.product.sku
  }
})

const toDTOVariations = (model) => ({
  _id: model.id,
  code: model.code,
  name: model.name,
  price: model.price,
  promotion: model.promotion,
  delivery: {
    dimensions: {
      height: model.delivery.dimensions.height,
      width: model.delivery.dimensions.width,
      depth: model.delivery.dimensions.depth
    },
    weight: model.delivery.weight,
    freeShipping: model.delivery.freeShipping
  },
  quantity: model.quantity,
  store: model.store,
  photos: model.photos,
  product: {
    id: model.product._id,
    title: model.product.title,
    availability: model.product.availability,
    description: model.product.description,
    photos: model.product.photos,
    price: model.product.price,
    promotion: model.product.promotion,
    sku: model.product.sku
  }
})

module.exports = {
  toDTO,
  toDTOList,
  toDTORating,
  toDTOVariations
}
