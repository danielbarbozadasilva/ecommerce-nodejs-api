const Correios = require('node-correios')
const correios = new Correios()
const config = require('./util.correios')
const { calcBox } = require('./helpers/calcBox')

const calculateShipping = async (zipCode, products) => {
  const _produtos = products.map((item) => ({
    pesoKg: item.product.weight,
    profundidadeCm: item.product.dimensions.depth,
    alturaCm: item.product.dimensions.height,
    larguraCm: item.product.dimensions.width,
    quantidade: item.quantity,
    preco: item.product.price
  }))

  const box = calcBox(_produtos)

  const pesoTotal = _produtos.reduce(
    (all, item) => all + item.pesoKg * item.quantidade,
    0
  )

  const valorFinal = _produtos.reduce(
    (all, item) => all + item.preco * item.quantidade,
    0
  )

  const result = await correios.calcPrecoPrazo({
    nCdServico: config.nCdServico,
    sCepOrigem: config.sCepOrigem,
    sCepDestino: zipCode,
    nVlPeso: pesoTotal,
    nCdFormato: 1,
    nVlComprimento: box.comprimento,
    nVlAltura: box.altura,
    nVlLargura: box.largura,
    nVlDiamentro: 0,
    nVlValorDeclarado: valorFinal < 19.5 ? 19.5 : valorFinal
  })

  return result[0]
}

module.exports = { calculateShipping }
