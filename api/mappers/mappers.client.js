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
  client: {
    id: model.client[0]._id,
    user: model.client[0].user,
    name: model.client[0].name,
    birthDate: model.client[0].birthDate,
    cpf: model.client[0].cpf,
    phones: model.client[0].phones,
    deleted: model.client[0].deleted,
    address: {
      street: model.client[0].address.street,
      number: model.client[0].address.number,
      complement: model.client[0].address.complement,
      district: model.client[0].address.district,
      city: model.client[0].address.city,
      zipCode: model.client[0].address.zipCode,
      state: model.client[0].address.state
    }
  },
  cart: model.cart.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    unitPrice: item.unitPrice
  })),
  payment: model.payment.map((item) => ({
    id: item._id,
    price: item.price,
    type: item.type,
    installments: item.installments,
    status: item.status,
    address: {
      street: item.address.street,
      number: item.address.number,
      complement: item.address.complement,
      district: item.address.district,
      city: item.address.city,
      state: item.address.state,
      zipCode: item.address.zipCode
    },
    addressDeliveryIgualCharging: item.addressDeliveryIgualCharging,
    store: item.store,
    pagSeguroCode: item.pagSeguroCode
  })),
  shipping: model.shipping,
  deliveries: model.deliveries.map((item) => ({
    id: item._id,
    status: item.status,
    trackingCode: item.trackingCode,
    type: item.type,
    price: item.price,
    deliveryTime: item.deliveryTime,
    address: {
      street: item.address.street,
      number: item.address.number,
      complement: item.address.complement,
      district: item.address.district,
      city: item.address.city,
      state: item.address.state,
      zipCode: item.address.zipCode
    }
  })),

  products: model.products.map((item) => ({
    id: item._id,
    title: item.title,
    availability: item.availability,
    description: item.description,
    photos: item.photos,
    price: item.price,
    promotion: item.promotion,
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
