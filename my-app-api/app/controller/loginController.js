'use strict'

const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator')
const userDao = require('../models/dao/userDao');
const _ = require('lodash');
const moment = require('moment');

/**
 * input validate function
 */
let validate = async (method) => {
    switch (method) {
        case 'authenticated': {
            body('email', 'Invalid Email').exists().isEmail()
        }
    }
}



// accepts: (httprequest,httpresponse)
// function: passes the username and password from httprequest to Cloud 
// returns: httpresponse along with status code(400 or 400), 
//          response from cloud and status message (Success or Failure)

let authenticated = async (req, res, next) => {

    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occurred');
                res.status(400);
                res.send({
                    code: 400, "message": "Username or Password incorrect"
                });
                return res.end();
            }
            const validationError = validationResult(req);

            if (!validationError.isEmpty()) {
                res.status(400);
                res.send({
                    code: 400, "message": "Username or Password incorrect"
                });
                return res.end();
            }
            req.login(user, { session: false }, async (error) => {
                if (error) {
                    res.status(400);
                    res.send({
                        code: 400, "message": "Username or Password incorrect"
                    });
                    return res.end();
                }
                
                let userDetails = await userDao.getOneUser({ email: user.email });

                let token;
                token = jwt.sign(_.pick(userDetails, ['_id', 'role', 'name', 'email']), 'top_secret', {
                    expiresIn: moment().add(1, 'days').unix()
                });
                if (!userDetails) {
                    res.status(400);
                    res.send({
                        code: 400, "message": "Username or Password incorrect"
                    });
                    res.end();
                }
                else
                    return res.json({ "result": "success", token, user:_.pick(userDetails, ['role', 'name', 'email']) });
            });
        } catch (error) {
            console.log("error", error);
        }
    })(req, res, next)
}


/**
 * Export to others
 */
module.exports = {
    authenticated
}