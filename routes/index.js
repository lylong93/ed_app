var express = require('express');
var router = express.Router();
var app = express();
var videoModel = require('../model/videoModel');

//起始
router.get('/', function (req, res, next) {
  res.render('index', {});
});
//主页
router.get('/home', function (req, res, next) {

  user = req.session.user;
  app.locals.user = user;
  videoModel.find({}, function (err, doc) {
    if(err) {
      console.log(err);
    }
    res.render('home', {
      videos: doc,
    })
  })
});
module.exports = router;
