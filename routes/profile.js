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
  indexController.profileDetailsForm_put
);

router.post(
  "/:id/poke",
  // ensureAuthenticated,
  indexController.notification_poke_post
);

router.post(
  "/:id/friendRequest",
  // ensureAuthenticated,
  indexController.friendRequest_post
);
router.post(
  "/:id/friendRequestAccept",
  // ensureAuthenticated,
  indexController.friendRequest_accept_post
);
router.post(
  "/:id/friendRequestDeny",
  // ensureAuthenticated,
  indexController.friendRequest_deny_post
);

router.post(
  "/:id/likePost",
  //ensureAuthentiacted,
  indexController.likePost_post
);

router.post(
  "/:id/unlikePost",
  //ensureAuthentiacted,
  indexController.unlikePost_post
);

router.post(
  "/:id/likeComment",
  //ensureAuthentiacted,
  indexController.likeComment_post
);

router.post(
  "/:id/unlikeComment",
  //ensureAuthentiacted,
  indexController.unlikeComment_post
);

module.exports = router;
