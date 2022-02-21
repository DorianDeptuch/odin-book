var express = require("express");
var router = express.Router();
const settingsController = require("../controllers/settingsController");

router.get("/:id", settingsController.settings_get);

router.post(
  "/:id/settingsProfilePicForm",
  settingsController.settingsProfilePicForm_put
);

router.post(
  "/:id/changePasswordForm",
  settingsController.changePasswordForm_put
);

router.post(
  "/:id/deleteAccountForm",
  settingsController.deleteAccountForm_delete
);

module.exports = router;
