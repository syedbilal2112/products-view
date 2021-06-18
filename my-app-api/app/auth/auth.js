
const passport = require('passport');
const localStrategy = require('passport-local');
const userDao = require('../models/dao/userDao');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

//create a passport middleware to handle  user registration
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const name = req.body.name;
        const role = 'ADMIN';
        const timestamp = new Date().getTime();

        let user = await userDao.getOneUser({ email: email });
        // console.log("user", user);
        if (user) return done(null, { "message": false })

        const hash = await bcrypt.hash(password, 10)
        password = hash;
        const daq = await userDao.adduser({ name, email, role, password, timestamp })

        return done(null, { "message": true });

    } catch (err) {
        return done(null, { "message": false })
    }
}));
let isValidPassword = async function (password, userPassword) {
    const compare = await bcrypt.compare(password, userPassword);
    return compare
}

// user login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await userDao.getOneUser({ email });
        if (!user) {
            return done(null, false, { message: 'user not found' });
        }

        const validate = await isValidPassword(password, user.password);
        if (!validate) {
            return done(null, false, { message: 'wrong password' });
        }

        return done(null, user, { message: 'logged in successfull' })


    } catch (err) {
        return done(err)
    }
}))

passport.use(new JWTstrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (err) {
        done(err)
    }
}))