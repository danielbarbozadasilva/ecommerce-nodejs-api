const toDTO = (model) => ({
  id: model._id,
  client: model.client,
  cart: model.cart.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    unitPrice: item.unitPrice
  })),
  shipping: model.shipping,
  payment: model.payment,
  deliveries: model.deliveries.map((item) => ({
    id: item._id,
    status: item.status,
    trackingCode: item.trackingCode,
    type: item.type,
    price: item.price,
    deliveryTime: item.deliveryTime,
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
  canceled: model.canceled,
  orderregistrations: model.orderregistrations.map((item) => ({
    _id: item.id,
    solicitation: item.solicitation,
    type: item.type,
    situation: item.situation
  }))
})

module.exports = {
  toDTO
}
