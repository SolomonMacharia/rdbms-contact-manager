const express = require('express');
const initTables = require('./setup/initTables');

const contactsRoutes = require('./routes/contactRoutes');
const messagesRoutes = require('./routes/messageRoutes');

const app = express();
app.use(express.json());

// init DB
initTables();

// routes
app.use('/contacts', contactsRoutes);
app.use('/messages', messagesRoutes);

// server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running → http://localhost:${PORT}`)
);
