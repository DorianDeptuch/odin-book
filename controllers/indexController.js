const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.index_get = (req, res, next) => {};

exports.index_post = (req, res, next) => {};

exports.login_get = (req, res, next) => {};

exports.login_post = [
  body("email", "Please enter an email").trim().isLength({ min: 6 }).escape(),
  body("password", "Please enter a password")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  (req, res, next) => {
    let { email, password } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (!email || !password) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (!validationErrors.isEmpty()) {
      errors.push({ msg: "Validation failed" });
    }

    console.log("you're doing great!");

    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      // failureFlash: true,
      errors,
    })(req, res, next);
  },
];

exports.signup_post = [
  body("newEmail", "Please enter an email")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("firstName", "Please enter your first name")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("lastName", "Please enter your last name")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("newPassword", "Please enter a password")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("confirmPassword", "Please enter a confirmPassword")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  (req, res, next) => {
    let { newEmail, firstName, lastName, newPassword, confirmPassword } =
      req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (
      !newEmail ||
      !newPassword ||
      !confirmPassword ||
      !firstName ||
      !lastName
    ) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (newPassword !== confirmPassword) {
      errors.push({ msg: "Passwords do not match" });
    }

    if (newEmail.length < 6) {
      errors.push({ msg: "Email must contain at least 6 characters" });
    }

    if (newPassword.length < 6) {
      errors.push({ msg: "Password must contain at least 6 characters" });
    }

    if (!validationErrors.isEmpty()) {
      errors.push({ msg: "Validation failed " });
    }

    if (errors.length > 0) {
      res.json({ errors, newEmail, firstName, lastName });
    } else {
      User.findOne({ email: newEmail }).then((user) => {
        if (user) {
          errors.push({ msg: "That Email has already been registered" });
          res.json({
            errors,
            newEmail,
            newPassword,
          });
        } else {
          const newUser = new User({
            email: newEmail,
            password: newPassword,
            firstName,
            lastName,
          });

          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  // install connect-flash to use
                  // req.flash(
                  //   "success_msg",
                  //   "You are now Registered and can Log In"
                  // );
                  res.redirect("/login");
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  },
];

exports.settings_get = (req, res, next) => {};

exports.settings_post = (req, res, next) => {};

exports.search_get = (req, res, next) => {};

exports.search_get = (req, res, next) => {};
