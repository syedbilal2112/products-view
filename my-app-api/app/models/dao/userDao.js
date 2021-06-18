
'use strict';

/*
 * retrieve the required modules
 */
/**
 *  Import DAO
 */
const user = require('../../../models/user');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/*
 * Insert into user
 */
let adduser = async function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const users = await user(sequelize, Sequelize);
            var res = '';
            res = users.create(data);
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}

/*
 * Insert into user
 */
let getUser = async function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const users = await user(sequelize, Sequelize);
            var res = '';
            res = await users.findAll({ where: data });
            resolve(res)
        } catch (err) {
            reject(err)
        }
    })
}

/*
 * Insert into user
 */
let getOneUser = async function (data) {
    return new Promise(async function (resolve, reject) {
        try {
            const users = await user(sequelize, Sequelize);
            var res = '';
            res = await users.findOne({ where: data });
            resolve(res)
        } catch (err) {
            console.log(err);
            reject(err)
        }
    })
}
/**
 * Export to others
 */
module.exports = {
    adduser,
    getUser,
    getOneUser
}
