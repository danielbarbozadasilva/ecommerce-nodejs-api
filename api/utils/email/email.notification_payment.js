const moment = require('moment')

const sendUpdateEmail = (dataCart, dataClient, status) => ` 
    <p>
    Prezado ${dataClient[0].client.name},
    <br />
    A sua transação foi ${status.toLowerCase()} com sucesso! <br />
    Data: ${moment(new Date()).format('DD/MM/YYYY')} às ${moment(
  new Date()).format('hh:mm:ss')}.</p>
    <br />
    
    <h2>Dados do pedido: </h2>
    <hr />

    ${dataCart.cart.map(
      (item) => `
      <h3>
        Nome: ${item.product.title}
      </h3>
      <h3>
        Preço unitário: ${item.product.price.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL'
        })}
        </h3>
        <h3>
        Quantidade: ${item.quantity} unidades
      </h3>`
    )}
   
    <br /><br />
    <hr />
    <p>Atenciosamente,</p>
    <p>Equipe - E-commerce</p>
`

module.exports = {
  sendUpdateEmail
}
