const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const videoModel = require('../model/videoModel');
const userModel = require('../model/userModel');

var storage = multer.diskStorage({
  destination: function (req, file, cd) {
    // console.log(file)
    cd(null, './files')
  },
  filename: function (req, file, cd) {
    cd(null, file.originalname)
  }
})
var upload = multer({
  storage: storage
});
//管理主页
router.get('/admin', (req, res) => {
  res.render('admin', {});
});
//视频上传页
router.get('/admin/adminup', (req, res) => {
  // console.log()
  fs.readFileSync('./views/adminup.pug', {
    encoding: 'utf8'
  });
  res.render('adminup');
})
//更新处理
router.post('/admin/up', upload.fields([{
  name: 'image'
}, {
  name: 'play'
}]), (req, res, next) => {
  var files = req.files;
  const image = files.image[0].filename;
  const play = files.play[0].path;
  const describe = req.body.describe;
  // res.send(files)
  const video = new videoModel({
    image: image,
    play: play,
    describe: describe,
  })
  video.save((err, doc) => {
    if(err) {
      console.log(err)
    }
    // res.send('l')
    // console.log(doc)
  });
  res.redirect('/admin/list');
})
//删除
router.get('/admin/delet/:id', (req, res) => {
  // console.log(req.params.id)
  // var video = new videoModel();
  var id = req.params.id
  console.log(id)
  videoModel.remove({
    _id: id
  }, function (err, docs) {
    if(err) {
      console.log(err)
    }
    // console.log('ok')
  })
  res.redirect('/admin/list');
})
//list页
router.get('/admin/list', (req, res) => {
  videoModel
    .find()
    .exec((err, doc) => {
      const videos = doc;
      // console.log(videos);
      // res.send('ll')
      res.render('list', {
        videos: videos
        // console.log('kk')
      })
    })
})
//用户页
router.get('/admin/user', (req, res) => {
  userModel.find({}, function (err, doc) {
    if(err) {
      console.log(err)
    }
    var users = doc;
    res.render('user', {
      users: users,
    })
  })
})

module.exports = router;
