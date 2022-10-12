const sendSolicitationEmail = () => ` 
  <h1>Pedido enviado</h1>
    <br />
    <p>
    Seu pedido foi realizado com sucesso!
    </p>
    <br /><br /><hr />

    `
const cancelSolicitationEmail = () => ` 
    <h1>Pedido cancelado</h1>
      <br />
      <p>
         Seu pedido foi cancelado com sucesso!
      </p>
      <br /><br /><hr />
  
      `
module.exports = { sendSolicitationEmail, cancelSolicitationEmail }
