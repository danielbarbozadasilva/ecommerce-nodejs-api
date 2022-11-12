const formatDateBr = (data) => new Date(data).toLocaleDateString('pt-BR')

const formatDateTimeBr = (data) =>
  `${new Date(data).toLocaleDateString('pt-BR')} - ${new Date(
    data
  ).toLocaleTimeString()}`

const formatPriceBr = (data) =>
  Number(data).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })

const formatAddressImage = (data) =>
  `http://localhost:3011/static/image/${data}`

module.exports = {
  formatDateBr,
  formatDateTimeBr,
  formatPriceBr,
  formatAddressImage
}
