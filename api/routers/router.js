const { Router } = require('express')
const { name, version } = require('../../package.json')
const { formatError } = require('../utils/errors/errors.handler')

const routersV1User = require('./v1/routers.user')
const routersV1Client = require('./v1/routers.client')
const routersV1Category = require('./v1/routers.category')
const routersV1Product = require('./v1/routers.product')
const routersV1Rating = require('./v1/routers.rating')
const routersV1Solicitation = require('./v1/routers.solicitation')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send({ name, version })
  })

  const routesV1 = Router()
  routersV1User(routesV1)
  routersV1Client(routesV1)
  routersV1Category(routesV1)
  routersV1Product(routesV1)
  routersV1Rating(routesV1)
  routersV1Solicitation(routesV1)

  app.use('/v1', routesV1)

  app.use((err, req, res, next) => {
    formatError(err, res)
  })
}
