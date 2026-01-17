const express = require('express');
const { sendSMS } = require('../sms');

const router = express.Router();

const db = require('../rdbms-class');

//send sms
router.post('/:id/send-sms', (req, res) => {
  const content = req.body;

  if (!content)
    return res.status(400).json({ error: 'Message content required!' });

  const contact = db
    .getTable('contacts')
    .select((r) => r.id == req.params.id)[0];

  if (!contact) return res.status(404).json({ error: 'Contact not found!' });

  const success = sendSMS(contact.phone, content);

  if (success) {
    const msg = db
      .getTable('messages')
      .insert({ contact_id: contact.id, content });
    return res.json({ status: 'Sent', message: msg });
  }
  res.status(201).json();
});
