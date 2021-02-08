'use strict'

const conn = require('../database/db');
const Categoria = require('../domain/categoryModel');

exports.create = async(category, resultado) => {
    conn.query('INSERT INTO category SET ?', category, (err, res) => {
        if(erro){
            console.log('Error: ' + err);
            resultado(err, null);
            return;
        }

        console.log('Created category : ', {id: res.inserid, ...category});
        resultado(null, {id: res.inserid, ...category} );
    });
}

exports.getAll = async result => {
  const sql = 'SELECT * FROM category order by id';
    conn.query(sql, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log('category: ', res);
        result(null, res);
      }     
    });
}

exports.getById = async (categoryId, result) => {
  const sql = `SELECT * FROM category WHERE id = ${categoryId}`;
    conn.query(sql, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } 
      if(res.length) {
        console.log('category: ', res);
        result(null, res[0]);
        return;
      }
      
        result(null);
        return;  
    });
}