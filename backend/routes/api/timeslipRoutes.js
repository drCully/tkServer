import express from 'express'
const router = express.Router()

import {
  getTimeslips,
  createTimeslip,
  updateTimeslip,
  getTimeslipById,
  updateTimeslipBilling,
  deleteTimeslip,
} from '../../controllers/timeslipController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect, getTimeslips)
  .post(protect, createTimeslip)
  .put(protect, updateTimeslip)
router
  .route('/:id')
  .get(protect, getTimeslipById)
  .delete(protect, deleteTimeslip)
  .put(protect, updateTimeslip)
router.route('/:id/invoice').put(protect, updateTimeslipBilling)
export default router
