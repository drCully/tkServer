import asyncHandler from 'express-async-handler'
import Task from '../models/TaskModel.js'

// @desc    Fetch tasks using search criteria
// @route   GET /api/tasks
// @access  Public
const getTasks = asyncHandler(async (req, res) => {
  const { name, isActive } = req.query

  let condition = {}
  if (name) {
    condition['name'] = { $regex: new RegExp(name), $options: 'i' }
  }
  if (isActive) {
    condition['isActive'] = isActive
  }

  const tasks = await Task.find(condition)
  if (tasks) {
    res.json(tasks)
  } else {
    res.status(404)
    throw new Error('Tasks not found')
  }
})

// @desc    Fetch single task
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    res.json(task)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

// @desc    Fetch task lookup
// @route   GET /api/tasks/lookup
// @access  Public
const getTaskLookup = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ isActive: true }, { _id: 1, name: 1 }).sort({
    name: 1,
  })
  res.json(tasks)
})

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (task) {
    await task.remove()
    res.json({ message: 'Task removed' })
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = asyncHandler(async (req, res) => {
  const task = new Task({
    name: req.body.name,
    isActive: req.body.isActive,
  })

  const createdTask = await task.save()
  res.status(201).json(createdTask)
})

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private/Admin
const updateTask = asyncHandler(async (req, res) => {
  const { name, isActive } = req.body

  const task = await Task.findById(req.params.id)

  if (task) {
    task.name = name
    task.isActive = isActive

    const updatedTask = await task.save()
    res.json(updatedTask)
  } else {
    res.status(404)
    throw new Error('Task not found')
  }
})

export {
  getTasks,
  getTaskById,
  getTaskLookup,
  deleteTask,
  createTask,
  updateTask,
}
