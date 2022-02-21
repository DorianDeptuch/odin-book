var express = require("express");
var router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.index_get);

router.get("/login", (req, res, next) => {
  res.json({ msg: "This is the login page GET" });
});

router.get("/logout", indexController.logout_get);

router.post("/loginForm", indexController.login_post);

router.post("/signupForm", indexController.signup_post);

router.post("/statusUpdateForm", indexController.statusUpdate_post);

router.post("/postCommentForm", indexController.postComment_post);

router.get("/settings/:id", indexController.settings_get);

router.post(
  "/settings/:id/settingsProfilePicForm",
  // "/settingsProfilePicForm",
  indexController.settingsProfilePicForm_put
);

router.post(
  "/settings/:id/changePasswordForm",
  // "/changePasswordForm",
  indexController.changePasswordForm_put
);

router.post(
  "/settings/:id/deleteAccountForm",
  // "/deleteAccountForm",
  indexController.deleteAccountForm_delete
);

// router.post("/settings", indexController.settings_post);

router.get("/search", indexController.search_get);

// router.post("/search", indexController.search_post);

router.get("/youdidit", (req, res, next) => {
  res.send("You did it!");
});

// router.get("/somethingsnotright", (req, res, next) => {
//   res.send("Something's not right!");
// });

module.exports = router;
