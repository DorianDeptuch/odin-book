const express = require("express");
const app = express();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.login_get = (req, res, next) => {};

exports.statusUpdate_post = (req, res, next) => {};

exports.postComment_post = (req, res, next) => {};

exports.profile_get = (req, res, next) => {
  User.findById(req.params.id)
    .populate("firstName")
    .populate("lastName")
    .populate("email");
};

exports.profileDetailsForm_put = [
  body("hometown").trim().escape(),
  body("currentTown").trim().escape(),
  body("bio").trim().escape(),
  body("employment").trim().escape(),
  body("school").trim().escape(),
  body("hobbies").trim().escape(),
  body("dateOfBirth").trim().escape(),
  body("maritalStatus").trim().escape(),
  body("sex").trim().escape(),

  (req, res, next) => {
    const {
      hometown,
      currentTown,
      bio,
      employment,
      school,
      hobbies,
      dateOfBirth,
      maritalStatus,
      sex,
    } = req.body;
    let errors = [];
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      errors.push({
        msg: "There seems to be an error with one of the fields, please check again.",
      });
    } else {
      let user = new User({
        hometown,
        currentTown,
        bio,
        employment,
        school,
        hobbies,
        dateOfBirth,
        maritalStatus,
        sex,
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
