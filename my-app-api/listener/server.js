
"use strict";
const express = require('express');
const bodyParser = require('body-parser');
require('../app/auth/auth');

async function start(router) {
    try {
        let app = express();
        let http = require('http').Server(app);

        /* configure the express */
        /* parse application/x-www-form-urlencoded */
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        /* parse application/json */
        // app.use(bodyParser.json());
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        /*
         * CORS middleware
         */
        var allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, auth, accesstoken');

            next();
        }
        app.use(allowCrossDomain);
        app.use('/uploads', express.static('uploads'));
        // app.use(authenication)

        /* configure the routes */
        router(app);
        http.listen(3001);

    } catch (err) {
        //console.log(err);
    }
}

exports.start = start;