var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel');
var app = express();

/* GET home page. */
//登录
router.post('/user/singin', function (req, res) {
  var user = req.body;
  var password = user.password;
  var a = userModel.findOne({
    name: user.name
  }, function (err, doc) {
    if(err) {
      console.log(err);
    }
    if(doc) {
      doc.checkUser(password, function (isHave) {
        if(isHave === true) {
          req.session.user = doc;
          res.redirect('/home');
        }
      });
    } else {
      res.redirect('/');
    }
  });
});
//注册
router.post('/user/singup', function (req, res) {
  var user = req.body;
  var newUser = new userModel({
    name: user.name,
    password: user.password,
  })
  newUser.save(function (err, doc) {
    if(err) {
      console.log(err)
    }
    console.log(doc)
    res.redirect('/');
  });
})
//退出
router.get('/user/singout', function (req, res) {
  console.log(req.session.user);
  delete req.session.user;
  delete app.locals.user;
  res.redirect('/');
})
//删除
router.get('/user/delet/:id', function (req, res) {
  var id = req.params.id
  userModel.remove({
    _id: id
  }, function (err, docs) {
    if(err) {
      console.log(err)
    }
    console.log('ok')
  })
  res.redirect('/admin/user');
})

module.exports = router;
