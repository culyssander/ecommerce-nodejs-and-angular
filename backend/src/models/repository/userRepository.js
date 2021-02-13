'use strict'

const User = require('../domain/userModel');
const conn = require('../database/db');

User.getAll =  async result => {
    const sql = 'SELECT * FROM user ORDER BY id';
    conn.query(sql, (err, res) => {
        
        if(err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }

        console.log('Users: ', res);
        result(null, res);
    });
}

User.getById = async (userId, result) => {
    const sql = `SELECT * FROM user WHERE id = ${userId}`;
    conn.query(sql, (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }

        console.log('User: ', res);
        result(null, res);
    })
}

User.create = async (user, result) => {
    const sql = 'INSERT INTO user SET ?';
    conn.query(sql, user, (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }

        console.log('User added successfully: ', {id: res.insertId, ...user});
        result(null, {id: res.insertId, ...user});
    });
}

module.exports = User;