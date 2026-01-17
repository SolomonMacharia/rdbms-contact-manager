const db = require('../rdbms-class');

function initTables() {
  db.createTable('contacts', ['name', 'phone']);
  db.createTable('messages', ['contact_id', 'content']);
}

module.exports = initTables;
