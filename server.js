const compression = require('compression')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 3000

app.use('/public', express.static(`${__dirname}/public`))
app.use('/public/images', express.static(`${__dirname}/public/images`))

const dbs = require('./config/database.json')

const dbURI = isProduction ? dbs.dbProduction : dbs.dbTest

mongoose.connect(dbURI, { useNewUrlParser: true })

app.set('view engine', 'ejs')

if (!isProduction) app.use(morgan('dev'))
app.use(cors())
app.disable('x-powered-by')
app.use(compression())

app.use(bodyParser.urlencoded({ extends: true, limit: 1.5 * 1024 * 1024 }))
app.use(bodyParser.json({ limit: 1.5 * 1024 * 1024 }))

require('./models')

app.use('/', require('/routes'))

app.listen(PORT, (err) => {
  if (err) throw err
  console.log(`Rodando na //localhost:${PORT}`)
})
