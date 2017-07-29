const express = require('express');
const router = express.Router();
const answModel = require('../model/answModel');
const videoModel = require('../model/videoModel');
const userModel = require('../model/userModel');
var app = express();

router.get('/userlist/:id', function(req, res) {
  var id = req.params.id
  userModel.find({}, function(err, doc) {
    if (err) {
      console.log(err)
    }
    var users = doc;
    res.render('userlist', {
      users: users,
      id: id,
    })
  })
})
router.get('/an/:id', function(req, res) {
  userModel.find({}, function(err, doc) {
    if (err) {
      console.log(err)
    }
    console.log(doc)
    var users = doc;
    res.render('userlist', {
      users: users,
    })
  })
})

module.exports = router;
