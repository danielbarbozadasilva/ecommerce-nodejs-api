const toDTO = (model) => ({
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

const toDTOCart = (model) => ({
  id: model._id,
  canceled: model.canceled,
  cart: model.cart.map((item, i) => ({
    product: model.products[i],
    quantity: item.quantity,
    unitPrice: item.unitPrice
  })),
  shipping: model.shipping
})

const toDTOList = (solicitation, deliveries) => ({
  deliveries: {
    price: deliveries.price,
    type: deliveries.type,
    deliveryTime: deliveries.deliveryTime,
    address: deliveries.address,
    status: deliveries.status,
    trackingCode: deliveries.trackingCode,
    store: deliveries.store
  },
  solicitation: {
    id: solicitation._id,
    client: solicitation.client,
    cart: solicitation.cart,
    payment: solicitation.payment,
    deliveries: solicitation.deliveries
  }
})

module.exports = {
  toDTO,
  toDTOCart,
  toDTOList
}
