const mongoose = require('mongoose');
const { Role } = require('../constants/enum');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      default: '',
    },

    phone: {
      type: String,
      default: '',
    },

    email: {
      type: String,
      unique: true,
      default: '',
    },

    password: {
      type: String,
      default: '',
    },

    slackId: {
      type: String,
      default: '',
    },

    avatar: {
      type: String,
      default: '',
    },

    groupsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usergroups',
        default: [],
      },
    ],

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.STAFF,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema, 'users');
