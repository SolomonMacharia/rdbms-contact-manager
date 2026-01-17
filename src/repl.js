const readline = require('readline');
const db = require('./rdbms-class');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'db> ',
});

console.log('Simple JS RDBMS REPL (type EXIT to quit)');
console.log('Commands:');
console.log('  SELECT contacts');
console.log('  INSERT contacts name=John phone=0712345678');
console.log('  DELETE contacts id=1');
console.log('  JOIN messages contacts contact_id id');
console.log('  .exit');

rl.prompt();

rl.on('line', (line) => {
  const parts = line.trim().split(' ');
  const cmd = parts[0]?.toUpperCase();

  try {
    if (cmd === 'EXIT') process.exit(0);

    if (cmd === 'CREATE') {
      db.createTable(parts[1], parts.slice(2));
      console.log('Table created');
    }

    if (cmd === 'INSERT') {
      const table = db.getTable(parts[1]);
      const row = {};
      table.columns.forEach((c, i) => (row[c] = parts[i + 2]));
      console.log(table.insert(row));
    }

    if (cmd === 'SELECT') {
      console.table(db.getTable(parts[1]).select());
    }

    if (cmd === 'JOIN') {
      console.table(db.join(parts[1], parts[2], parts[3], parts[4]));
    }
  } catch (e) {
    console.error(e.message);
  }

  rl.prompt();
});
