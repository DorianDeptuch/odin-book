const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
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

  body("newEmail", "Please enter an email")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("firsName", "Please enter your first name")
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
    let {
      email,
      password,
      newEmail,
      firstName,
      lastName,
      newPassword,
      confirmPassword,
    } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (email || password) {
      newEmail = null;
      firstName = null;
      lastName = null;
      newPassword = null;
      confirmPassword = null;

      if (!email || !password) {
        errors.push({ msg: "Please fill in all fields" });
      }

      if (!validationErrors.isEmpty()) {
        errors.push({ msg: "Validation failed" });
      }

      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
        errors,
      })(req, res, next);
    } else {
      email = null;
      password = null;

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
        // Make database call to check if email already exists
      }
    }
  },
];

exports.settings_get = (req, res, next) => {};

exports.settings_post = (req, res, next) => {};

exports.search_get = (req, res, next) => {};

exports.search_get = (req, res, next) => {};
