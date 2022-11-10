const toDTO = (payment, registration) => ({
  payment: {
    id: payment.id,
    price: payment.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    type: payment.type,
    installments: payment.installments,
    status: payment.status,
    address: {
      street: payment.address.street,
      number: payment.address.number,
      complement: payment.address.complement,
      district: payment.address.district,
      city: payment.address.city,
      state: payment.address.state,
      zipCode: payment.address.zipCode
    },
    card: {
      fullName: payment.card.fullName,
      areaCode: payment.card.areaCode,
      phone: payment.card.phone,
      birthDate: payment.card.birthDate,
      creditCardToken: payment.card.creditCardToken,
      cpf: payment.card.cpf
    },
    solicitation: payment.solicitation,
    addressDeliveryIgualCharging: payment.addressDeliveryIgualCharging,
    pagSeguroCode: payment.pagSeguroCode
  },
  registration: {
    id: registration?.id,
    solicitation: registration?.solicitation,
    type: registration?.type,
    situation: registration?.situation
  }
})

const toDTOList = (payment) => ({
  payment: {
    id: payment._id,
    price: payment.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    type: payment.type,
    installments: payment.installments,
    status: payment.status,
    address: {
      street: payment.address.street,
      number: payment.address.number,
      complement: payment.address.complement,
      district: payment.address.district,
      city: payment.address.city,
      state: payment.address.state,
      zipCode: payment.address.zipCode
    },
    card: {
      fullName: payment.card.fullName,
      areaCode: payment.card.areaCode,
      phone: payment.card.phone,
      birthDate: payment.card.birthDate,
      creditCardToken: payment.card.creditCardToken,
      cpf: payment.card.cpf
    },
    solicitation: payment.solicitation,
    addressDeliveryIgualCharging: payment.addressDeliveryIgualCharging,
    pagSeguroCode: payment.pagSeguroCode
  }
})

const toDTOCart = (model) => ({
  id: model._id,
  price: model.price,
  type: model.type,
  installments: model.installments,
  status: model.status,
  address: {
    street: model.address.street,
    number: model.address.number,
    complement: model.address.complement,
    district: model.address.district,
    city: model.address.city,
    state: model.address.state,
    zipCode: model.address.zipCode
  },
  card: {
    fullName: model?.card?.fullName,
    areaCode: model?.card?.areaCode,
    phone: model?.card?.phone,
    birthDate: model?.card?.birthDate,
    creditCardToken: model?.card?.creditCardToken,
    cpf: model?.card?.cpf
  },
  addressDeliveryIgualCharging: model.addressDeliveryIgualCharging,
  solicitation: {
    id: model.solicitation._id,
    cart: model.solicitation.cart.map((item, i) => ({
      product: model.products[i],
      quantity: item.quantity,
      unitPrice: item.unitPrice
    })),
    shipping: model.solicitation.shipping,
    client: model.solicitation.client,
    payment: model.solicitation.payment,
    deliveries: model.solicitation.deliveries,
    store: model.solicitation.store,
    canceled: model.solicitation.canceled
  },
  payload: model.payload,
  products: model.products.map((item) => ({
    id: item._id,
    title: item.title,
    availability: item.availability,
    description: item.description,
    photos: model.photos.map(
      (item) => `http://localhost:3011/static/image/${item}`
    ),
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
    freeShipping: item.freeShipping,
    category: item.category,
    rating: item.rating
  })),

  deliveries: {
    id: model.deliveries._id,
    status: model.deliveries.status,
    trackingCode: model.deliveries.trackingCode,
    type: model.deliveries.type,
    price: model.deliveries.price,
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
  user: {
    id: model.user._id,
    name: model.user.name,
    email: model.user.email
  }
})

const toDTOPay = (model) => ({
  date: `${new Date(model.date).toLocaleDateString('pt-BR')} - ${new Date(
    model.date
  ).toLocaleTimeString()}`,
  code: model.code,
  type: model.type,
  status: model.status,
  lastEventDate: `${new Date(model.lastEventDate).toLocaleDateString(
    'pt-BR'
  )} - ${new Date(model.date).toLocaleTimeString()}`,
  paymentMethod: {
    type: model?.paymentMethod?.type,
    code: model?.paymentMethod?.code
  },
  grossAmount: Number(model.grossAmount).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  discountAmount: Number(model.discountAmount).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  netAmount: Number(model.netAmount).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  extraAmount: Number(model.extraAmount).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  installmentCount: model.installmentCount,
  itemCount: model.itemCount,
  items: model.items?.item?.map((item) => ({
    id: item.id,
    description: item.description,
    quantity: item.quantity,
    amount: Number(item.amount).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  })),
  sender: {
    name: model.sender.name,
    email: model.sender.email,
    phone: {
      areaCode: model.sender.phone.areaCode,
      number: model.sender.phone.number
    },
    documents: {
      document: {
        type: model.sender.documents.document.type,
        value: model.sender.documents.document.value
      }
    }
  },
  shipping: {
    address: {
      street: model.shipping.address.street,
      number: model.shipping.address.number,
      complement: model.shipping.address.complement,
      district: model.shipping.address.district,
      city: model.shipping.address.city,
      state: model.shipping.address.state,
      country: model.shipping.address.country,
      postalCode: model.shipping.address.postalCode
    }
  },
  gatewaySystem: {
    type: model?.gatewaySystem?.type,
    rawCode: model?.gatewaySystem?.rawCode,
    rawMessage: model?.gatewaySystem?.rawMessage,
    normalizedCode: model?.gatewaySystem?.normalizedCode,
    normalizedMessage: model?.gatewaySystem?.normalizedMessage,
    authorizationCode: model?.gatewaySystem?.authorizationCode,
    nsu: model?.gatewaySystem?.nsu,
    tid: model?.gatewaySystem?.tid,
    establishmentCode: model?.gatewaySystem?.establishmentCode,
    acquirerName: model?.gatewaySystem?.acquirerName
  },
  paymentLink: model.paymentLink
})

const toDTOPayment = (model) => ({
  id: model._id,
  price: Number(model.price).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  type: model.type,
  installments: model.installments,
  status: model.status,
  address: {
    street: model.address.street,
    number: model.address.number,
    complement: model.address.complement,
    district: model.address.district,
    city: model.address.city,
    state: model.address.state,
    zipCode: model.address.zipCode
  },
  card: {
    fullName: model.card.fullName,
    areaCode: model.card.areaCode,
    phone: model.card.phone,
    birthDate: new Date(model.card.birthDate).toLocaleDateString('pt-BR'),
    creditCardToken: model.card.creditCardToken,
    cpf: model.card.cpf
  },
  addressDeliveryIgualCharging: model.addressDeliveryIgualCharging,
  payload: model.payload[0],
  pagSeguroCode: model.pagSeguroCode,
  solicitation: {
    id: model.solicitation._id,
    cart: model.solicitation.cart,
    shipping: model.solicitation.shipping,
    client: model.solicitation.client,
    payment: model.solicitation.payment,
    deliveries: model.solicitation.deliveries,
    store: model.solicitation.store,
    canceled: model.solicitation.canceled
  },
  orderregistrations: {
    id: model.orderregistrations._id,
    solicitation: model.orderregistrations.solicitation,
    type: model.orderregistrations.type,
    situation: model.orderregistrations.situation,
    date: new Date(model.orderregistrations.date).toLocaleDateString('pt-BR')
  }
})

module.exports = {
  toDTO,
  toDTOList,
  toDTOCart,
  toDTOPay,
  toDTOPayment
}
