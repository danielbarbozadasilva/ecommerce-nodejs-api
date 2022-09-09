const mongoose = require('mongoose')

const storeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    email: { type: String },
    phones: {
      type: [{ type: String }]
    },
    address: {
      location: { type: String, required: true },
      number: { type: String, required: true },
      complement: { type: String },
      district: { type: String, required: true },
      city: { type: String, required: true },
      zipCode: { type: String, required: true }
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('store', storeSchema)
