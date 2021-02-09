'use strict'

const conn = require('../database/db');
const Product = require('../domain/productModel');

Product.create = async(product, result) => {
  const sql = 'INSERT INTO product SET ?';
    conn.query(sql, product, (err, res) => {
        if(err){
            console.log('Error: ', err);
            result(err, null);
            return;
        }

        console.log('Product added successfully: ', {id: res.insertId, ...product});
        result(null, {id: res.insertId, ...product});
    });
}

Product.update = async(id, product, result) => {
  const sql = 'UPDATE product SET title = ? WHERE id = ?';

  conn.query(sql, [product, id], (err, res) => {
    if(err){
      console.log('Error: ', err);
      result(err, null);
      return;
  }

  console.log('Product updated successfully : ', {id: res.insertId, ...product});
  result(null, {id: res.insertId, ...product});
  });
}

Product.delete = async(id, result) => {
  const sql = 'DELETE FROM product WHERE id = ?';

  conn.query(sql, id, (err, res) => {
    if(err){
      console.log('Error: ', err);
      result(err, null);
      return;
  }

  console.log('Product deleted successfully : ', res.affectedRows);
  result(null, res.affectedRows);
  });
}

Product.getAll = async result => {
  const sql = 'SELECT * FROM product order by id';
    conn.query(sql, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log('product: ', res);
        result(null, res);
      }     
    });
}

Product.getById = async (productId, result) => {
  const sql = `SELECT * FROM product WHERE id = ${productId}`;
    conn.query(sql, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } 
      if(res.length) {
        console.log('product: ', res);
        result(null, res[0]);
        return;
      }
      
        result(null);
        return;  
    });
}

module.exports = Product;