class Table {
  constructor(name, columns) {
    this.name = name;
    this.columns = columns;
    this.rows = [];
    this.autoIncrement = 1;
  }

  insert(row) {
    const newRow = { id: this.autoIncrement++, ...row };
    this.rows.push(newRow);
    return newRow;
  }

  select(whereFn = () => true) {
    return this.rows.filter(whereFn);
  }

  update(whereFn, updateFn) {
    let count = 0;
    this.rows.forEach((row) => {
      if (whereFn(row)) {
        updateFn(row);
        count++;
      }
    });
    return count;
  }

  delete(whereFn) {
    const originalLength = this.rows.length;
    this.rows = this.rows.filter((row) => !whereFn(row));
    return this.rows.length;
  }
}

class DB {
  constructor() {
    this.tables = {};
  }

  createTable(name, columns) {
    if (this.tables[name]) throw new Error('Table exists');
    this.tables[name] = new Table(name, columns);
  }

  getTable(name) {
    const table = this.tables[name];
    if (!table) throw new Error(`Table ${name} not found`);
    return table;
  }

  join(table1Name, table2Name, key1, key2) {
    const t1 = this.getTable(table1);
    const t2 = this.getTable(table2);
    const result = [];

    t1.rows.forEach((r1) => {
      t2.rows.forEach((r2) => {
        if (r1[key1] === r2[key2]) {
          result.push({ ...r1, ...r1 });
        }
      });
    });
    return result;
  }
}

module.exports = new DB();
