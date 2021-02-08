'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controller/categoryController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;