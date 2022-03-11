var express = require("express");
var router = express.Router();
const settingsController = require("../controllers/settingsController");
const { ensureAuthenticated } = require("../config/auth");

router.get("/:id", settingsController.settings_get);

router.post(
  "/:id/settingsProfilePicForm",
  ensureAuthenticated,
  settingsController.settingsProfilePicForm_put
);

router.post(
  "/:id/changePasswordForm",
  ensureAuthenticated,
  settingsController.changePasswordForm_put
);

router.post(
  "/:id/deleteAccountForm",
  ensureAuthenticated,
  settingsController.deleteAccountForm_delete
);

module.exports = router;
