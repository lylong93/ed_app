const mongoose = require('mongoose');
const schema = mongoose.Schema;

var answer = new schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video'
  },
  result: {
    type: Number,
    default: -1,
  },
  answer: {
    type: Object,
    default: {}
  },
}, {
  toObject: {
    retainKeyOrder: true,
  }
})

module.exports = answer;
