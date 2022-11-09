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
    unitPrice: item.unitPrice.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  })),
  payment: model.payment.map((item) => ({
    id: item._id,
    price: item.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
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
    price: item.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
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
    price: item.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    promotion: item.promotion.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
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

const toDTOCart = (model) => {
  let subTotal = 0
  return {
    id: model._id,
    canceled: model.canceled,
    cart: model.cart.map((item, i) => {
      subTotal +=
        (model.products[i].promotion || model.products[i].price) * item.quantity
      return {
        product: model.products[i],
        quantity: item.quantity,
        unitPrice: item.unitPrice.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    }),
    subTotal: subTotal.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    shipping: model.shipping,
    payment: {
      id: model.payment._id,
      price: model.payment.price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      }),
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
      pagSeguroCode: model.payment.pagSeguroCode
    },
    deliveries: {
      id: model.deliveries._id,
      status: model.deliveries.status,
      trackingCode: model.deliveries.trackingCode,
      type: model.deliveries.type,
      price: model.deliveries.price.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      }),
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
      name: model.client.name,
      birthDate: model.client.birthDate,
      cpf: model.client.cpf,
      phones: model.client.phones,
      deleted: model.client.deleted,
      address: {
        street: model.payment.address.street,
        number: model.payment.address.number,
        complement: model.payment.address.complement,
        district: model.payment.address.district,
        city: model.payment.address.city,
        state: model.payment.address.state,
        zipCode: model.payment.address.zipCode
      },
    },
    user: {
      id: model.user._id,
      name: model.user.name,
      email: model.user.email,
      permissions: model.user.permissions
    }
  }
}

const toDTOList = (solicitation, deliveries) => ({
  deliveries: {
    price: deliveries.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
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
