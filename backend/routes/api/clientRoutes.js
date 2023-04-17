import express from 'express'
const router = express.Router()

import {
  getClients,
  createClient,
  updateClient,
  getClientLookup,
  getClientById,
  deleteClient,
} from '../../controllers/clientController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router.route('/').get(protect, getClients).post(protect, createClient)
router.route('/lookup').get(protect, getClientLookup)
router
  .route('/:id')
  .get(protect, getClientById)
  .delete(protect, deleteClient)
  .put(protect, updateClient)

export default router
