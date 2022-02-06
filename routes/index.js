var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res, next) => {
  res.json({ msg: "This is the login page GET" });
});

router.post("/login", indexController.login_post);

// (req, res, next) => {
//   // res.json({ msg: "This is the login page POST" });

//   next();
// });

router.get("/signup", (req, res, next) => {
  res.json({ msg: "This is the signup page GET" });
});

router.post("/signup", (req, res, next) => {
  res.json({ msg: "This is the signup page POST" });
});
module.exports = router;
