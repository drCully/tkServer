import express from 'express'
const router = express.Router()

import {
  getBillings,
  createBilling,
  updateBilling,
  getBillingLookup,
  getBillingById,
  deleteBilling,
} from '../../controllers/billingsController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router
  .route('/')
  .get(getBillings)
  .post(protect, createBilling)
  .put(protect, updateBilling)
router.route('/lookup').get(getBillingLookup)
router
  .route('/:id')
  .get(getBillingById)
  .delete(protect, deleteBilling)
  .put(protect, updateBilling)

export default router
