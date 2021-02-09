'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controller/productController')

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/category/:category', controller.getByCategory);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;