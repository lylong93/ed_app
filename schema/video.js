const mongoose = require('mongoose');
const schema = mongoose.Schema;

var video = new schema({
  image: String,
  play: String,
  describe: String,
  question: {
    type: Object,
    default: {}
  },
}, {
  toObject: {
    retainKeyOrder: true,
  }
})

module.exports = video;
