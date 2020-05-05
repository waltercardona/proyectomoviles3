const usersCtrl = {};

const userService = require('../services/userService');

const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {
        name,
        email,
        password,
        confirm_password
    } = req.body;
    if (password != confirm_password) {
        errors.push({
            text: 'Passwords do not match.'
        });
    }
    if (password.length < 4) {
        errors.push({
            text: 'Passwords must be at least 4 characters.'
        });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
        userService.createUser(name, email, password, confirm_password, function (user, err) {
            if (err) {
                req.flash('error_msg', 'Se ha producido un error. Contacte con el administrador');
                res.redirect('/users/signup');
            } else {
                req.flash('success_msg', 'You have been registered successfully');
                res.redirect('/users/signin');
            }
        });
    }
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/citas',
    failureFlash: true
});


usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Your session has been closed successfully.');
    res.redirect('/users/signin');
};

module.exports = usersCtrl;