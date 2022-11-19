const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowerCase: true,
      unique: true
    },
    permissions: {
      type: Array,
      default: ['client']
    },
    hash: String,
    salt: String,
    recovery: {
      token: String,
      date: Date
    },
    refreshToken: {
      type: {
        expiresIn: { type: String, required: true }
      }
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('user', userSchema)
