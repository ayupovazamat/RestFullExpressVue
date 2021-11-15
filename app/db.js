"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
  constructor(file) {
    this.db = new sqlite3.Database(file);
    this.createTable()
  }

  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS user (
        id integer PRIMARY KEY, 
        username text, 
        email text UNIQUE, 
        password varchar(256),
        role integer)`
    return this.db.run(sql);
  }
}

module.exports = Db