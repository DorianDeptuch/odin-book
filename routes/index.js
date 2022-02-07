var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
  res.send("this is the index page");
});

router.get("/login", (req, res, next) => {
  res.json({ msg: "This is the login page GET" });
});

router.get("/youdidit", (req, res, next) => {
  res.send("You did it!");
});

// router.post("/login", indexController.login_post);
router.post("/loginForm", indexController.login_post);
router.post("/signupForm", indexController.signup_post);

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
