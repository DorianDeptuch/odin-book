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
    const {
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
      res.send("login form");
      console.log(newEmail, firstName, lastName, newPassword, confirmPassword);
    } else {
      email = null;
      password = null;
      res.send("signup form");

      console.log(email, password);
    }
  },
];

exports.settings_get = (req, res, next) => {};

exports.settings_post = (req, res, next) => {};

exports.search_get = (req, res, next) => {};

exports.search_get = (req, res, next) => {};
