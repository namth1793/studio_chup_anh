const express = require('express')
const router = express.Router()
const { getDb } = require('../db/init')

router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin.' })
  }
  try {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO contacts (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `)
    const result = stmt.run(name, email, phone || null, subject || null, message)
    res.status(201).json({ success: true, id: result.lastInsertRowid })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Lỗi server.' })
  }
})

router.get('/', (req, res) => {
  const db = getDb()
  const rows = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all()
  res.json(rows)
})

module.exports = router
