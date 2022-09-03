const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

const deliverySchema = Schema(
  {
    status: { type: String, required: true },
    trackingCode: { type: String },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    address: {
      type: {
        location: { type: String, required: true },
        number: { type: String, required: true },
        complement: { type: String },
        district: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
      },
      required: true
    },
    solicitation: {
      type: Schema.Types.ObjectId,
      ref: 'solicitation',
      required: true
    },
    store: { type: Schema.Types.ObjectId, ref: 'store', required: true },
    payload: { type: Object }
  },
  { timestamps: true }
)

deliverySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('delivery', deliverySchema)
