const express = require('express');
const db = require('../rdbms-class');

const router = express.Router();
//Contacts CRUD
//get all contacts
router.get('/', (req, res) => res.json(db.getTable('contacts')));

//get sigle contact
router.get('/:id', (req, res) => {
  const row = db.getTable('contacts').select((r) => r.id == req.params.id)[0];
  row ? res.json(row) : res.status(400).json({ error: 'Not found!' });
});

//create contact
router.post('/', (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone)
    return res.status(400).json({ error: 'Name and phone required' });

  const row = db.getTable('contacts').insert({ name, phone });
  res.status(201).json(row);
});

//update contact
router.patch('/:id', (req, res) => {
  const updated = db.getTable('contacts').update(
    (r) => r.id == req.params.id,
    (r) => Object.assign(r, req.body)
  );
  updated === 0
    ? res.status(404).json({ error: 'Contact not found' })
    : res.json({ updated });
});

//delete contact
router.delete('/:id', (req, res) => {
  const deleted = db.getTable('contacts').delete((r) => r.id == req.params.id);
  deleted === 0
    ? res.status(404).json({ error: 'Contact not found!' })
    : res.json({ deleted });
});

module.exports = router;
