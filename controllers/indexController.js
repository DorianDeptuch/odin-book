const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

exports.index_get = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send("You are authenticated, welcome to the homepage");
  } else {
    //    /login-failure
    res.redirect("/login");
  }
};

exports.index_post = (req, res, next) => {};

exports.login_get = (req, res, next) => {
  res.send("Welcome to login");
};
exports.logout_get = (req, res, next) => {
  // req.logout();
  res.redirect("/login");
};

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

exports.statusUpdate_post = [
  body("content", "There is no content to submit")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    // if (req.isAuthenticated()) {
    let { content, author } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (!content) {
      errors.push({ msg: "Please enter a message to submit" });
    }

    if (errors.length > 0) {
      res.json({ errors });
    } else {
      const newPost = new Post({
        content: content,
        author: author,
      });
      newPost
        .save()
        // .then((user) => res.redirect("/"));
        .then((post) => {
          Post.find().exec(function (err, list_posts) {
            if (err) {
              return next(err);
            }
            res.json({
              // user: req.user,
              error: err,
              post_list: list_posts,
            });
          });
        })
        .catch((err) => console.log(err));
    }
    // } else {
    //   //    /login-failure
    //   res.redirect("/login");
    // }
  },
];

exports.postComment_post = [
  body("content", "There is no content to submit")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    // if (req.isAuthenticated()) {
    let { content, author } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (!content) {
      errors.push({ msg: "Please enter a comment to submit" });
    }

    if (errors.length > 0) {
      res.json({ errors });
    } else {
      const newComment = new Comment({
        content: content,
        author: author,
      });
      newComment
        .save()
        //not sure if needed or if it needs to be like postComment
        .then((user) => res.redirect("/"));
    }
    // } else {
    //   //    /login-failure
    //   res.redirect("/login");
    // }
  },
];

exports.settings_get = (req, res, next) => {
  res.send("Coming soon");
};

exports.settings_post = (req, res, next) => {};

exports.search_get = (req, res, next) => {
  User.find({}, { firstName: 1, lastName: 1 }).then((results) =>
    res.json({ results })
  );
};

exports.search_post = (req, res, next) => {};
