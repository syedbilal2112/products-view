'use strict'

const productDao = require('../models/dao/productDao');
const _ = require('lodash');
const moment = require('moment');
var QrCode = require('qrcode-reader');
var Jimp = require("jimp");

let getProduct = async function (req, res) {
    try {
        let result = await productDao.getProduct({ where: { mainCategory: 'Electrodevices' } });
        result = JSON.parse(JSON.stringify(result));
        for (let index1 = 0; index1 < result.length; index1++) {
            let temp = result[index1];
            temp['checked'] = true;
            result[index1] = temp;
        }
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

let getProductById = async function (req, res) {
    try {
        let result = await productDao.getProduct({ where: { id: +req.params.id } });
        result = JSON.parse(JSON.stringify(result));
        for (let index1 = 0; index1 < result.length; index1++) {
            let temp = result[index1];
            temp['checked'] = true;
            result[index1] = temp;
        }
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

let getAllProduct = async function (req, res) {
    try {
        let result = await productDao.getAllProduct();
        result = JSON.parse(JSON.stringify(result));
        for (let index1 = 0; index1 < result.length; index1++) {
            let temp = result[index1];
            temp['checked'] = true;
            result[index1] = temp;
        }
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

let addProduct = async function (req, res) {
    try {
        var base64String = req.body.file;
        let base64Image = base64String.split(';base64,').pop();
        require("fs").writeFile("./uploads/" + req.body.fileName, base64Image, 'base64', function (err) {
            console.log(err);
        });
        let result = await productDao.addProduct(req.body);
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

let updateProduct = async function (req, res) {
    try {
        var base64String = req.body.file;
        let base64Image = base64String.split(';base64,').pop();
        require("fs").writeFile("./uploads/" + req.body.fileName, base64Image, 'base64', function (err) {
            console.log(err);
        });
        let result = await productDao.updateProduct(req.body, req.body.id);
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

let deleteProduct = async function (req, res) {
    try {
        console.log("req.params.id", req.params.id)
        let result = await productDao.deleteProduct({ id: req.params.id });
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

let qrCodeScanner = async function (req, res) {
    try {
        var qr = new QrCode();
        console.log("__dirname", __dirname);
        var buffer = fs.readFileSync(__dirname + '/image.png');
        Jimp.read(buffer, function (err, image) {
            if (err) {
                console.error(err);
                // TODO handle error
            }
            var qr = new QrCode();
            qr.callback = function (err, value) {
                if (err) {
                    console.error(err);
                    // TODO handle error
                }
                console.log(value.result);
                console.log(value);
            };
            qr.decode(image.bitmap);

            res.status(200).json({
                status: "Success"
            });
        });
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "Failure"
        });
    }
}
module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProduct,
    getProductById,
    qrCodeScanner
}