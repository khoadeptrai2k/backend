const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserGroupSchema = new Schema(
  {
    name: {
      type: String,
      length: 255,
      required: true,
    },

    staffs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: [],
      },
    ],

    masters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserGroup', UserGroupSchema, 'usergroups');
