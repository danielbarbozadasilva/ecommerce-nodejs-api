const moment = require('moment')

const sendSolicitationClientEmail = (store, solicitation, client, product) => ` 
    <h1 style="text-align:left;">Seu pedido foi recebido</h1>
    <br />
    <p>O seu pedido foi realizado hoje ${moment(solicitation.createdAt).format(
      'DD/MM/YYYY'
    )} às ${moment(solicitation.createdAt).format('hh:mm:ss')}.</p>
    <br />
    
    <h2>Dados do pedido: </h2>
    
    ${solicitation.map(
      (item, i) => `
    <h3>
      Nome: ${product[i].title}
    </h3>
      <h3>
        Preço unitário: ${item.unitPrice.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })}
      </h3>
      <h3>
        Quantidade: ${item.quantity} unidades
      </h3>
      <h3>
        Frete:
        ${item.shipping.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })}
      </h3>
    `
    )}
    <br />

    ${client.map(
      (item) => `  
      <h2>
        Dados para entrega:
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

    <p>Atenciosamente,</p>
    <p>Equipe - E-commerce</p>
`

const sendSolicitationAdminEmail = (solicitation, client, product) => ` 
<h1 style="text-align:left;">Pedido Recebido</h1>
<br />
<p>O cliente ${client[0].name} realizou um pedido no dia ${moment(
  solicitation.createdAt
).format('DD/MM/YYYY')} às ${moment(solicitation.createdAt).format(
  'hh:mm:ss'
)}.</p>
<br />

<h2>Dados do Cliente: </h2>
${client.map(
  (item) => `
  <h3>
    Nome: ${item.name}
  </h3>
  <h3>
    E-mail: ${item.user.email}
  </h3>
  <h3>
    Data de nascimento: ${moment(item.birthDate).format('DD/MM/YYYY')}
  </h3>
  <h3>
    Cpf: ${item.cpf}
  </h3>
  <h3>
    Telefones: ${item.phones}
  </h3>
  <br />

  <h2>
    Dados para entrega:
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
<br />

<h2>Dados do pedido: </h2>
${solicitation.map(
  (item, i) => `
  <h3>
    Nome: ${product[i].title}
  </h3>
  <h3>
    Preço unitário: ${item.unitPrice.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })}
  </h3>
  <h3>
    Quantidade: ${item.quantity} unidades
  </h3>
  <h3>
    Frete:
    ${item.shipping.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })}
  </h3>
`
)}
<br /><br />
<p>Atenciosamente,</p>
<p>Equipe - E-commerce</p>
`

const cancelSolicitationEmail = () => ` 
    <h1>Pedido cancelado</h1>
      <br />
      <p>
         Seu pedido foi cancelado com sucesso!
      </p>
      <br /><br /><hr />
`

module.exports = {
  sendSolicitationClientEmail,
  sendSolicitationAdminEmail,
  cancelSolicitationEmail
}
