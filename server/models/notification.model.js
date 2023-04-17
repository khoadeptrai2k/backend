const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },

    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },

    logOff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'requestlogoffs',
    },

    description: {
      type: String,
      default: '',
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'workspaces',
    },

    isSeen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Notification',
  NotificationSchema,
  'notifications'
);
