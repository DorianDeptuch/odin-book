var express = require("express");
var router = express.Router();
const profileController = require("../controllers/profileController");

/* GET users listing. */
router.get("/:id", function (req, res, next) {
  res.json({ msg: `this is profile id: ${req.params.id}` });
});

router.post("/statusUpdateForm", profileController.statusUpdate_post);

router.post("/postCommentForm", profileController.postComment_post);

module.exports = router;
