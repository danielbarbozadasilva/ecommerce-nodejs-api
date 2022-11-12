const compression = require('compression')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('../docs/swagger.json')
const router = require('./routers/router')
const db = require('../db/config')


const app = express()

mongoose.connect(db.uri, { useNewUrlParser: true }, (err) => {
  if (err)
    console.log(
      `MongoDB is ${mongoose.STATES[mongoose.connection.readyState]}\n${err}`
    )
})

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(cors())
app.use('/static', express.static(`${__dirname}/..` + `/api/utils/file`))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5 * 1024 * 1024 }))
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 }))
app.set('view engine', 'ejs')
app.set('views', path.join(`${__dirname}/..` + `/api/views/pagseguro`))

app.disable('x-powered-by')

router(app)

module.exports = app
