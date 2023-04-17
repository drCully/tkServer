import express from 'express'
const router = express.Router()

import {
  getTasks,
  createTask,
  updateTask,
  getTaskLookup,
  getTaskById,
  deleteTask,
} from '../../controllers/taskController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router.route('/').get(protect, getTasks).post(protect, createTask)
router.route('/lookup').get(protect, getTaskLookup)
router
  .route('/:id')
  .get(protect, getTaskById)
  .delete(protect, deleteTask)
  .put(protect, updateTask)

export default router
