const toDTO = (model) => ({
  id: model._id,
  clientid: model?.client?._id,
  name: model.name,
  email: model.email,
  permissions: model.permissions
})

module.exports = {
  toDTO
}
