const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'Wrong email or password' });

            if (await user.comparePassword(password)) {
                return done(null, user);
            } else {
                return done(null, false , { message: 'Wrong email or password' });
            }
        } catch (error) {
            return done(error, false, { message: 'Sever error' });
        }
    };

    const getUser = async (id) => {
        return await User.findOne({ _id: id });
    };

    passport.use(
        new LocalStrategy({ usernameField: 'email' }, authenticateUser)
    );
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        return done(null, await getUser(id));
    });
}

module.exports = initialize;
