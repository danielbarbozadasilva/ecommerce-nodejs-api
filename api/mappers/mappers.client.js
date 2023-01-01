const moment = require('moment')
const {
  formatPriceBr,
  formatAddressImage
} = require('../utils/helpers/helpers.format')

const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  email: model.email,
  cpf: model.cpf,
  phones: model.phones,
  birthDate: model.birthDate,
  user: model.user,
  address: {
    street: model.address.street,
    number: model.address.number,
    complement: model.address.complement,
    district: model.address.district,
    city: model.address.city,
    zipCode: model.address.zipCode,
    state: model.address.state
  }
})

const toDTOList = (userDB, clientDB) => ({
  id: clientDB._id,
  name: userDB.name,
  email: userDB.email,
  cpf: clientDB.cpf,
  phones: clientDB.phones,
  birthDate: clientDB.birthDate,
  user: clientDB.user,
  address: {
    street: clientDB.address.street,
    number: clientDB.address.number,
    complement: clientDB.address.complement,
    district: clientDB.address.district,
    city: clientDB.address.city,
    zipCode: clientDB.address.zipCode,
    state: clientDB.address.state
  }
})

const toClientDTO = (model) => ({
  id: model.user?._id,
  name: model.user?.name,
  email: model.user?.email,
  birthDate: model.birthDate,
  cpf: model.cpf,
  phone01: model.phones[0],
  phone02: model.phones[1],
  street: model.address.street,
  number: model.address.number,
  complement: model.address.complement,
  district: model.address.district,
  city: model.address.city,
  zipCode: model.address.zipCode,
  uf: model.address.state
})

const toDTOSolicitations = (model) => ({
  id: model._id,
  canceled: model.canceled,
  solicitationNumber: model.solicitationNumber,
  price: formatPriceBr(model.payment.price),
  type: model.payment.type,
  installments: model.payment.installments,
  status: model.payment.status,
  pagSeguroCode: model.payment.pagSeguroCode,
  shipping: formatPriceBr(model.shipping),
  cart: model.cart.map((item) => ({
    id: item.product,
    quantity: item.quantity,
    unitPrice: formatPriceBr(item.price),
    title: item.title
  })),
  deliveries: [
    {
      id: model.deliveries._id,
      status: model.deliveries.status,
      trackingCode: model.deliveries.trackingCode,
      type: model.deliveries.type,
      price: formatPriceBr(model.deliveries.price),
      deliveryTime: model.deliveries.deliveryTime,
      street: model.deliveries.address.street,
      number: model.deliveries.address.number,
      complement: model.deliveries.address.complement,
      district: model.deliveries.address.district,
      city: model.deliveries.address.city,
      state: model.deliveries.address.state,
      zipCode: model.deliveries.address.zipCode
    }
  ]
})

const toDTOClientSolicitations = (model) => ({
  client: {
    id: model._id,
    name: model.name,
    birthDate: model.birthDate,
    cpf: model.cpf,
    phones: model.phones,
    deleted: model.deleted,
    store: model.store
  },
  solicitation: model.solicitations.map((item) => ({
    id: item._id,
    solicitationNumber: model.solicitationNumber,
    client: item.client,
    cart: item.cart,
    payment: item.payment,
    deliveries: item.deliveries
  }))
})

const toDTOLikeList = (model) => {
  let media = 0
  let cont = 0

  return {
    id: model._id,
    title: model.title,
    description: model.description,
    photos: model.photos.map((item) => formatAddressImage(item)),
    price: model.price,
    promotion: model.promotion,
    quantity: model.quantity,
    freeShipping: model.freeShipping,
    rating: model.rating.map((item) => {
      ;(media += item.score), cont++
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
    liked: !!model.client
  }
}

module.exports = {
  toDTO,
  toClientDTO,
  toDTOList,
  toDTOSolicitations,
  toDTOClientSolicitations,
  toDTOLikeList
}
