const moment = require('moment')

const cancelSolicitationClientEmail = (client, solicitation) => ` 
      <p>
         Prezado ${client.name},
         <br />
         O seu pedido de número: ${solicitation._id} foi cancelado com sucesso!
         <br />
         Data do cancelamento: ${moment(solicitation.createdAt).format(
           'DD/MM/YYYY'
         )} às ${moment(solicitation.createdAt).format('hh:mm:ss')}.
         </p>
         <br /><br />
       <hr />
       <p>Atenciosamente,</p>
       <p>Equipe - E-commerce</p>
   `

const cancelSolicitationAdminEmail = (client, solicitation) => ` 
      <p>
         Prezado administrador,
         <br />
         O pedido de número: ${solicitation._id} do cliente ${client._id} foi 
         cancelado com sucesso!
         <br />
         Data do cancelamento: ${moment(solicitation.createdAt).format(
           'DD/MM/YYYY'
         )} às ${moment(solicitation.createdAt).format('hh:mm:ss')}.
      </p>
      <br /><br />
    <hr />
    <p>Atenciosamente,</p>
    <p>E-commerce</p>
`

module.exports = {
  cancelSolicitationClientEmail,
  cancelSolicitationAdminEmail
}
