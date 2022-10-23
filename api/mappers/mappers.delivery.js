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
      location: item.address.location,
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
  date: model?.date.toLocaleTimeString('pt-BR')
})

const toDTOShipping = (model) => ({
  code: model.Codigo,
  price: model.Valor,
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

module.exports = {
  toDTO,
  toDTOList,
  toDTOShipping
}
