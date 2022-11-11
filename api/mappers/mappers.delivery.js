const toDTO = (model) => ({
  id: model?._id,
  client: model?.client,
  cart: model?.cart.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    unitPrice: item.unitPrice.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  })),
  shipping: model?.shipping,
  solicitationNumber: model.solicitationNumber,
  payment: model?.payment,
  deliveries: model?.deliveries.map((item) => ({
    id: item._id,
    status: item.status,
    trackingCode: item.trackingCode,
    type: item.type,
    price: item.price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    }),
    deliveryTime: item?.deliveryTime,
    address: {
      street: item.address.street,
      number: item.address.number,
      complement: item.address.complement,
      district: item.address.district,
      city: item.address.city,
      state: item.address.state,
      zipCode: item.address.zipCodes
    }
  })),
  canceled: model?.canceled,
  orderregistrations: model?.orderregistrations.map((item) => ({
    _id: item.id,
    solicitation: item.solicitation,
    type: item.type,
    situation: item.situation
  }))
})

const toDTOList = (model) => ({
  _id: model?.id,
  solicitation: model?.solicitation,
  type: model?.type,
  situation: model?.situation,
  payload: model?.payload,
  date: `${new Date(model.date).toLocaleDateString('pt-BR')} - ${new Date(
    model.date
  ).toLocaleTimeString()}`
})

const toDTOShipping = (model) => ({
  code: model.Codigo,
  price: model.Valor.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }),
  deadlineDelivery: model.PrazoEntrega,
  ownHandvalue: model.ValorMaoPropria,
  receiptNoticevalue: model.ValorAvisoRecebimento,
  declaredValue: model.ValorValorDeclarado,
  homeDelivery: model.EntregaDomiciliar === 'S',
  deliverySaturday: model.EntregaSabado === 'S',
  error: model.Erro !== '0',
  msgError: model.MsgErro,
  valueWithoutSurcharges: model.ValorSemAdicionais,
  comments: model.obsFim
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
    solicitationNumber: model.solicitationNumber,
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
      }
    },
    user: {
      id: model.user._id,
      name: model.user.name,
      email: model.user.email,
      permissions: model.user.permissions
    }
  }
}

module.exports = {
  toDTO,
  toDTOList,
  toDTOShipping,
  toDTOCart
}
