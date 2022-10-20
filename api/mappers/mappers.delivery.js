const toDTO = (model) => ({
  id: model._id,
  name: model.name
 
})

module.exports = {
  toDTO
}
