const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

const deliveriesSchema = Schema(
  {
    status: { type: String, required: true },
    trackingCode: { type: String },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    address: {
      type: {
        street: { type: String, required: true },
        number: { type: String, required: true },
        complement: { type: String },
        district: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
      },
      required: true
    }
  },
  { timestamps: true }
)

deliveriesSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('deliveries', deliveriesSchema)
