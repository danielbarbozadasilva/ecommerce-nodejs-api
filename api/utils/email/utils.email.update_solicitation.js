const moment = require('moment')

const sendSolicitationUpdateEmail = (data) => ` 
    <p>
    Prezado ${data[0].client.name},
    <br />
    O seu pedido foi entregue a transportadora. Data de atualização: ${moment(
      new Date()
    ).format('DD/MM/YYYY')} às ${moment(new Date()).format('hh:mm:ss')}.</p>
    <br />
    
    <h2>Dados do pedido: </h2>
    <hr />

    ${data.map(
      (item) => `
      <h3>
        Nome: ${item.products.title}
      </h3>
      <h3>
        Preço unitário: ${item.products.price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })}
        </h3>
        <h3>
        Quantidade: ${item.cart[0].quantity} unidades
      </h3>`
    )}
   
    <br /><br />
    <hr />
    <p>Atenciosamente,</p>
    <p>Equipe - E-commerce</p>
`

module.exports = {
  sendSolicitationUpdateEmail
}
