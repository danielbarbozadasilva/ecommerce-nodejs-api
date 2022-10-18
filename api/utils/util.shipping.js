const Correios = require('node-correios')

const correios = new Correios()
const config = require('./util.correios')
const { calcBox } = require('./helpers/calcBox')

const calculateShipping = async (zipCode, data, cart) => {
  const box = calcBox(data)

  const totalWeight = data.reduce(
    (all, item) =>
      all + item.weight * cart.reduce((all, item) => all + item.quantity, 0),
    0
  )

  const finalPrice = cart.reduce(
    (all, item) => all + item.shipping * item.quantity,
    0
  )

  const result = await correios.calcPrecoPrazo({
    nCdServico: config.nCdServico,
    sCepOrigem: config.sCepOrigem,
    sCepDestino: zipCode,
    nVlPeso: totalWeight,
    nCdFormato: 1,
    nVlComprimento: box.length,
    nVlAltura: box.height,
    nVlLargura: box.width,
    nVlDiamentro: 0,
    nVlValorDeclarado: finalPrice < 23.5 ? 23.5 : finalPrice
  })

  return result[0]
}

module.exports = { calculateShipping }
