const Email = (token) => ` 
  <h1>Recuperação de Senha</h1>
    <br />
    <p>
        Aqui está o código para redefinir a sua senha: <strong>${token}</strong>
    </p>
    <br /><br /><hr />

    `

module.exports = { Email }
