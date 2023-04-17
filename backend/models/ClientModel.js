import mongoose from 'mongoose'

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    addr1: {
      type: String,
      required: false,
    },
    addr2: {
      type: String,
      required: false,
    },
    addr3: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
)

const Client = mongoose.model('Client', clientSchema)

export default Client
