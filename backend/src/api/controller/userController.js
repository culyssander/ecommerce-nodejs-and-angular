'use strict'

const repository = require('../../models/repository/userRepository');
const Validator = require('../../models/util/validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        await repository.getAll( (err, result) => {
            if(err)
                res.send(err);

            res.send({
                count: result.length,
                users: result.slice(startValue, endValue)
            })
        });
    } catch (e) {
        console.log("Error: " + e);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}


exports.getById = async (req, res, next) => {
    try {
        await repository.getById( req.params.id, (err, result) => {
            if(err) {
                res.send(err);
                return;
            }

            if(result == 0) {
                res.status(404).send({data: 'not found'})
                return;
            }

            res.send(result);
        });
    } catch (e) {
        console.log("Error: " + e);
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
        const validator = validatorData(req.body);

        if(!validator.isValid()) {
            res.status(400).send(validator.errors()).end();
            return;
        }

        req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

        await repository.create(req.body, (err, result) => {
            if(err) {
                res.send(err);
                return;
            }

            res.status(201).json({
                message:"User added successfully!",
                data:result
            });
        });
    } catch (e) {
        console.log("Error: " + e);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

const validatorData = (data) => {
    const validator = new Validator();

    validator.hasMinLen(data.username, 3, 'Name must not be empty and must not be less than 3 characters long ');
    // validator.hasMinLen(data.telefone, 8, 'Phone cannot be empty and must not be less than 8 characters long ');
    validator.hasMinLen(data.password, 3, 'Password must not be empty and must not be less than 3 characters ');
    validator.isEmail(data.email, 'Email invalid');
    
    return validator;
}