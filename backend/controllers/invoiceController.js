import asyncHandler from 'express-async-handler'
import Invoice from '../models/InvoiceModel.js'

// @desc    Fetch invoices using search criteria
// @route   GET /api/invoices
// @access  Public
const getInvoices = asyncHandler(async (req, res) => {
  const { number, client } = req.query

  let condition = {}
  if (number) {
    condition['number'] = { $regex: new RegExp(number), $options: 'i' }
  }
  if (client) {
    condition['client'] = { $regex: new RegExp(client), $options: 'i' }
  }

  const invoices = await Invoice.find(condition).populate('client', 'name')

  res.json(invoices)
})

// @desc    Fetch single invoice
// @route   GET /api/invoices/:id
// @access  Public
const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate([
    {
      path: 'client',
      select: ['name', 'addr1', 'addr2', 'addr3'],
    },
  ])

  if (invoice) {
    res.json(invoice)
  } else {
    res.status(404)
    throw new Error('Invoice not found')
  }
})

// @desc    Delete an invoice
// @route   DELETE /api/invoices/:id
// @access  Private/Admin
const deleteInvoice = asyncHandler(async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)

  if (invoice) {
    await invoice.remove()
    res.json({ message: 'Invoice removed' })
  } else {
    res.status(404)
    throw new Error('Invoice not found')
  }
})

// @desc    Create an invoice
// @route   POST /api/invoices
// @access  Private/Admin
const createInvoice = asyncHandler(async (req, res) => {
  const invoice = new Invoice({
    date: req.body.date,
    client: req.body.client,
    subTotal: req.body.subTotal,
    salesTax: req.body.salesTax,
    hours: req.body.hours,
  })

  const createdInvoice = await invoice.save()
  res.status(201).json(createdInvoice)
})

// @desc    Update an invoice
// @route   PUT /api/invoices/:id
// @access  Private/Admin
const updateInvoice = asyncHandler(async (req, res) => {
  const { number, date, client, subTotal, salesTax, hours, status } = req.body

  const invoice = await Invoice.findById(req.params.id)

  if (invoice) {
    invoice.number = number
    invoice.date = date
    invoice.client = client
    invoice.subTotal = subTotal
    invoice.salesTax = salesTax
    invoice.hours = hours
    invoice.status = status
    const updatedInvoice = await invoice.save()
    res.json(updatedInvoice)
  } else {
    res.status(404)
    throw new Error('Invoice not found')
  }
})

export {
  getInvoices,
  getInvoiceById,
  deleteInvoice,
  createInvoice,
  updateInvoice,
}
