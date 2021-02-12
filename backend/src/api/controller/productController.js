'use strict'

const repository = require('../../models/repository/productRepository');

exports.getAll = async(req, res, next) => {
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

    try{
        await repository.getAll((err, result)=>{
            
            if (err)  res.send(err);  

            res.send({
                count: result.length,
                products: result.slice(startValue, endValue)
            });
        });
    }catch(e){
        console.log("Error: " + e);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

exports.getByCategory = async(req, res, next) => {
    const category = req.params.category;
    try{
        await repository.getById(category, (err ,result)=>{
            
            if (err)  res.send(err);  

            if(result == null) {
                res.status(404).json({
                    data: "not found"
                });
                return;
            }
            res.send(result);
        });
    }catch(e){
        console.log("Error: " + e);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

exports.getById = async(req, res, next) => {
    const productId = req.params.id;
    try{
        await repository.getById(productId, (err ,result)=>{
            
            if (err)  res.send(err);  

            if(result == null) {
                res.status(404).json({
                    data: "not found"
                });
                return;
            }
            res.send(result);
        });
    }catch(e){
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
       await repository.create(req.body, (err, result) => {
        if (err) {
            res.send(err);  
            return;
        }
        res.json({
            message:"Product added successfully!",
            data:result
        });
       });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).send({message: 'Falha ao processar a requisação.'});
    }
}

exports.put = async (req, res, next) => {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){  
        res.status(400).send({ 
            error:true, 
            message: 'Please provide all required field' 
        });
        return
    }

    try {
        await repository.update(req.params.id, req.body, (err, result) => {
            if (err) {
                res.send(err);  
                return;
            }
            res.json({
                message:"Product updated successfully!",
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
        await repository.delete(req.params.id, (err, result) => {
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