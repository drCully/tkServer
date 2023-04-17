import mongoose from 'mongoose'

const timeslipSchema = mongoose.Schema(
  {
    date: Date,
    timekeeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    description: String,
    hours: Number,
    rate: Number,
    billable: Boolean,
    billed: Boolean,
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
    },
  },
  { timestamps: true }
)

const Timeslip = mongoose.model('Timesheet', timeslipSchema)

export default Timeslip
