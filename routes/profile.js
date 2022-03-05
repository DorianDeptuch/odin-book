var express = require("express");
var router = express.Router();
// const profileController = require("../controllers/profileController");
const indexController = require("../controllers/indexController");
const profileController = require("../controllers/profileController");

/* GET users listing. */
router.get("/:id", profileController.profile_get);

router.post("/:id/statusUpdateForm", indexController.statusUpdate_post);

router.post("/:id/postCommentForm", indexController.postComment_post);

router.post(
  "/:id/profileDetailsForm",
  profileController.profileDetailsForm_put
);

module.exports = router;
