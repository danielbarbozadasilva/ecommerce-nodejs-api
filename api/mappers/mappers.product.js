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

module.exports = {
  toDTO,
  toDTOList
}
