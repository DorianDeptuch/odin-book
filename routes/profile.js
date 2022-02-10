var express = require("express");
var router = express.Router();
const profileController = require("../controllers/profileController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ msg: "this is a profile" });
});

router.post("/statusUpdateForm", profileController.statusUpdate_post);

router.post("/postCommentForm", profileController.postComment_post);

module.exports = router;
