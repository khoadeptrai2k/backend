const mongoose = require('mongoose');

const WorkSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    hrChannel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channels',
        default: [],
      },
    ],

    dayOffChannel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'channels',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('WorkSpace', WorkSpaceSchema, 'workspaces');
