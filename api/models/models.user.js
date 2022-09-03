const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowerCase: true,
      unique: true,
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'store',
      required: true
    },
    permission: {
      type: Array,
      default: ['client']
    },
    hash: String,
    salt: String,
    recovery: {
      type: {
        token: String,
        date: Date
      },
      default: {}
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('user', userSchema)