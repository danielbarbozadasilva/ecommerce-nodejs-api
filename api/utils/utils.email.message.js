const Email = (link, recovery) => ` 
  <h1 style="text-align: center;">Recuperacao de Senha</h1>
        <br />
        <p>
            Aqui está o link para redefinir a sua senha. Acesse ele e digite sua nova senha:
        </p>
        <a href="${link}/user/password-recovery?token=${recovery.token}">
            ${link}/user/password-recovery?token=${recovery.token}
        </a>
        <br /><br /><hr />
        <p>
            Obs.: Se você não solicitou a redefinicao, apenas ignore esse email.
        </p>
        <br />
        <p>Atenciosamente</p>

    `

module.exports = { Email }
