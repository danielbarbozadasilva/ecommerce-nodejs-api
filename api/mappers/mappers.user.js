const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  email: model.email,
  store: model.store,
  permissions: model.permissions
})

module.exports = {
  toDTO
}
