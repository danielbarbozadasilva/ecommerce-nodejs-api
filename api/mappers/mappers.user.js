const { generateToken } = require('../utils/utils.cryptography')

const toDTO = (model) => ({
  _id: model._id,
  name: model.name,
  email: model.email,
  store: model.store,
  permission: model.permission
})

const toUserDTO = (model) => ({
  _id: model._id,
  name: model.nome,
  email: model.email,
  store: model.store,
  permission: model.permission,
  token: generateToken(model)
})

module.exports = {
  toUserDTO,
  toDTO
}
