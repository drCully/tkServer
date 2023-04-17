import mongoose from 'mongoose'
import sequence from 'mongoose-sequence'
const AutoIncrement = sequence(mongoose)

const invoiceSchema = mongoose.Schema(
  {
    number: Number,
    date: Date,
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    subTotal: Number,
    salesTax: Number,
    hours: Number,
    status: {
      type: String,
      default: 'posted',
    },
  },

  { timestamps: true }
)

invoiceSchema.plugin(AutoIncrement, {
  inc_field: 'number',
  id: 'invoiceNums',
  start_seq: 22030,
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

export default Invoice
