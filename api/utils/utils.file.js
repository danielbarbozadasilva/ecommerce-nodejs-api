const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) =>
    callback(null, `${__dirname}/../utils/file/image`),
  filename: (req, file, callback) =>
    callback(null, `${file.fieldname}-${Date.now()}.jpg`)
})

const upload = multer({ storage })

module.exports = upload
