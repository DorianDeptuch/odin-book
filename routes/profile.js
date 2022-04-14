var express = require("express");
var router = express.Router();
// const profileController = require("../controllers/profileController");
const indexController = require("../controllers/indexController");
const profileController = require("../controllers/profileController");
const { ensureAuthenticated } = require("../config/auth");

/* GET users listing. */
router.get(
  "/:id",
  // ensureAuthenticated,
  // profileController.profile_get
  indexController.profile_get
);

router.post(
  "/:id/statusUpdateForm",
  // ensureAuthenticated,
  indexController.statusUpdate_post
);

router.post(
  "/:id/postCommentForm",
  // ensureAuthenticated,
  indexController.postComment_post
);

router.post(
  "/:id/profileDetailsForm",
  // ensureAuthenticated,
  profileController.profileDetailsForm_put
);

router.post(
  "/:id/poke",
  // ensureAuthenticated,
  indexController.notification_poke_post
);

module.exports = router;
