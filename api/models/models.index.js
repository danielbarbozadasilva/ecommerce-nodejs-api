const store = require('./models.store')
const user = require('./models.user')
const client = require('./models.client')
const category = require('./models.category')
const product = require('./models.product')
const rating = require('./models.rating')
const variation = require('./models.variation')
const solicitation = require('./models.solicitation')
const payment = require('./models.payment')
const delivery = require('./models.delivery')
const orderRegistration = require('./models.order-registration')

module.exports = {
  store,
  user,
  client,
  category,
  product,
  rating,
  variation,
  solicitation,
  payment,
  delivery,
  orderRegistration
}
