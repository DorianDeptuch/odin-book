const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      (username, password, done) => {
        User.findOne({ email: username })
          .then((user) => {
            console.log(user);
            if (!user) {
              return done(null, false, {
                message: "That User is not registered",
              });
            }
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              console.log("password: ", password);
              console.log("user password: ", user.password);

              if (isMatch) {
                return done(null, user);
              } else done(null, false, { message: "Password is incorrect" });
            });
          })
          .catch((err) => {
            console.log(err);
            done(err);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
