const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

const solicitationSchema = Schema(
  {
    cart: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
          },
          title: { type: String },
          quantity: { type: Number, default: 1 },
          price: { type: Number, required: true }
        }
      ]
    },
    shipping: { type: Number, required: true },
    solicitationNumber: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'client', required: true },
    payment: {
      type: Schema.Types.ObjectId,
      ref: 'payment',
      required: true
    },
    deliveries: {
      type: Schema.Types.ObjectId,
      ref: 'deliveries',
      required: true
    },
    canceled: { type: Boolean, default: false }
  },
  { timestamps: true }
)

solicitationSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('solicitation', solicitationSchema)
