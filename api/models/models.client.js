const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

const clientSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    cpf: { type: String, required: true },
    phones: { type: [{ type: String }] },
    deleted: { type: Boolean, default: false },
    store: { type: Schema.Types.ObjectId, ref: 'store', required: true },
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
    }
  },
  { timestamps: true }
)

clientSchema.plugin(mongoosePaginate)

clientSchema.index({ name: 'text' })

module.exports = mongoose.model('client', clientSchema)
