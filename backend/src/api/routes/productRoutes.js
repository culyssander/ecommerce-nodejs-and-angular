'use strict'

const express = require('express');
const router = express.Router();
const { database } = require('../../models/database/db');

router.get('/', (req, res, next) => {
    // let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1; // set the current page number
    // const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10; // set the limit of items per page

    // let startValue;
    // let endValue;

    // if(page > 0) {
    //     startValue = (page * limit) - limit; // 0, 10, 20, 30...
    //     endValue = page * limit;
    // } else {
    //     startValue = 0;
    //     endValue = 10;
    // }

    // database.table('product as p')
    // .join([{
    //     table: 'category as c',
    //     on: 'c.id = p.category_id'
    // }])
    // .withFields([
    //     'c.title as category',
    //     'p.title as name',
    //     'p.price',
    //     'p.quantity',
    //     'p.image',
    //     'p.id'
    // ])
    // .slice(startValue, endValue)
    // .sort({id: .1})
    // .getAll()
    // .then( products => {
    //     if(products.length > 0 ) {
    //         res.status(200).json({
    //             count: products.length,
    //             products: products
    //         });
    //     }else {
    //         res.json({
    //            message: 'No products founds' 
    //         });
    //     }
    // })
    // .catch(err => console.log('Error: ', err));

});

module.exports = router;