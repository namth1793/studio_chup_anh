require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { initDb } = require('./db/init')
const { seedDb } = require('./db/seed')

const app = express()
const PORT = process.env.PORT || 5014

app.use(cors())
app.use(express.json())

// Init & seed DB
initDb()
seedDb()

// Routes
app.use('/api/bookings', require('./routes/bookings'))
app.use('/api/contacts', require('./routes/contacts'))
app.use('/api/posts', require('./routes/posts'))

app.get('/', (req, res) => res.json({ name: 'Lumière Studio API', status: 'running' }))

app.listen(PORT, () => {
  console.log(`Lumière Studio backend running on http://localhost:${PORT}`)
})
