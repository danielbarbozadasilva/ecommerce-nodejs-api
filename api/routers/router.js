const { Router } = require('express')
const { name, version } = require('../../package.json')
const { formatError } = require('../utils/errors/errors.handler')

const routersV1User = require('./v1/routers.user')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    res.send({ name, version })
  })

  const routesV1 = Router()
  routersV1User(routesV1)

  app.use('/v1', routesV1)

  app.use((err, req, res, next) => {
    formatError(err, res)
  })
}
