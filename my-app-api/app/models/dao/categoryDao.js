/**
 * Wimera System Pvt.Ltd, Bangalore - India.
 *
 * Copyright (c) 2019. Wimera System Pvt.Ltd.
 * All Rights Reserved.
 *
 */

'use strict';
const Category = require('../../../models/categories')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*
 * Add Category
 */
let addCategory = async function (queryparam) {
    return new Promise(async function (resolve, reject) {
        try {
            var query = {
                mainCategory: queryparam.mainCategory,
                subCategory: queryparam.subCategory
            };
            const categories = await Category(sequelize, Sequelize)
            resolve(await categories.create(query))
        } catch (err) {
            reject(err)
        }
    });
}

/*
 * Get All Category
 */
let getAllCategory = async function () {
    return new Promise(async function (resolve, reject) {
        try {
            const categories = await Category(sequelize, Sequelize)
            var res = await categories.findAll({});
            resolve(res);
        } catch (err) {
            reject(err);
        }
    });
};

/*
 * Get All Category
 */
let getCategory = async function (query) {
    return new Promise(async function (resolve, reject) {
        try {
            const categories = await Category(sequelize, Sequelize)
            var res = await categories.findAll(query);
            resolve(res);
        } catch (err) {
            reject(err);
        }
    });
};

/*
 * Update Category
 */
let updateCategory = async function (updateData, id) {
    return new Promise(async function (resolve, reject) {
        try {
            const categories = await Category(sequelize, Sequelize);
            var res = await categories.update(
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
 * Delete Category
 */
let deleteCategory = async function (query) {
    return new Promise(async function (resolve, reject) {
        try {
            const categories = await Category(sequelize, Sequelize);
            var res = categories.destroy({
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
    addCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,
    getCategory
}