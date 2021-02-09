'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controller/categoryController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;