const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('sqlitedb');

const createTable = () => {
  const sql = `
      CREATE TABLE IF NOT EXISTS user (
        id integer PRIMARY KEY, 
        username text, 
        email text UNIQUE, 
        password text,
        role integer)`
  return this.db.run(sql);
}

const selectByUserName = (username, callback) => {
  return db.get(
       `SELECT * FROM user WHERE username = ?`,
     [username], function (err, row) {
       callback(err, row)
     })
}
const selectByEmail = async (email, callback) => {
  return await db.get(
       `SELECT * FROM user WHERE email = ?`,
     [email], function (err, row) {
       callback(err, row)
     })
}

const createUser = async ([email, password, role], callback) => {
  return await db.run(
     'INSERT INTO user (email,password,role) VALUES (?,?,?)',
     [email, password, role], (err) => {
       callback(err)
     })
}
// Выборка всех пользователей
const getUsers = async ({id, count, orderBy}, callback) => {
  return await db.run(
     `SELECT * FROM user`
  )
}

module.exports = {
  selectByUserName,
  selectByEmail,
  createUser
}


/*
"use strict";
const sqlite3 = require('sqlite3').verbose();
class userModelClass {
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
        password text,
        is_admin integer)`
    return this.db.run(sql);
  }
  selectByUserName(username, callback) {
    console.log(username)
    return this.db.get(
       `SELECT * FROM user WHERE username = ?`,
       [username],function(err,row){
         callback(err,row)
       })
  }
  selectByEmail(email, callback) {
    return this.db.get(
       `SELECT * FROM user WHERE email = ?`,
       [email],function(err,row){
         callback(err,row)
       })
  }
  insertAdmin(user, callback) {
    return this.db.run(
       'INSERT INTO user (name,email,user_pass,is_admin) VALUES (?,?,?,?)',
       user, (err) => {
         callback(err)
       })
  }
  selectAll(callback) {
    return this.db.all(`SELECT * FROM user`, function(err,rows){
      callback(err,rows)
    })
  }
  insert(user, callback) {
    return this.db.run(
       'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
       user, (err) => {
         callback(err)
       })
  }
}
module.exports = userModelClass*/
