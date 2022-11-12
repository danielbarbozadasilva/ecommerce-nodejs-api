const store = require('./models.store')
const user = require('./models.user')
const client = require('./models.client')
const category = require('./models.category')
const product = require('./models.product')
const rating = require('./models.rating')
const solicitation = require('./models.solicitation')
const payment = require('./models.payment')
const deliveries = require('./models.delivery')
const orderregistrations = require('./models.order-registration')

module.exports = {
  store,
  user,
  client,
  category,
  product,
  rating,
  solicitation,
  payment,
  deliveries,
  orderregistrations
}
