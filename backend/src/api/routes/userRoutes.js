'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');


router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.post);


module.exports = router;