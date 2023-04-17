var express = require("express");
const auth = require("../middlewares/auth");
const authManager = require("../middlewares/manager");
const ManagerController = require("../controllers/manager.controller");
var router = express.Router();

/* GET users listing. */
router.get("/getUserGroup", auth, authManager, ManagerController.getUserGroups)
router.post("/createUserGroup", auth, authManager, ManagerController.createUserGroup)
router.patch("/updateUserGroup/:id", auth, authManager, ManagerController.updateUserGroup)
router.delete("/deleteUserGroup/:id", auth, authManager, ManagerController.deleteUserGroup)

module.exports = router;
