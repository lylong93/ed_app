const express = require('express');
const router = express.Router();
const answModel = require('../model/answModel');
var app = express();

router.post('/answ/:id', function(req, res) {

  var newUser = req.session.user._id
  var anws = req.body.anws;
  var answ = new answModel({
    user: newUser,
    video: req.params.id,
    answer: anws,
  })
  answ.save({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    // console.log(doc)
  })
  res.json('ok');
})

module.exports = router;
