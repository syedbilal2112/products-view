
'use strict';
const tedious = require('tedious');
const Sequelize = require('sequelize');
const db = require('../../models/index');
async function dbInit(constants) {
    try {
          global.sequelize = new Sequelize(constants.development.database, constants.development.username, constants.development.password,{
            host: constants.development.host,
            // port: Config.database.port,
            dialect: 'mysql',
            logging: false,
            sync: {force: true}
        });
          sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                global.constants = constants
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
                setTimeout(function() { dbInit(constants); }, 60000);
            });
    } catch (err) {
        //console.log(err);
    }
}

exports.dbInit = dbInit;