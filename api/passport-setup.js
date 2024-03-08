const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require('./models/User');
const bcrypt = require("bcrypt");

module.exports = function () {
    passport.use('user-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                // User not found
                return done(null, false, { message: "Incorrect credentials!" });
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return done(null, false, { message: "Incorrect credentials!" });
            }

            return done(null, { user: user });
        } catch (err) {
            return done(err); // Pass the error to indicate authentication failure
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};