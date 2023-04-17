import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/UserModel.js'

// @desc    Auth user & get token
// @route   Post /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      rate: user.rate,
      isAdmin: user.isAdmin,
      accessToken: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   Post /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    initials,
    rate,
    isActive,
    isAdmin,
  } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    initials,
    rate,
    isActive,
    isAdmin,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get users using search criteria
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const { lastName, isActive } = req.query

  let condition = {}
  if (lastName) {
    condition['lastName'] = { $regex: new RegExp(lastName), $options: 'i' }
  }
  if (isActive) {
    condition['isActive'] = isActive
  }

  const users = await User.find(condition)

  if (users) {
    res.json(users)
  } else {
    res.status(204)
    throw new Error('No users found')
  }
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(204)
    throw new Error('User not found')
  }
})

// @desc    Fetch user lookup
// @route   GET /api/users/lookup
// @access  Public
const getUserLookup = asyncHandler(async (req, res) => {
  const users = await User.find(
    { isActive: true },
    { _id: 1, firstName: 1, lastName: 1 }
  ).sort({
    firstName: 1,
  })
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed successfully' })
  } else {
    res.status(204)
    throw new Error('User not found')
  }
})

// @desc    Create a new user
// @route   POST /users
// @access  Private/Admin
const createUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, initials, rate, isActive } =
    req.body

  if (!email || !password)
    return res.status(400).json({ message: 'email and password are required.' })

  // check for duplicate emails in the db
  const duplicate = await User.findOne({ email: email }).exec()

  if (duplicate) {
    res.status(409) //Conflict
    throw new Error('User already exists')
  }

  //create and store the new user
  const result = await User.create({
    email,
    password,
    firstName,
    lastName,
    initials,
    rate,
    isActive,
  })

  if (result) {
    res.status(201).json({
      _id: result._id,
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      isAdmin: result.isAdmin,
    })
  } else {
    res.status(500)
    throw new Error('Invalid user data')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.initials = req.body.initials || user.initials
    user.rate = req.body.rate || user.rate
    user.isActive = req.body.isActive || user.isActive
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      initials: updateUser.initials,
      rate: updateUser.rate,
      roles: updatedUser.roles,
      isActive: updateUser.isActive,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      initials: user.initials,
      rate: user.rate,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.email = req.body.email || user.email
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.initials = req.body.initials || user.initials
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      initials: updateUser.initials,
      rate: updateUser.rate,
      isActive: updateUser.isActive,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
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
}
