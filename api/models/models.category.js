const mongoose = require('mongoose')

const { Schema } = mongoose

const categorySchema = Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    availability: { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('category', categorySchema)
