import express from 'express'
const router = express.Router()

import {
  getInvoices,
  createInvoice,
  updateInvoice,
  getInvoiceById,
  deleteInvoice,
} from '../../controllers/invoiceController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router
  .route('/')
  .get(protect, getInvoices)
  .post(protect, createInvoice)
  .put(protect, updateInvoice)
router
  .route('/:id')
  .get(protect, getInvoiceById)
  .delete(protect, deleteInvoice)
  .put(protect, updateInvoice)

export default router
