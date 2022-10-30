const pagSeguroConfig = require('./pagseguro.config')
const PagSeguro = require('./pagseguro.operations')

const _createPaymentWithBoleto = (senderHash, data) => {
    return new Promise((resolve, reject) => {
    
    const { client, cart, delivery, payment } = data
    const pag = new PagSeguro(pagSeguroConfig)

    pag.setSender({
      name: client.name,
      email: client.user.email,
      cpf_cnpj: client.cpf.replace(/[-\.]/g, ''),
      area_code: client.phones[0].slice(0, 2),
      phone: client.phones[0].slice(2).trim().split(' ').join(''),
      birth_date: client.birthDate.toLocaleDateString('pt-BR')
    })

    pag.setShipping({
      street: delivery.address.street,
      number: delivery.address.number,
      district: delivery.address.district,
      city: delivery.address.city,
      state: delivery.address.state,
      postal_code: delivery.address.zipCode.replace(/-/g, ''),
      same_for_billing: payment.addressDeliveryIgualCharging 
    })

    pag.setBilling({
      street: payment.address.street,
      number: payment.address.number,
      district: payment.address.district,
      city: payment.address.city,
      state: payment.address.state,
      postal_code: payment.address.zipCode.replace(/-/g, '')
    })

    cart.forEach((item) => {
      pag.addItem({
        qtde: item.quantity,
        value: item.unitPrice,
        description: `${item.product.title} - ${item.product.description}`
      })
    })

    pag.addItem({
      qtde: 1,
      value: delivery.price,
      description: `Custo de entrega - Correios`
    })

    pag.sendTransaction(
      {
        method: 'boleto',
        value: payment.price,
        installments: 1,
        hash: senderHash
      },
      (err, data) => (err ? reject(err) : resolve(data))
    )
  })
}

const _createPaymentWithCreditCard = (senderHash, data) => {
    return new Promise((resolve, reject) => {
    
    const { client, cart, delivery, payment } = data
    const pag = new PagSeguro(pagSeguroConfig)

    pag.setSender({
      name: client.name,
      email: client.user.email,
      cpf_cnpj: client.cpf.replace(/[-\.]/g, ''),
      area_code: client.phones[0].slice(0, 2),
      phone: client.phones[0].slice(2).trim().split(' ').join(''),
      birth_date: client.birthDate.toLocaleDateString('pt-BR')
    })

    pag.setShipping({
      street: delivery.address.street,
      number: delivery.address.number,
      district: delivery.address.district,
      city: delivery.address.city,
      state: delivery.address.state,
      postal_code: delivery.address.zipCode.replace(/-/g, ''),
      same_for_billing: payment.addressDeliveryIgualCharging
    })

    pag.setBilling({
      street: payment.address.street,
      number: payment.address.number,
      district: payment.address.district,
      city: payment.address.city,
      state: payment.address.state,
      postal_code: payment.address.zipCode.replace(/-/g, '')
    })

    cart.forEach((item) => {
      pag.addItem({
        qtde: item.quantity,
        value: item.unitPrice,
        description: `${item.product.title} - ${item.product.description}`
      })
    })
    pag.addItem({
      qtde: 1,
      value: delivery.price,
      description: `Custo de entrega - Correios`
    })

    pag.setCreditCardHolder({
      name: payment.card.fullName || client.name,
      area_code:
        payment.card.areaCode.trim() || client.phones[0].slice(0, 2),
      phone: (payment.card.phone.trim() || client.phones[0].slice(2))
        .split(' ')
        .join(''),
      birth_date: payment.card.birthDate.toLocaleDateString('pt-BR') || client.birthDate.toLocaleDateString('pt-BR'),
      cpf_cnpj: (payment.card.cpf || client.cpf).replace(/[-\.]/g, '')
    })

    pag.sendTransaction(
      {
        method: 'creditCard',
        value:
          payment.price % 2 !== 0 && payment.installments !== 1
            ? payment.price + 0.01
            : payment.price,
        installments: payment.installments,
        hash: senderHash,
        credit_card_token: payment.card.creditCardToken
      },
      (err, data) => (err ? reject(err) : resolve(data))
    )
  })
}

const createPayment = async (senderHash, data) => {
    try {
        if ( data.payment.type === "boleto" ){
            return await _createPaymentWithBoleto(senderHash, data)
        } else if ( data.payment.type === "creditCard" ) {
            return await _createPaymentWithCreditCard(senderHash, data)
        } else {
            return { 
                errorMessage: "Payment method not found." 
            }
        }

    } catch(error){
        console.log(error);
        return { 
            errorMessage: "Ocorreu um erro", 
            errors: error 
        }
    }
}

const getSessionId = () => new Promise((resolve, reject) => {
        const pag = new PagSeguro(pagSeguroConfig);
        pag.sessionId((err, session_id) => (err) ? reject(err) : resolve(session_id));
    })
}

const getTransactionStatus = (codigo) => new Promise((resolve, reject) => {
        const pag = new PagSeguro(pagSeguroConfig);
        pag.transactionStatus(codigo, (err, result) => (err) ? reject(err) : resolve(result));
    })

const getNotification = (codigo) => new Promise((resolve, reject) => {
        const pag = new PagSeguro(pagSeguroConfig);
        pag.getNotification(codigo, (err, result) => (err) ? reject(err) : resolve(result));
    })

module.exports = {
  createPayment,
  getSessionId,
  getTransactionStatus,
  getNotification
}
