'use strict';

const db = require('../models/db');
/*
 * Defines the routes of the expressApplication
 */
async function serverInit(constants) {
    /*
     * init database
     */
    // console.log(CONSTANTS)
    await db.dbInit(constants);
    //console.log('Server Initialized');
    
}

exports.serverInit = serverInit;