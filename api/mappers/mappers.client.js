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
  user: {
    id: model.user?._id,
    name: model.user?.name,
    email: model.user?.email,
    store: model.user?.store,
    permissions: model.user?.permissions
  },
  client: {
    id: model._id,
    name: model.name,
    birthDate: model.birthDate,
    cpf: model.cpf,
    phones: model.phones,
    deleted: model.deleted,
    store: model.store
  },
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

const toDTOSolicitations = (model) => ({
  id: model._id,
  canceled: model.canceled,
  solicitationNumber: model.solicitationNumber,
  client: {
    id: model.client._id,
    user: model.client.user,
    name: model.client.name,
    birthDate: model.client.birthDate,
    cpf: model.client.cpf,
    phones: model.client.phones,
    deleted: model.client.deleted,
    address: {
      street: model.client.address.street,
      number: model.client.address.number,
      complement: model.client.address.complement,
      district: model.client.address.district,
      city: model.client.address.city,
      zipCode: model.client.address.zipCode,
      state: model.client.address.state
    }
  },
  cart: model.cart.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    unitPrice: formatPriceBr(item.unitPrice)
  })),
  payment: {
    id: model.payment._id,
    price: formatPriceBr(model.payment.price),
    type: model.payment.type,
    installments: model.payment.installments,
    status: model.payment.status,
    address: {
      street: model.payment.address.street,
      number: model.payment.address.number,
      complement: model.payment.address.complement,
      district: model.payment.address.district,
      city: model.payment.address.city,
      state: model.payment.address.state,
      zipCode: model.payment.address.zipCode
    },
    addressDeliveryIgualCharging: model.payment.addressDeliveryIgualCharging,
    store: model.payment.store,
    pagSeguroCode: model.payment.pagSeguroCode
  },
  shipping: model.shipping,
  deliveries: {
    id: model.deliveries._id,
    status: model.deliveries.status,
    trackingCode: model.deliveries.trackingCode,
    type: model.deliveries.type,
    price: formatPriceBr(model.deliveries.price),
    deliveryTime: model.deliveries.deliveryTime,
    address: {
      street: model.deliveries.address.street,
      number: model.deliveries.address.number,
      complement: model.deliveries.address.complement,
      district: model.deliveries.address.district,
      city: model.deliveries.address.city,
      state: model.deliveries.address.state,
      zipCode: model.deliveries.address.zipCode
    }
  },
  products: model.products.map((item) => ({
    id: item._id,
    title: item.title,
    availability: item.availability,
    description: item.description,
    photos: formatAddressImage(item.photos),
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
    freeShipping: item.weight
  }))
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

module.exports = {
  toDTO,
  toClientDTO,
  toDTOList,
  toDTOSolicitations,
  toDTOClientSolicitations
}
