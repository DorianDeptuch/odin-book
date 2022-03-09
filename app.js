const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const mongoDB = process.env.MONGODB_URI;

const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");
const settingsRouter = require("./routes/settings");

const app = express();
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'client')));
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // store: sessionStore,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1, //expires in 1 day
    },
  })
);

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);
app.use("/profile", profileRouter);
app.use("/settings", settingsRouter);

// moved the static folder from below cookie parser so passports
// successRedirect would link to the correct index page, not index.html
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
