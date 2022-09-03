const mongoose = require('mongoose')

const { Schema } = mongoose

const variationSchema = Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    promotion: { type: Number },
    photos: { type: Array, default: [] },
    delivery: {
      type: {
        dimensions: {
          type: {
            height: { type: Number },
            width: { type: Number },
            depth: { type: Number }
          },
          required: true
        },
        weight: { type: Number, required: true },
        freeShipping: { type: Boolean, default: false }
      }
    },
    quantity: { type: Number, default: 0 },
    blockedQuantity: { type: Number, default: 0 },
    product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    store: { type: Schema.Types.ObjectId, ref: 'store', required: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('variation', variationSchema)
