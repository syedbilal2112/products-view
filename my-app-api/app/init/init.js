/**
 * Wimera System Pvt.Ltd, Bangalore - India.
 *
 * Copyright (c) 2019. Wimera System Pvt.Ltd.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 25-Nov-2019     @Author: Syed (ramesh@wimerasys.com)
 *     Web server init added
 * 
 */

/*
 * retrieve the required modules
 */
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