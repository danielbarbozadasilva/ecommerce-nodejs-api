const compression = require('compression')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routers/router')
const db = require('../db/config')

const app = express()

mongoose.connect(db.uri, { useNewUrlParser: true }, (err) => {
  if (err)
    console.log(
      `MongoDB is ${mongoose.STATES[mongoose.connection.readyState]}\n${err}`
    )
})

if (!process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(cors())
app.use('/static', express.static(`${__dirname}/..` + `/api/utils/file`))
app.use(compression())
app.use(express.json())

router(app)

module.exports = app
