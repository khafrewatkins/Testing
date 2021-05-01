// get passport for authentication
const passport = require('passport')
// get library that validates and sanitizes strings
const validator = require('validator')
// get mongoose user model (how we communicate with database). Like a class constructor for the user data with the ability to use mongoose methods
const User = require('../models/User')

// handle /signup get 
exports.getSignup = (req, res) =>{
  // if user exists, redirect to profile
  if (req.user) {
    return res.redirect("/profile")
  }
  // if user is new, render signup form
  res.render("signup", {
    title: "Create Account",
  })
}

// handle /signup post
exports.postSignup = (req, res, next) => {
  // handle validation errors with validator library, create array that stores error messages (if any) when submitting the signup form
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  // if there were any validation errors, flash the messages in the array
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  // Normalize the email address by lowercasing the domain part of it, so that any two equivalent email strings normalize to the same thing
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  // create new user with the User model, with the data in the requests submitted by the form
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  // mongoose method, finds one document according to the condition. If multiple documents match the condition, then it returns the first document satisfying the condition.
  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      // if user already exists flash error message and redirect to /signup
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      // save user data. Mongoose's save() function is one way to save the changes you made to a document to the database.
      user.save((err) => {
        if (err) {
          return next(err);
        }
        // passport method login(), Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          // redirect to user's profile
          res.redirect("/profile");
        });
      });
    }
  );
};

// handle /login get & post. very similar code without making a new user

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile")
  }
  res.render("login", {
    title: "Login",
  })
}

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
  // authenticate request using local-strategy
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    // if not an user, flash errors and redirect to login page
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    // if user exists, flash success message and redirect to user's profile
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};
