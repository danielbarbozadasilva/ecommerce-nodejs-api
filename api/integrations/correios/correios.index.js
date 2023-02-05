const ErrorBusinessRule = require('../../exceptions/errors.business-rule')

const MIN_WIDTH = 11
const MAX_WIDTH = 105

const MIN_HEIGHT = 2
const MAX_HEIGHT = 105

const MIN_LENGTH = 16
const MAX_LENGTH = 105

const MIN_SUM_CLA = 29
const MAX_SUM_CLA = 200

const orderCart = (cart = null) => {
  const resultOrder = cart.map((item) => {
    const newHeight = Math.min(
      item.dimensions.height,
      item.dimensions.depth,
      item.dimensions.width
    )

    const newLength = Math.max(
      item.dimensions.height,
      item.dimensions.depth,
      item.dimensions.width
    )

    const temp = [
      item.dimensions.height,
      item.dimensions.depth,
      item.dimensions.width
    ].sort((a, b) => a < b)

    item.dimensions.width = temp[1]
    item.dimensions.depth = newLength
    item.dimensions.height = newHeight
    item.dimensions.areaCm = item.width * item.depth

    return item
  })
  return resultOrder.sort((a, b) => a.areaCm < b.areaCm)
}

const calcBox = (cart = null) => {
  const resultCart = orderCart(cart)
  const box = {
    height: 0,
    width: 0,
    length: 0,
    qtd_itens: 0,
    message: null,
    volume: 0,
    volumeItems: 0,
    emptyVolume: 0,
    remainingLength: 0,
    remainingWidth: 0,
    remainingHeight: 0
  }

  if (resultCart.length === 0) {
    throw new ErrorBusinessRule('O carrinho encontra-se vazio!')
  }

  resultCart.forEach((item) => {
    box.qtd_itens += 1
    box.volumeItems +=
      item.dimensions.height * item.dimensions.depth * item.dimensions.width

    if (
      box.remainingLength >= item.dimensions.depth &&
      box.remainingWidth >= item.dimensions.width
    ) {
      if (item.dimensions.height > box.remainingHeight) {
        box.height += item.dimensions.height - box.remainingHeight
      }

      if (item.dimensions.depth > box.length) {
        box.length = item.dimensions.depth
      }

      box.remainingLength = box.length - item.dimensions.depth
      box.remainingWidth -= item.dimensions.width
      box.remainingHeight =
        item.dimensions.height > box.remainingHeight
          ? item.dimensions.height
          : box.remainingHeight
    }
    box.height += item.dimensions.height

    if (item.dimensions.width > box.width) box.width = item.dimensions.width
    if (item.dimensions.depth > box.length) box.length = item.dimensions.depth

    box.remainingLength = box.length
    box.remainingWidth = box.width - item.dimensions.width
    box.remainingHeight = item.dimensions.height
  })

  box.volume = box.height * box.width * box.length
  box.emptyVolume = box.volume - box.volumeItems

  if (resultCart.length !== 0) {
    if (box.height > 0 && box.height < MIN_HEIGHT) box.height = MIN_HEIGHT
    if (box.width > 0 && box.width < MIN_WIDTH) box.width = MIN_WIDTH
    if (box.length > 0 && box.length < MIN_LENGTH) box.length = MIN_LENGTH
  }

  if (box.height > MAX_HEIGHT)
    box.message = 'Erro: height maior que o permitido.'
  if (box.width > MAX_WIDTH) box.message = 'Erro: width maior que o permitido.'
  if (box.length > MAX_LENGTH)
    box.message = 'Erro: length maior que o permitido.'

  if (box.length + box.height + box.width < MIN_SUM_CLA)
    box.message = 'Erro: Soma dos valores C+L+A menor que o permitido.'

  if (box.length + box.height + box.width > MAX_SUM_CLA)
    box.message = 'Erro: Soma dos valores C+L+A maior que o permitido.'

  return box
}

module.exports = { calcBox }
