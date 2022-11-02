const pagSeguroConfig = require('./pagseguro.config')
const PagSeguro = require('./pagseguro.operations')

const _createPaymentWithBoleto = (senderHash, data) =>
  new Promise((resolve, reject) => {
    const pag = new PagSeguro(pagSeguroConfig)

    pag.setSender({
      name: data.client.name,
      email: data.user.email,
      cpf_cnpj: data.client.cpf.replace(/[-\.]/g, ''),
      area_code: data.client.phones[0].slice(1, 3),
      phone:
        data.card.phone.trim().slice(4).replace(/[-\.]/g, '') ||
        data.client.phones[0].trim().slice(4).replace(/[-\.]/g, ''),
      birth_date: new Date(data.client.birthDate).toLocaleDateString('pt-BR')
    })

    pag.setShipping({
      street: data.deliveries.address.street,
      number: data.deliveries.address.number,
      district: data.deliveries.address.district,
      city: data.deliveries.address.city,
      state: data.deliveries.address.state,
      postal_code: data.deliveries.address.zipCode.replace(/-/g, ''),
      same_for_billing: data.addressDeliveryIgualCharging
    })

    pag.setBilling({
      street: data.address.street,
      number: data.address.number,
      district: data.address.district,
      city: data.address.city,
      state: data.address.state,
      postal_code: data.address.zipCode.replace(/-/g, '')
    })

    data.solicitation.cart.map((item) => {
      pag.addItem({
        qtde: item.quantity,
        value: item.unitPrice,
        description: item.product.description
      })
    })

    pag.addItem({
      qtde: 1,
      value: data.deliveries.price,
      description: `Custo de entrega - Correios`
    })

    pag.sendTransaction(
      {
        method: 'boleto',
        value: data.price,
        installments: 1,
        hash: senderHash
      },
      (err, data) => (err ? reject(err) : resolve(data))
    )
  })

const _createPaymentWithCreditCard = (senderHash, data) =>
  new Promise((resolve, reject) => {
    const pag = new PagSeguro(pagSeguroConfig)
    pag.setSender({
      name: data.client.name,
      email: data.user.email,
      cpf_cnpj: data.client.cpf.replace(/[-\.]/g, ''),
      area_code: data.client.phones[0].slice(1, 3),
      phone:
        data.card.phone.trim().slice(4).replace(/[-\.]/g, '') ||
        data.client.phones[0].trim().slice(4).replace(/[-\.]/g, ''),
      birth_date: new Date(data.client.birthDate).toLocaleDateString('pt-BR')
    })

    pag.setShipping({
      street: data.deliveries.address.street,
      number: data.deliveries.address.number,
      district: data.deliveries.address.district,
      city: data.deliveries.address.city,
      state: data.deliveries.address.state,
      postal_code: data.deliveries.address.zipCode.replace(/-/g, ''),
      same_for_billing: data.addressDeliveryIgualCharging
    })

    pag.setBilling({
      street: data.address.street,
      number: data.address.number,
      district: data.address.district,
      city: data.address.city,
      state: data.address.state,
      postal_code: data.address.zipCode.replace(/-/g, '')
    })

    data.solicitation.cart.map((item) => {
      pag.addItem({
        qtde: item.quantity,
        value: item.unitPrice,
        description: item.product.description
      })
    })

    pag.addItem({
      qtde: 1,
      value: data.deliveries.price,
      description: `Custo de entrega - Correios`
    })

    pag.setCreditCardHolder({
      name: data.card.fullName || data.client.name,
      area_code:
        data.card.areaCode.trim().slice(1, 3) ||
        data.client.phones[0].trim().slice(1, 3),
      phone:
        data.card.phone.trim().slice(4).replace(/[-\.]/g, '') ||
        data.client.phones[0].trim().slice(4).replace(/[-\.]/g, ''),
      birth_date:
        new Date(data.card.birthDate).toLocaleDateString('pt-BR') ||
        new Date(data.client.birthDate).toLocaleDateString('pt-BR'),
      cpf_cnpj: (data.card.cpf || data.client.cpf).replace(/[-\.]/g, '')
    })

    pag.sendTransaction(
      {
        method: 'creditCard',
        value: data.price,
        installments: data.installments,
        hash: senderHash,
        credit_card_token: data.card.creditCardToken
      },
      (err, data) => (err ? reject(err) : resolve(data))
    )
  })

const createPayment = async (senderHash, data) => {
  try {
    if (data.type === 'BOLETO') {
      return await _createPaymentWithBoleto(senderHash, data)
    }
    if (data.type === 'CREDITCARD') {
      return await _createPaymentWithCreditCard(senderHash, data)
    }
    return {
      errorMessage: 'Payment method not found.'
    }
  } catch (error) {
    return {
      errorMessage: 'Ocorreu um erro',
      errors: error
    }
  }
}

const getSessionId = () =>
  new Promise((resolve, reject) => {
    const pag = new PagSeguro(pagSeguroConfig)
    pag.sessionId((err, session_id) =>
      err ? reject(err) : resolve(session_id)
    )
  })

const getTransactionStatus = (codigo) =>
  new Promise((resolve, reject) => {
    const pag = new PagSeguro(pagSeguroConfig)
    pag.transactionStatus(codigo, (err, result) =>
      err ? reject(err) : resolve(result)
    )
  })

const getNotification = (codigo) =>
  new Promise((resolve, reject) => {
    const pag = new PagSeguro(pagSeguroConfig)
    pag.getNotification(codigo, (err, result) =>
      err ? reject(err) : resolve(result)
    )
  })

module.exports = {
  createPayment,
  getSessionId,
  getTransactionStatus,
  getNotification
}
