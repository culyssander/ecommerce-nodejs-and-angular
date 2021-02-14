'use strict'

const repository = require('../../models/repository/orderRepository');
const Validator = require('../../models/util/validator');

exports.getAll = async (req, res, next) => {
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1; // set the current page number
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10; // set the limit of items per page

    let startValue;
    let endValue;

    if(page > 0) {
        startValue = (page * limit) - limit; // 0, 10, 20, 30...
        endValue = page * limit;
    } else {
        startValue = 0;
        endValue = 10;
    }

    try {
        await repository.Order.getAll( (err, result) => {
            if (err)  res.send(err);  

            res.send({
                count: result.length,
                total: totalOrder(result),
                orders: result.slice(startValue, endValue)
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

exports.getById = async (req, res, next) => {
    try {
        await repository.Order.getById( req.params.id, (err, result) => {
            if (err)  res.send(err);  
            res.send({
                count: result.length,
                total: totalOrder(result),
                orders: result
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

exports.post = async (req, res, next) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){  
        res.status(400).send({ 
            error:true, 
            message: 'Please provide all required field' 
        });
        return
    }
    try {
        await repository.Order.create(req.body, (err, result) => {
            if(err) {
                res.send(err);
                return;
            }

            if(result.code === 'ER_BAD_FIELD_ERROR') {
                console.log('error: ', res);
                res.status(400).send({
                    code: result.code,
                    message: result.sqlMessage
                })
                return;
            }

            res.status(201).json({
                message:"Order added successfully!",
                data:result
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

exports.update = async (req, res, next) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){  
        res.status(400).send({ 
            error:true, 
            message: 'Please provide all required field' 
        });
        return
    }
    
    try {        
        await repository.Order.update(req.params.id, req.body.user_id, (err, result) => {
            if(err) {
                res.send(err);
                return;
            }

            if(result.code === 'ER_BAD_FIELD_ERROR' || result.code === 'ER_NO_REFERENCED_ROW_2') {
                console.log('error: ', res);
                res.status(400).send({
                    code: result.code,
                    message: result.sqlMessage
                })
                return;
            }

            res.json({
                message:"Order updated successfully!",
                data:result
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.Order.delete(req.params.id, (err, result) => {
            if (err) {
                res.send(err);  
                return;
            }

            if(result === 0) {
                res.status(404).send({data: 'not found'});
                return;
            }

            res.status(204).json();
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

exports.postOrderDetails = async (req, res, next) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){  
        res.status(400).send({ 
            error:true, 
            message: 'Please provide all required field' 
        });
        return
    }
    try {
        await repository.OrderDetails.create(req.body, (err, result) => {
            if(err) {
                res.send(err);
                return;
            }

            if(result.code === 'ER_BAD_FIELD_ERROR') {
                console.log('error: ', res);
                res.status(400).send({
                    code: result.code,
                    message: result.sqlMessage
                })
                return;
            }

            res.status(201).json({
                message:"Order details added successfully!",
                data:result
            });
        });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

const totalOrder = (arr) => {
    let total = 0;
    for (const i of arr) {
        total += i.price * i.quantity;
    }
    return total;
}

const validatorData = (data) => {
    const validator = new Validator();

    validator.hasMinLen(data.username, 3, 'Name must not be empty and must not be less than 3 characters long ');
    // validator.hasMinLen(data.telefone, 8, 'Phone cannot be empty and must not be less than 8 characters long ');
    validator.hasMinLen(data.password, 3, 'Password must not be empty and must not be less than 3 characters ');
    validator.isEmail(data.email, 'Email invalid');
    
    return validator;
}