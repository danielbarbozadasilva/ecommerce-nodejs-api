const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

const productSchema = Schema(
  {
    title: { type: String, required: true },
    availability: { type: Boolean, default: true },
    description: { type: String, required: true },
    photos: { type: Array, default: [] },
    price: { type: Number, required: true },
    promotion: { type: Number },
    sku: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    store: { type: Schema.Types.ObjectId, ref: 'store' },
    rating: { type: [{ type: Schema.Types.ObjectId, ref: 'rating' }] },
    variations: { type: [{ type: Schema.Types.ObjectId, ref: 'variations' }] }
  },
  { timestamps: true }
)

productSchema.plugin(mongoosePaginate)

productSchema.index({ title: 'text', description: 'text', sku: 'text' })

module.exports = mongoose.model('product', productSchema)
