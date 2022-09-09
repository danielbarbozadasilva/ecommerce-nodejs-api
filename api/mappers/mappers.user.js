const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  email: model.email,
  store: model.store,
  permission: model.permission
})

const toUserDTO = (model) => ({
  id: model._id,
  name: model.name,
  email: model.email,
  store: model.store,
  permission: model.permission[0],
  type: model.permission[0] === 'administrator' ? 1 : 2
})

module.exports = {
  toUserDTO,
  toDTO
}
