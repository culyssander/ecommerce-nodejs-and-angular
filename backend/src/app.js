'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./api/routes/index');
// const userRouter = require('./routes/userRoutes');
const productRouter = require('./api/routes/productRoutes');
const categoryRouter = require('./api/routes/categoryRoutes');

const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-with, Accept'
}))

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);

module.exports = app