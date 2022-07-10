var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");
const { ensureAuthenticated } = require("../config/auth");

router.get(
  "/",
  //  ensureAuthenticated,
  indexController.index_get
);

router.get("/login", indexController.login_get);

router.get(
  "/logout",
  //  ensureAuthenticated,
  indexController.logout_get
);

router.post("/loginForm", indexController.login_post);

router.post("/loginExampleUser", indexController.loginExampleUser_post);

router.post("/signupForm", indexController.signup_post);

router.get("/uploadImage", indexController.uploadImage);

router.post(
  "/statusUpdateForm",
  // ensureAuthenticated,
  indexController.statusUpdate_post
);

router.post(
  "/postCommentForm",
  // ensureAuthenticated,
  indexController.postComment_post
);

router.get(
  "/search",
  //  ensureAuthenticated,
  indexController.search_get
);

router.post(
  "/removeAllNotifications",
  indexController.removeAllNotifications_delete
);

// router.get("/youdidit", (req, res, next) => {
//   res.send("You did it!");
// });

// router.get("/somethingsnotright", (req, res, next) => {
//   res.send("Something's not right!");
// });

module.exports = router;
