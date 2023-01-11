const toDTO = (model) => ({
  id: model._id,
  name: model.name,
  text: model.text,
  score: model.score,
  product: model.product,
  client: model.client
})

const toDTOProduct = (model) => ({
  id: model._id,
  name: model.name,
  text: model.text,
  score: model.score,
  product: model.product._id,
  client: model.client,
  productName: model?.product?.title
})

module.exports = {
  toDTO,
  toDTOProduct
}
