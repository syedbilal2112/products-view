/**
 * Wimera System Pvt.Ltd, Bangalore - India.
 *
 * Copyright (c) 2019. Wimera System Pvt.Ltd.
 * All Rights Reserved.
 *
 */

'use strict';
const Product = require('../../../models/product')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*
 * Add Product
 */
let addProduct = async function (queryparam) {
    return new Promise(async function (resolve, reject) {
        try {
            var query = {
                mainCategory: queryparam.mainCategory,
                subCategory: queryparam.subCategory,
                productImage: queryparam.fileName,
                productName: queryparam.productName,
                productDescription: queryparam.productDescription
            };
            const product = await Product(sequelize, Sequelize)
            resolve(await product.create(query))
        } catch (err) {
            reject(err)
        }
    });
}

/*
 * Get All Product
 */
let getAllProduct = async function () {
    return new Promise(async function (resolve, reject) {
        try {
            const product = await Product(sequelize, Sequelize)
            var res = await product.findAll({});
            resolve(res);
        } catch (err) {
            reject(err);
        }
    });
};

/*
 * Get All Product
 */
let getProduct = async function (query) {
    return new Promise(async function (resolve, reject) {
        try {
            const product = await Product(sequelize, Sequelize)
            var res = await product.findAll(query);
            resolve(res);
        } catch (err) {
            reject(err);
        }
    });
};

/*
 * Update Product
 */
let updateProduct = async function (updateData, id) {
    return new Promise(async function (resolve, reject) {
        try {
            const product = await Product(sequelize, Sequelize);
            var res = await product.update(
                updateData
                , {
                    where: {
                        id: id
                    }
                });
            resolve(res);
        } catch (err) {
            reject();
        }
    });
};

/*
 * Delete Product
 */
let deleteProduct = async function (query) {
    return new Promise(async function (resolve, reject) {
        try {
            const product = await Product(sequelize, Sequelize);
            var res = product.destroy({
                where: query
            });
            resolve(res);
        } catch (err) {
            reject();
        }
    });
};

/**
 * Export to others
 */
module.exports = {
    addProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    getProduct
}