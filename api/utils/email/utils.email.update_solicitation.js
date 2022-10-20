const moment = require('moment')

const sendSolicitationUpdateEmail = (solicitation, client, shipping) => ` 
    <p>
    Prezado ${client[0].name},
    <br />
    O seu pedido foi entregue a transportadora. Data de atualização: ${moment(solicitation.createdAt).format(
      'DD/MM/YYYY'
    )} às ${moment(solicitation.createdAt).format('hh:mm:ss')}.</p>
    <br />
    
    <h2>Dados do pedido: </h2>
    <hr />

    ${solicitation.cart.map(
      (item) => `
      <h3>
        Nome: ${item.product.title}
      </h3>
      <h3>
        Preço unitário: ${item.unitPrice.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })}
      </h3>
      <h3>
      Quantidade: ${item.quantity} unidades
    </h3>`
    )}
  <br />
  
    <h3>
      Frete:
      ${shipping.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })}
    </h3>
  <br />

    ${client.map(
      (item) => `  
      <h2>
        Dados para entrega:
        <hr />
      </h2>
      <h3>
        Localização: ${item.address.location}
      </h3>
      <h3>
      Número: ${item.address.number}
      </h3>
      <h3>
      Complemento: ${item.address.complement}
      </h3>
      <h3>
        Distrito: ${item.address.district}
      </h3>
      <h3>
        Cidade: ${item.address.city}
      </h3>
      <h3>
        Cep: ${item.address.zipCode}
      </h3>
      <h3>
      Estado: ${item.address.state}
    </h3>
    `
    )}
    <br /><br />
    <hr />
    <p>Atenciosamente,</p>
    <p>Equipe - E-commerce</p>
`

module.exports = {
  sendSolicitationUpdateEmail
}
