const Correios = require('node-correios')

const correios = new Correios()
const config = require('./util.correios')
const { calcBox } = require('./helpers/calcBox')

const calculateShipping = async (zipCode, product, cart, shipping) => {
  const box = calcBox(product)

  const totalWeight = product.reduce(
    (all, item) =>
      all + item.weight * cart.reduce((all, item) => all + item.quantity, 0),
    0
  )

  const finalPrice = cart.reduce(
    (all, item) => all + shipping * item.quantity,
    0
  )

  try {
    const resultAll = await Promise.all(
      config.nCdServico.split(',').map(async (service) => {
        const result = await correios.calcPrecoPrazo({
          nCdServico: service,
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
      })
    )
    return resultAll
  } catch (error) {
    console.log(error)
  }
}

module.exports = { calculateShipping }
