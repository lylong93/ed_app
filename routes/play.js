var express = require('express');
var router = express.Router();
const answModel = require('../model/answModel');
const videoModel = require('../model/videoModel');
router.get('/play/:id', function(req, res, next) {
  //
  var num = false;
  const id = req.params.id;
  //
  var doc = videoModel.find({
    _id: id
  }, function(err, docs, cd) {
    if (err) {
      console.log(err)
    }
    var video = docs;
    answModel.
    find({
      'video': id,
    }).
    populate('user', 'name').
    exec(function(err, doc) {
      if (err) {
        console.log(err)
      }
      var haveansw = false;
      var num = doc.forEach(function(value, index) {
        var _user = value.user.name;
        var answ = value.answer;
        if (_user === req.session.user.name && answ.length > 0) {
          console.log('ok')
          haveansw = true;
          return false;
        };
      });
      res.render('play', {
        video: video,
        ishave: haveansw,
      })
    });

  })

});

module.exports = router;
