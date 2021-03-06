'use strict'

const categoryDao = require('../models/dao/categoryDao');
const productDao = require('../models/dao/productDao');
const _ = require('lodash');
const moment = require('moment');
const axios = require('axios');
axios.defaults.headers.common['Authorization'] = 'I3UE2JUA4U';
let getCategory = async function (req, res) {
    try {
        let result = await categoryDao.getAllCategory();
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }
}


let getCategoryById = async function (req, res) {
    try {
        let result = await productDao.getProduct({ where: { subCategory: req.params.id } });
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }
}

let getCategoryByCat = async function (req, res) {
    try {
        let result = await categoryDao.getCategory({ where: { mainCategory: 'Electrodevices' } });
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }
}

let addCategory = async function (req, res) {
    try {
        console.log("body", req.body);
        let result = await categoryDao.addCategory(req.body);
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }
}

let updateCategory = async function (req, res) {
    try {
        let result = await categoryDao.updateCategory(req.body, req.body.id);
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }
}

let deleteCategory = async function (req, res) {
    try {
        let result = await categoryDao.deleteCategory({ id: req.params.id });
        res.status(200).json({
            status: "Success",
            result: result
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }
}
module.exports = {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
    getCategoryById,
    getCategoryByCat
}