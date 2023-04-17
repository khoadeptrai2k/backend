var express = require("express");
const AdminController = require("../controllers/admin.controller");
const authAdmin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
var router = express.Router();

/* GET users listing. */
router.get("/getWorkspace", auth, authAdmin, AdminController.getWorkSpaces)
router.post("/createWorkspace", auth, authAdmin, AdminController.createWorkSpace)
router.patch("/updateWorkspace/:id", auth, authAdmin, AdminController.updateWorkSpace)
router.delete("/deleteWorkspace/:id", auth, authAdmin, AdminController.deleteWorkSpace)

module.exports = router;
