const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

const paymentSchema = Schema(
  {
    price: { type: Number, required: true },
    type: { type: String, required: true },
    installments: { type: Number, default: 1 },
    status: { type: String, required: true },
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
    card: {
      type: {
        fullName: { type: String, required: true },
        areaCode: { type: String, required: true },
        phone: { type: String, required: true },
        birthDate: { type: String, required: true },
        creditCardToken: { type: String, required: true },
        cpf: { type: String, required: true }
      }
    },
    addressDeliveryIgualCharging: { type: Boolean, default: true },
    solicitation: {
      type: Schema.Types.ObjectId,
      ref: 'solicitation',
      required: true
    },
    store: { type: Schema.Types.ObjectId, ref: 'store', required: true },
    payload: { type: Array },
    pagSeguroCode: { type: String }
  },
  { timestamps: true }
)

paymentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('payment', paymentSchema)
