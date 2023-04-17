var express = require("express");
const ProfileController = require("../controllers/profile.controller");
const auth = require("../middlewares/auth");
var router = express.Router();

router.get("/getProfile/:id", auth, ProfileController.getProfile);
router.patch("/updateProfile/:id", auth, ProfileController.updateProfile);

module.exports = router;
