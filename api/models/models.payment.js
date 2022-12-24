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
      street: { type: String },
      number: { type: String },
      complement: { type: String },
      district: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String }
    },
    card: {
      fullName: { type: String },
      areaCode: { type: String },
      phone: { type: String },
      birthDate: { type: String },
      creditCardToken: { type: String },
      cpf: { type: String }
    },
    addressDeliveryIgualCharging: { type: Boolean, default: true },
    pagSeguroCode: { type: String },
    payload: { type: Array }
  },
  { timestamps: true }
)

paymentSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('payment', paymentSchema)
