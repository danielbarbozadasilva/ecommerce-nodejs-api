const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

const productSchema = Schema(
  {
    title: { type: String, required: true },
    availability: { type: Boolean, default: true },
    description: { type: String, required: true },
    photos: { type: Array, default: [] },
    price: { type: Number, required: true, default: 0 },
    promotion: { type: Number, default: 0 },
    sku: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    blockedQuantity: { type: Number, default: 0 },
    dimensions: {
      type: {
        height: { type: Number, default: 0 },
        width: { type: Number, default: 0 },
        depth: { type: Number, default: 0 }
      },
      required: true
    },
    weight: { type: Number, required: true },
    freeShipping: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    rating: { type: [{ type: Schema.Types.ObjectId, ref: 'rating' }] }
  },
  { timestamps: true }
)

productSchema.plugin(mongoosePaginate)

productSchema.index({ title: 'text', description: 'text', sku: 'text' })

module.exports = mongoose.model('product', productSchema)
