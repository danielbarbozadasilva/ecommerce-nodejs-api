const compression = require('compression')
const express = require('express')
require('express-async-errors')
const ejs = require('ejs')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routers/router')
const db = require('./db/config')

const app = express()

mongoose.connect(db.uri, { useNewUrlParser: true })

app.set('view engine', 'ejs')

if (!db.nodeEnvironment === 'development') app.use(morgan('dev'))
app.use(cors())
app.disable('x-powered-by')
app.use('/static', express.static(`${__dirname}/..` + `/api/utils/file`))
app.use(compression())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

router(app)

module.exports = app
