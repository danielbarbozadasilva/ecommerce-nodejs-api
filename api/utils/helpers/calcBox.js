const MIN_LARGURA = 11
const MAX_LARGURA = 105

const MIN_ALTURA = 2
const MAX_ALTURA = 105

const MIN_COMPRIMENTO = 16
const MAX_COMPRIMENTO = 105

const MIN_SOMA_CLA = 29
const MAX_SOMA_CLA = 200

const orderCart = (cart = null) => {
  if (!Array.isArray(cart)) return cart

  const _cart = cart.map((item) => {
    const novaAltura = Math.min(
      item.alturaCm,
      item.profundidadeCm,
      item.larguraCm
    )
    const novoComprimento = Math.max(
      item.alturaCm,
      item.profundidadeCm,
      item.larguraCm
    )
    const _temp = [item.alturaCm, item.profundidadeCm, item.larguraCm].sort(
      (a, b) => a < b
    )
    item.larguraCm = _temp[1]
    item.profundidadeCm = novoComprimento
    item.alturaCm = novaAltura
    item.areaCm = item.larguraCm * item.profundidadeCm
    return item
  })
  return _cart.sort((a, b) => a.areaCm < b.areaCm)
}

const calcBox = (_carrinho = null) => {
  if (!Array.isArray(_carrinho)) return _carrinho

  const carrinho = orderCart(_carrinho)

  const box = {
    altura: 0,
    largura: 0,
    comprimento: 0,
    qtd_itens: 0,
    message: null,
    volume: 0,
    volume_itens: 0,
    volume_vazio: 0,
    comprimento_remanescente: 0,
    largura_remanescente: 0,
    altura_remanescente: 0
  }

  if (carrinho.length === 0) return 'Erro: Carrinho encontra-se vazio.'

  carrinho.forEach((item) => {
    box.qtd_itens += 1

    box.volume_itens += item.alturaCm * item.profundidadeCm * item.larguraCm

    if (
      box.comprimento_remanescente >= item.profundidadeCm &&
      box.largura_remanescente >= item.larguraCm
    ) {
      if (item.alturaCm > box.altura_remanescente) {
        box.altura += item.alturaCm - box.altura_remanescente
      }

      if (item.profundidadeCm > box.comprimento) {
        box.comprimento = item.profundidadeCm
      }

      box.comprimento_remanescente = box.comprimento - item.profundidadeCm

      box.largura_remanescente -= item.larguraCm

      box.altura_remanescente =
        item.alturaCm > box.altura_remanescente
          ? item.alturaCm
          : box.altura_remanescente

      return
    }

    box.altura += item.alturaCm

    if (item.larguraCm > box.largura) box.largura = item.larguraCm

    if (item.profundidadeCm > box.comprimento)
      box.comprimento = item.profundidadeCm

    box.comprimento_remanescente = box.comprimento
    box.largura_remanescente = box.largura - item.larguraCm
    box.altura_remanescente = item.alturaCm
  })

  box.volume = box.altura * box.largura * box.comprimento
  box.volume_vazio = box.volume - box.volume_itens

  if (!carrinho.length === 0) {
    if (box.altura > 0 && box.altura < MIN_ALTURA) box.altura = MIN_ALTURA
    if (box.largura > 0 && box.largura < MIN_LARGURA) box.largura = MIN_LARGURA
    if (box.comprimento > 0 && box.comprimento < MIN_COMPRIMENTO)
      box.comprimento = MIN_COMPRIMENTO
  }

  if (box.altura > MAX_ALTURA)
    box.message = 'Erro: Altura maior que o permitido.'
  if (box.largura > MAX_LARGURA)
    box.message = 'Erro: Largura maior que o permitido.'
  if (box.comprimento > MAX_COMPRIMENTO)
    box.message = 'Erro: Comprimento maior que o permitido.'

  if (box.comprimento + box.altura + box.largura < MIN_SOMA_CLA)
    box.message = 'Erro: Soma dos valores C+L+A menor que o permitido.'

  if (box.comprimento + box.altura + box.largura > MAX_SOMA_CLA)
    box.message = 'Erro: Soma dos valores C+L+A maior que o permitido.'

  return box
}

module.exports = { calcBox }
