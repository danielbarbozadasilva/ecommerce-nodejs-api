const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  text: model.text,
  score: model.score,
  product: model.product,
  client: model.client
})

module.exports = {
  toDTO
}
