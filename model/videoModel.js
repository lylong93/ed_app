const mongoose = require('mongoose');
const videoSchema = require('../schema/video');
const video = mongoose.model('video', videoSchema);

module.exports = video;
