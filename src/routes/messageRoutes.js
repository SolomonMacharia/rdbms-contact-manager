const express = require('express');
const db = require('../rdbms-class');

const router = express.Router();

// GET all messages (JOIN)
router.get('/', (req, res) => {
  const joined = db.join('messages', 'contacts', 'contact_id', 'id');
  res.json(joined);
});

// GET messages by contact
router.get('/contact/:id', (req, res) => {
  const msgs = db
    .getTable('messages')
    .select((r) => r.contact_id == req.params.id);
  res.json(msgs);
});

// CREATE message
router.post('/', (req, res) => {
  const { contact_id, content } = req.body;
  if (!contact_id || !content)
    return res.status(400).json({ error: 'contact_id and content required' });

  const msg = db.getTable('messages').insert({ contact_id, content });
  res.status(201).json(msg);
});

// UPDATE message
router.put('/:id', (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content required' });

  const updated = db.getTable('messages').update(
    (r) => r.id == req.params.id,
    (r) => (r.content = content)
  );

  updated === 0
    ? res.status(404).json({ error: 'Message not found' })
    : res.json({ updated });
});

// DELETE message
router.delete('/:id', (req, res) => {
  const deleted = db.getTable('messages').delete((r) => r.id == req.params.id);

  deleted === 0
    ? res.status(404).json({ error: 'Message not found' })
    : res.json({ deleted });
});

module.exports = router;
