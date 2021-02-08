'use stract'

const mysql = require('mysql');
const dbConfig = require('../../config/dbConfig');

const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

conn.connect(err => {
    if(err) throw err;
    console.log('Database ' + conn.state);
});

module.exports = conn;