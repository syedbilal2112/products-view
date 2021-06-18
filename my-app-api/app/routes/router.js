
const loginController = require('../controller/loginController');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const isAuthenticate = require('../../config/passport');
const authenicate = (req, res, next) => {
    return passport.authenticate('jwt', { session: false })
}


async function router(expressApp) {

    expressApp.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
        if (req.user.message) {
            res.json({
                message: 'Signup successful'
            })
        } else {
            res.json({
                message: 'Signup failed'
            })
        }
    })

    expressApp.post('/login', loginController.authenticated);
}



/*
 * export to others
 */
exports.router = router;