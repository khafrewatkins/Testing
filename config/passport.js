// get local strategy (plugin)
const LocalStrategy = require('passport-local').Strategy
// get mongoose goodies
const mongoose = require('mongoose')
// get user model
const User = require('../models/User')

// get local strategy for authentication ? magic
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );
  // serializeUser determines which data of the user object should be stored in the session.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // The user id is saved in the session and is later used to retrieve the whole object via the deserializeUser function.
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};