import { Router } from 'express'
const router = Router()
import {
  authUser,
  registerUser,
  getUsers,
  getUserById,
  getUserLookup,
  deleteUser,
  createUser,
  updateUser,
  getUserProfile,
  updateUserProfile,
} from '../../controllers/userController.js'

import { protect, admin } from '../../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/lookup').get(protect, getUserLookup)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
