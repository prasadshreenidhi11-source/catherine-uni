import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import weatherRoutes from './routes/weatherRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Catherine McAuley School API',
    timestamp: new Date().toISOString()
  })
})

// Routes
app.use('/api/weather', weatherRoutes)

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Catherine McAuley Weather Backend running at http://localhost:${PORT}`)
  console.log(`Campus weather configured for: ${process.env.SCHOOL_NAME || 'Catherine McAuley School'} (${process.env.CAMPUS_LOCATION || 'Craigmore, SA'})`)
  console.log(`Endpoint: http://localhost:${PORT}/api/weather`)
})

export default app
