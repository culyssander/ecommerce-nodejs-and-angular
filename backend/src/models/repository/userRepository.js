'use strict'

const User = require('../domain/userModel');
const conn = require('../database/db');

User.getAll =  async result => {
    const sql = 'SELECT id, username, email, firstname, lastname, age, role FROM user ORDER BY id';
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
    console.log(userId);
    const sql = `SELECT id, username, email, firstname, lastname, age, role FROM user WHERE id = ${userId}`;
    conn.query(sql, (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(null, err);
            return;
        }

        console.log('User: ', res[0]);
        result(null, res[0]);
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


User.update = async (userId, user, result) => {
    const sql = 'UPDATE user SET username = ?, password = ?, email = ?, firstname = ?, lastname = ?, age = ?, role = ? WHERE id = ?';

    conn.query(sql, [user, userId], (err, res) => {
        if(err){
          console.log('Error: ', err);
          result(null, err);
          return;
        }
    
    console.log('User updated successfully : ', {id: res.insertId, ...user});
    result(null, {id: res.insertId, ...user});
    });
}

User.delete = async (userId, result) => {
    const sql = `DELETE FROM user WHERE id = ${userId}`;
    conn.query(userId, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        const resData = res.affectedRows === 1 ? 'User deleted successfully ': 'data: not found'

        console.log('Delete user: ', resData);
        result(null, res.affectedRows);
    });
}

module.exports = User;