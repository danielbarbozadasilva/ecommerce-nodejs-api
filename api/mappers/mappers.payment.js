const toDTO = (model) => ({
  payment: {
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
    addressDeliveryIgualCharging: model.addressDeliveryIgualCharging,
    store: model.store,
    pagSeguroCode: model.pagSeguroCode
  },
  registration: {
    _id: model._id,
    solicitation: model.solicitation,
    type: model.type,
    situation: model.situation
  }
})

module.exports = {
  toDTO
}
