const mongoose = require('mongoose');
const userSchema = require('../schema/user');
const user = mongoose.model('user', userSchema);

module.exports = user;
