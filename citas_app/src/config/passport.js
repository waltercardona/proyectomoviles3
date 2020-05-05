const passport = require('passport');
const userService = require('../services/userService');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    userService.loadUser(email, password, function (user, err) {
        if (!user) {
            return done(null, false, {
                message: 'Not User Found, Please click on Register.'
            });
        } else {
            // Match user's Password
            const match = true;// await user.matchPassword(password);
            if (match) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Incorrect Password'
                });
            }
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    userService.searchUser(id, function (user, err) {
        done(err, user);
    });
});