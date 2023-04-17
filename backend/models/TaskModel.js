import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

export default Task
