var express = require("express");
var router = express.Router();
const settingsController = require("../controllers/settingsController");
const indexController = require("../controllers/indexController");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", indexController.settings_get);

router.post(
  "/settingsProfilePicForm",
  // ensureAuthenticated,
  settingsController.settingsProfilePicForm_put
);

router.post(
  "/changePasswordForm",
  // ensureAuthenticated,
  settingsController.changePasswordForm_put
);

router.post(
  "/deleteAccountForm",
  // ensureAuthenticated,
  settingsController.deleteAccountForm_delete
);

module.exports = router;
