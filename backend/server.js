import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/dbConn.js'

import clientRoutes from './routes/api/clientRoutes.js'
import invoiceRoutes from './routes/api/invoiceRoutes.js'
import taskRoutes from './routes/api/taskRoutes.js'
import timeslipRoutes from './routes/api/timeslipRoutes.js'
import userRoutes from './routes/api/userRoutes.js'

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/clients', clientRoutes)
app.use('/api/invoices', invoiceRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/timeslips', timeslipRoutes)
app.use('/api/users', userRoutes)

// Serve frontend
const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, './', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
