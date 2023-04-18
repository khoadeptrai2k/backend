var express = require("express");
const SlackController = require("../controllers/slack.controller");
var router = express.Router();

/* GET users listing. */
router.post("/sendConversationSlack", SlackController.sendConversation)

module.exports = router;
