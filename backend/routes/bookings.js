const express = require('express')
const router = express.Router()
const { getDb } = require('../db/init')

router.post('/', (req, res) => {
  const { name, phone, email, date, service_type, package: pkg, notes } = req.body
  if (!name || !phone || !email || !date || !service_type) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc.' })
  }
  try {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO bookings (name, phone, email, date, service_type, package, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(name, phone, email, date, service_type, pkg || null, notes || null)
    res.status(201).json({ success: true, id: result.lastInsertRowid })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Lỗi server.' })
  }
})

router.get('/', (req, res) => {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all()
  res.json(rows)
})

router.patch('/:id', (req, res) => {
  const { status } = req.body
  const db = getDb()
  db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, req.params.id)
  res.json({ success: true })
})

module.exports = router
