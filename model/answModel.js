const mongoose = require('mongoose');
const answSchema = require('../schema/answ');
const answ = mongoose.model('answ', answSchema);

module.exports = answ;
