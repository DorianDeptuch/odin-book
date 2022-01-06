const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URI;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, 'client')));
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
