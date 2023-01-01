const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('../docs/swagger.json')
const router = require('./routers/router')
const db = require('../db/config')

const app = express()

mongoose.set('strictQuery', true)
mongoose.connect(db.uri, { useNewUrlParser: true }, (err) => {
  if (err)
    console.log(
      `MongoDB is ${mongoose.STATES[mongoose.connection.readyState]}\n${err}`
    )
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(cors())
app.use(express.json())
app.use('/static', express.static(`${__dirname}/..` + `/api/utils/file`))

router(app)

module.exports = app
