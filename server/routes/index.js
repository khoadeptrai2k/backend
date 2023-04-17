var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/user", require("./user.route"));
router.use("/admin", require("./admin.route"));
router.use("/manager", require("./manager.route"));
router.use("/profile", require("./profile.route"));

module.exports = router;
