var express = require("express");
var router = express.Router();
const settingsController = require("../controllers/settingsController");
const indexController = require("../controllers/indexController");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", indexController.settings_get);

router.post(
  "/settingsProfilePicForm",
  // ensureAuthenticated,
  indexController.settingsProfilePicForm_put
);

router.post(
  "/changePasswordForm",
  // ensureAuthenticated,
  indexController.changePasswordForm_put
);

router.post(
  "/deleteAccountForm",
  // ensureAuthenticated,
  indexController.deleteAccountForm_delete
);

module.exports = router;
