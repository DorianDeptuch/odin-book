var express = require("express");
var router = express.Router();
// const profileController = require("../controllers/profileController");
const indexController = require("../controllers/indexController");

/* GET users listing. */
router.get("/:id", function (req, res, next) {
  res.json({ msg: `this is profile id: ${req.params.id}` });
});

router.post("/:id/statusUpdateForm", indexController.statusUpdate_post);

router.post("/:id/postCommentForm", indexController.postComment_post);

module.exports = router;
