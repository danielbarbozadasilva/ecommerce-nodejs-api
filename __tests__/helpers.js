const mongoose = require('mongoose')
const db = require('../db/config')

const createConnection = () => {
  mongoose.set('strictQuery', true)
  mongoose.connect(db.uri, { useNewUrlParser: true }, (err) => {
    if (err)
      console.log(
        `MongoDB is ${mongoose.STATES[mongoose.connection.readyState]}\n${err}`
      )
  })
}

const closeConnection = async () => {
  await mongoose.connection.close()
}

module.exports = {
  closeConnection,
  createConnection
}
