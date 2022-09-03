const { version, name } = require('../package.json')
const app = require('./app')

app.listen(process.env.PORT, (err) => {
  if (err) {
    throw err
  }
  console.log(
    `<<< ${name} v${version} was started in '${process.env.NODE_ENV}' environment on port ${process.env.PORT} >>>`
  )
})
