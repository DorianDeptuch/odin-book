const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("cookie-session");
const passport = require("passport");
const mongoDB = process.env.MONGODB_URI;

const indexRouter = require("./routes/index");
const profileRouter = require("./routes/profile");

const app = express();
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
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
      maxAge: 1000 * 60 * 60 * 24 * 14, //expires in 14 days
    },
  })
);

app.use("/", indexRouter);
app.use("/profile", profileRouter);

module.exports = app;
