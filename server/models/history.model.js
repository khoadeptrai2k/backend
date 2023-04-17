const mongoose = require('mongoose');
const { TypeHistory } = require('../constants/enum');
const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    logOffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'requestlogoffs',
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },

    masters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: [],
      },
    ],

    approval: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: [],
      },
    ],

    logOffFrom: {
      type: String,
      default: '',
    },

    logOffTo: {
      type: String,
      default: '',
    },

    reason: {
      type: String,
      default: '',
    },

    comment: {
      type: String,
      default: '',
    },

    typeLog: {
      type: String,
      enum: Object.values(TypeHistory),
      default: '',
    },

    contentLog: {
      type: String,
      default: '',
    },

    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('History', HistorySchema, 'histories');
