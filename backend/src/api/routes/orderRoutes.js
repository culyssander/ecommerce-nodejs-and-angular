'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controller/orderController');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

router.post('/details', controller.postOrderDetails);
// router.put('/details/:id', controller)
// router.delete('/details/:id', controller)


module.exports = router;