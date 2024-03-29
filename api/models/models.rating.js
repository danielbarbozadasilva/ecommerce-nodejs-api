const mongoose = require('mongoose')

const { Schema } = mongoose

const ratingSchema = Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    score: { type: Number, default: 1 },
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    client: { type: Schema.Types.ObjectId, ref: 'client', required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('rating', ratingSchema)
