var express = require("express");
const UserController = require("../controllers/user.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post('/refresh_token', UserController.getRefreshToken)

module.exports = router;
