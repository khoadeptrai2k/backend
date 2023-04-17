const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slackId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Channel', ChannelSchema, 'channels');
