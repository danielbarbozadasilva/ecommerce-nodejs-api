const mongoose = require('mongoose')

const { Schema } = mongoose

const orderRegistrationSchema = Schema(
  {
    solicitation: {
      type: Schema.Types.ObjectId,
      ref: 'solicitation',
      required: true
    },
    type: { type: String, required: true },
    situation: { type: String, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

module.exports = mongoose.model('orderRegistration', orderRegistrationSchema)
