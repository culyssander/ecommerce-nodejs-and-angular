'use strict'

const conn = require('../database/db');
const model = require('../domain/orderModel');

model.Order.getAll = async result => {
    const sql = `
        SELECT o.id, p.title as product, p.price, od.quantity, (p.price * od.quantity) as total_order_detail, u.firstName, u.email, o.created_at  
        FROM orders o, orders_details od, user u, product p 
        WHERE o.user_id = u.id AND od.orders_id = o.id AND p.id = od.product_id
    `;
    conn.query(sql, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log('orders: ', res);
        result(null, res);
    });
}

model.Order.getById = async (orderId, result) => {
    const sql = `
        SELECT o.id, p.title as product, p.price, od.quantity, (p.price * od.quantity) as total_order_detail, u.firstName, u.email, o.created_at  
        FROM orders o, orders_details od, user u, product p 
        WHERE o.user_id = u.id AND od.orders_id = o.id AND p.id = od.product_id AND o.id = ${orderId}
    `;
    conn.query(sql, (err, res) => {
        if(err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        console.log('orders: ', res);
        result(null, res);
    });
}

model.Order.create = async (order, result) => {
    const sql = 'INSERT orders SET ?';

    conn.query(sql, order, (err, res) => {
        if(err) {
            console.log('error', err);
            result(null, err);
            return;
        }

        console.log({id: res.insertId, ...order});
        result(null, {id: res.insertId, ...order});
    });
}

model.Order.update = async (orderId, userId, result) => {
    const sql = 'UPDATE orders SET user_id = ? WHERE id = ?';
    conn.query(sql, [userId, orderId], (err, res) => {
        if(err) {
            console.log('error', err);
            result(null, err);
            return;
        }

        console.log('User updated successfully : ', {id: orderId, ...userId});
        result(null, {id: orderId, userId: userId});
    });
}

model.Order.delete = async (orderId, result) => {
    const sql = `DELETE FROM orders WHERE id = ${orderId}`;

    conn.query(sql, (err, res) => {
        if(err) {
            console.log('error', err);
            result(null, err);
            return;
        }

        const resData = res.afatfectedRows === 1 ? 'User deleted successfully ': 'data: not found'

        console.log('Delete user: ', resData);
        result(null, res.affectedRows);
    });
}

model.OrderDetails.create = async (orderDetails, result) => {
    const sql = 'INSERT orders_details SET ?';

    conn.query(sql, orderDetails, (err, res) => {
        if(err) {
            console.log('error', err);
            result(null, err);
            return;
        }

        console.log({id: res.insertId, ...orderDetails});
        result(null, {id: res.insertId, ...orderDetails});
    });
}

module.exports = model;