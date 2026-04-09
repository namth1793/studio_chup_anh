const express = require('express')
const router = express.Router()
const { getDb } = require('../db/init')

router.get('/', (req, res) => {
  const db = getDb()
  const { category } = req.query
  let rows
  if (category && category !== 'all') {
    rows = db.prepare('SELECT * FROM posts WHERE category = ? ORDER BY published_at DESC').all(category)
  } else {
    rows = db.prepare('SELECT * FROM posts ORDER BY published_at DESC').all()
  }
  res.json(rows)
})

router.get('/:slug', (req, res) => {
  const db = getDb()
  const post = db.prepare('SELECT * FROM posts WHERE slug = ?').get(req.params.slug)
  if (!post) return res.status(404).json({ error: 'Không tìm thấy bài viết.' })
  res.json(post)
})

module.exports = router
