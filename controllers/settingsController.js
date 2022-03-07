const bcrypt = require("bcrypt");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.settings_get = (req, res, next) => {
  // res.send("Coming soon");
  User.find().then((results) => res.json({ results }));
};

exports.settingsProfilePicForm_put = [
  body("settingsProfilePicForm", "Please submit a valid URL")
    .trim()
    .isLength({ min: 1 }),
  // .escape(),
  (req, res, next) => {
    const { settingsProfilePicForm } = req.body;
    let errors = [];
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      errors.push({
        msg: "There seems to be an error with one of the fields, please check again.",
      });
    } else {
      let user = new User({
        profilePicture: settingsProfilePicForm,
        _id: req.params.id,
      });
      User.findByIdAndUpdate(req.params.id, user, {}, function (err, newuser) {
        if (err) {
          return next(err);
        }
        res.json({
          user: req.user,
          // success_msg: "You have updated your profile!",
        });
      });
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
      User.findById(req.params.id)
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
                      _id: req.params.id,
                    });

                    User.findByIdAndUpdate(
                      req.params.id,
                      newUser,
                      {},
                      function (err, updated) {
                        if (err) {
                          return next(err);
                        }
                        res.redirect("/settings/" + req.params.id);
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

    User.findById(req.params.id).then((user) => {
      if (!validationErrors.isEmpty()) {
        errors.push({
          msg: "There seems to be an error with one of the fields, please check again.",
        });
      } else if (
        deleteAccountForm.toLowerCase() === user.fullName.toLowerCase()
      ) {
        User.findByIdAndRemove(req.params.id, function deleteUser(err) {
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
