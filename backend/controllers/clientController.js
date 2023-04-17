import asyncHandler from 'express-async-handler'
import Client from '../models/ClientModel.js'

// @desc    Fetch clients using search criteria
// @route   GET /api/clients
// @access  Public
const getClients = asyncHandler(async (req, res) => {
  const { name, isActive } = req.query

  let condition = {}
  if (name) {
    condition['name'] = { $regex: new RegExp(name), $options: 'i' }
  }
  if (isActive) {
    condition['isActive'] = isActive
  }

  const clients = await Client.find(condition)

  res.json(clients)
})

// @desc    Fetch single client
// @route   GET /api/clients/:id
// @access  Public
const getClientById = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  if (client) {
    res.json(client)
  } else {
    res.status(404)
    throw new Error('Client not found')
  }
})

// @desc    Fetch client lookup
// @route   GET /api/clients/lookup
// @access  Public
const getClientLookup = asyncHandler(async (req, res) => {
  const clients = await Client.find(
    { isActive: true },
    { _id: 1, name: 1 }
  ).sort({
    name: 1,
  })
  res.json(clients)
})

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Private/Admin
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  if (client) {
    await client.remove()
    res.json({ message: 'Client removed' })
  } else {
    res.status(404)
    throw new Error('Client not found')
  }
})

// @desc    Create a client
// @route   POST /api/clients
// @access  Private/Admin
const createClient = asyncHandler(async (req, res) => {
  const client = new Client({
    name: req.body.name,
    addr1: req.body.addr1,
    addr2: req.body.addr2,
    addr3: req.body.addr3,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    isActive: req.body.isActive,
  })

  const createdClient = await client.save()
  res.status(201).json(createdClient)
})

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Private/Admin
const updateClient = asyncHandler(async (req, res) => {
  const { name, addr1, addr2, addr3, firstName, lastName, email, isActive } =
    req.body

  const client = await Client.findById(req.params.id)

  if (client) {
    client.name = name
    client.addr1 = addr1
    client.addr2 = addr2
    client.addr3 = addr3
    client.firstName = firstName
    client.lastName = lastName
    client.email = email
    client.isActive = isActive

    const updatedClient = await client.save()
    res.json(updatedClient)
  } else {
    res.status(404)
    throw new Error('Client not found')
  }
})

export {
  getClients,
  getClientById,
  getClientLookup,
  deleteClient,
  createClient,
  updateClient,
}
