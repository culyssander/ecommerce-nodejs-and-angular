'use strict'

const conn = require('../database/db');
const Categoria = require('../domain/categoryModel');

Categoria.create = async(category, result) => {
  const sql = 'INSERT INTO category SET ?';
    conn.query(sql, category, (err, res) => {
        if(err){
            console.log('Error: ', err);
            result(err, null);
            return;
        }

        console.log('Category added successfully: ', {id: res.insertId, ...category});
        result(null, {id: res.insertId, ...category});
    });
}

Categoria.update = async(id, category, result) => {
  const sql = 'UPDATE category SET title = ? WHERE id = ?';

  conn.query(sql, [category, id], (err, res) => {
    if(err){
      console.log('Error: ', err);
      result(err, null);
      return;
  }

  console.log('Category updated successfully : ', {id: res.insertId, ...category});
  result(null, {id: res.insertId, ...category});
  });
}

Categoria.delete = async(id, result) => {
  const sql = 'DELETE FROM category WHERE id = ?';

  conn.query(sql, id, (err, res) => {
    if(err){
      console.log('Error: ', err);
      result(err, null);
      return;
  }

  console.log('Category deleted successfully : ', res.affectedRows);
  result(null, res.affectedRows);
  });
}

Categoria.getAll = async result => {
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

Categoria.getById = async (categoryId, result) => {
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

module.exports = Categoria;