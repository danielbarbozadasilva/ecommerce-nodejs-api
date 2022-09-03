const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

const solicitationSchema = Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: 'client', required: true },
    cart: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
          },
          variation: {
            type: Schema.Types.ObjectId,
            ref: 'variation',
            required: true
          },
          staticProduct: { type: String },
          quantity: { type: Number, default: 1 },
          unitPrice: { type: Number, required: true }
        }
      ]
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'payment',
      required: true
    },
    delivery: { type: Schema.Types.ObjectId, ref: 'delivery', required: true },
    canceled: { type: Boolean, default: false },
    store: { type: Schema.Types.ObjectId, ref: 'store', required: true }
  },
  { timestamps: true }
)

solicitationSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('solicitation', solicitationSchema)
