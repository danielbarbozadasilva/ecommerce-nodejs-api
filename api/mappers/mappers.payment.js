const toDTO = (payment, registration) => ({
  payment: {
    id: payment._id,
    price: payment.price,
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
    id: registration._id,
    solicitation: registration.solicitation,
    type: registration.type,
    situation: registration.situation
  }
})

module.exports = {
  toDTO
}
