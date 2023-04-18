const axios = require("axios");

const SlackController = {
  sendConversation: async (req, res) => {
    try {
      await axios.post(
        "https://hooks.slack.com/services/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",
        { 
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `Name: *${req.body.name}*\n\n Message: *${req.body.message}*`
              }
            }
          ]
        }
      );
      res.send({ msg: `Name: *${req.body.name}*\n\n Message: *${req.body.message}*` });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = SlackController;
