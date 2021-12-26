const User = require('../models/User');
const passport = require('passport');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) throw new Error('Invalid input');

        const newUser = new User({
            email,
            username,
            password,
        });

        await newUser.save();

        return res.redirect('/login');
    } catch (error) {
        return res.redirect('/register');
    }
};

const login = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
});

const logout = (req, res) => {
    req.logOut();
    res.redirect('/login');
};

module.exports = {
    register,
    login,
    logout,
};
