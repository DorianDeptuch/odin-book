const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

// ███████╗███████╗████████╗████████╗██╗███╗   ██╗ ██████╗ ███████╗
// ██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║████╗  ██║██╔════╝ ██╔════╝
// ███████╗█████╗     ██║      ██║   ██║██╔██╗ ██║██║  ███╗███████╗
// ╚════██║██╔══╝     ██║      ██║   ██║██║╚██╗██║██║   ██║╚════██║
// ███████║███████╗   ██║      ██║   ██║██║ ╚████║╚██████╔╝███████║
// ╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝

exports.settings_get = (req, res, next) => {
  // res.send("Coming soon");
  console.log(app.locals.user);
  // console.log(req.app.locals);
  // res.json({ user: req.app.locals });
  res.json({ user: app.locals.user });
  // User.findById(user.id).then((results) => res.json({ results }));
};

exports.settingsProfilePicForm_put = [
  body("profilePicture", "Please submit a valid URL")
    .trim()
    .isLength({ min: 1 }),
  // .escape(),

  (req, res, next) => {
    const { profilePicture } = req.body;
    let errors = [];
    const validationErrors = validationResult(req);
    console.log(req.body);
    if (!validationErrors.isEmpty()) {
      errors.push({
        msg: "There seems to be an error with one of the fields, please check again.",
      });
    } else {
      console.log("in new user");
      let user = new User({
        profilePicture,
        _id: app.locals.user.id,
      });
      User.findByIdAndUpdate(
        app.locals.user.id,
        user,
        {},
        function (err, newuser) {
          if (err) {
            return next(err);
          }
          res.json({
            user: req.user,
            // success_msg: "You have updated your profile!",
          });
        }
      );
    }
  },
];

exports.changePasswordForm_put = [
  body("changePasswordForm_Old", "Please enter your current password")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("changePasswordForm_New", "Please enter a new password")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  (req, res, next) => {
    const { changePasswordForm_Old, changePasswordForm_New } = req.body;
    let errors = [];
    const validationErrors = validationResult(req);

    if (!changePasswordForm_Old || !changePasswordForm_New) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (!validationErrors.isEmpty()) {
      errors.push({ msg: "Validation Failed." });
    } else {
      User.findById(app.locals.user.id)
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That User is not registered",
            });
          }
          bcrypt.compare(
            changePasswordForm_Old,
            user.password,
            (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                bcrypt.genSalt(10, (err, salt) =>
                  bcrypt.hash(changePasswordForm_New, salt, (err, hash) => {
                    if (err) throw err;

                    const newUser = new User({
                      password: hash,
                      _id: app.locals.user.id,
                    });

                    User.findByIdAndUpdate(
                      app.locals.user.id,
                      newUser,
                      {},
                      function (err, updated) {
                        if (err) {
                          return next(err);
                        }
                        // res.redirect("/settings/" + req.params.id);
                        res.json({ user: updated });
                      }
                    );
                  })
                );
              }
            }
          );
        })
        .catch((err) => console.log(err));
    }
  },
];

exports.deleteAccountForm_delete = [
  body("deleteAccountForm").trim().escape(),

  (req, res, next) => {
    const { deleteAccountForm } = req.body;
    let errors = [];
    const validationErrors = validationResult(req);

    User.findById(app.locals.user.id).then((user) => {
      if (!validationErrors.isEmpty()) {
        errors.push({
          msg: "There seems to be an error with one of the fields, please check again.",
        });
      } else if (
        deleteAccountForm.toLowerCase() === user.fullName.toLowerCase()
      ) {
        User.findByIdAndRemove(app.locals.user.id, function deleteUser(err) {
          if (err) {
            return next(err);
          }
          res.redirect("/login");
        });
      } else {
        res.send("Something went wrong");
      }
    });
  },
];

// ██╗███╗   ██╗██████╗ ███████╗██╗  ██╗
// ██║████╗  ██║██╔══██╗██╔════╝╚██╗██╔╝
// ██║██╔██╗ ██║██║  ██║█████╗   ╚███╔╝
// ██║██║╚██╗██║██║  ██║██╔══╝   ██╔██╗
// ██║██║ ╚████║██████╔╝███████╗██╔╝ ██╗
// ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝

exports.index_get = (req, res, next) => {
  console.log("<<<<<<<<<INDEX_GET>>>>>>>>>>");
  console.log("req.user: " + req.user);
  console.log("req.session: " + JSON.stringify(req.session));
  res.json({ user: app.locals.user });

  // if (req.isAuthenticated()) {
  //   console.log("AUTHENTICATED:");
  //   console.log(req.isAuthenticated());
  //   // res.send("You are authenticated, welcome to the homepage");
  //   res.json({ user: req.user });
  // } else {
  //   //    /login-failure
  //   console.log("AUTHENTICATED:");
  //   console.log(req.isAuthenticated());

  //   res.redirect("/login");
  // }
};

exports.index_post = (req, res, next) => {};

exports.login_get = (req, res, next) => {
  //if (req.isAuthenticated()) {
  //user is already logged in
  // res.redirect("/")
  // } else {
  //continue
  // }
  res.send("Welcome to login");
};

exports.logout_get = (req, res, next) => {
  req.logout();
  app.locals.user = null;
  // res.redirect("/login");
  res.json({ msg: "Logging out..." });
};

exports.login_post = [
  body("email", "Please enter an email").trim().isLength({ min: 6 }).escape(),
  body("password", "Please enter a password")
    .trim()
    .isLength({ min: 6 })
    .escape(),

  (req, res, next) => {
    console.log(req.body);
    let { email, password } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (!email || !password) {
      errors.push({ msg: "Please fill in all fields" });
    }

    if (!validationErrors.isEmpty()) {
      errors.push({ msg: "Validation failed" });
    }

    // passport.authenticate("local", {
    //   successRedirect: "/",
    //   failureRedirect: "/login",
    //   // failureFlash: true,
    //   errors,
    // })(req, res, next);
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      } //error exception

      // user will be set to false, if not authenticated
      if (!user) {
        res.status(401).json(info); //info contains the error message
      } else {
        // if user authenticated maintain the session
        req.login(user, function () {
          // do whatever here on successful login
          // console.log(req.user);
          app.locals.user = user;
          // req.app.locals.user = user;
          // console.log(app.locals.user);
          res.status(200).json({ reqUser: req.user, user: user });
        });
      }
    })(req, res, next);
  },
];

exports.signup_post = [
  body("newEmail", "Please enter an email")
    .isEmail()
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("firstName", "Please enter your first name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastName", "Please enter your last name")
    .trim()
    .isLength({ min: 1 })
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
      newEmail,
      firstName,
      lastName,
      newPassword,
      confirmPassword,
      dateOfBirth,
      sex,
    } = req.body;
    let errors = [];
    let validationErrors = validationResult(req);

    if (
      !newEmail ||
      !newPassword ||
      !confirmPassword ||
      !firstName ||
      !lastName
    ) {
      errors.push({ msg: "Please fill in all required(*) fields" });
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
            email: newEmail.toLowerCase(),
            password: newPassword,
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
            dateOfBirth,
            sex,
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

exports.search_get = (req, res, next) => {
  User.find({}, { firstName: 1, lastName: 1, profilePicture: 1 }).then(
    (results) => res.json({ results })
  );
};
