const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const schema = mongoose.Schema;

var user = new schema({
  name: {
    type: String,
    unique: true,
  },
  password: String,
  answ: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'answ'
  },
  meta: {
    time: {
      type: Date,
      default: Date.now(),
    }
  }
})

user.pre('save', function(next) {
  var that = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log(err)
    }
    bcrypt.hash(that.password, salt, function(err, hash) {
      if (err) {
        console.log(err)
      }
      that.password = hash;
      next();
    })
  })
});
//实例方法
user.methods.checkUser = function(password, cd) {
  bcrypt.compare(password, this.password, function(err, isHave) {
    cd(isHave)
  })
}

module.exports = user;
