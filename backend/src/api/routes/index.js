const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send({
        title: 'Welcome to ecommerce - Quitumba Ferreira',
        version: 1.0
    })
});

module.exports = router;