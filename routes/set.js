var express = require('express');
var router = express.Router();
const video = require('../model/videoModel');
const answ = require('../model/answModel');
const user = require('../model/userModel');

router.get('/set/:id', function(req, res, next) {
  const id = req.params.id;
  const videoModel = require('../model/videoModel');
  // var video;
  var doc = videoModel.find({
    _id: id
  }, function(err, docs, cd) {
    if (err) {
      console.log(err)
    }
    const video = docs
    // console.log(video)
    res.render('set', {
      video: video
    })
  })
});

//处理问题
router.post('/ques/:id', function(req, res) {

  console.log(req.body);
  var newQ = req.body;

  const id = req.params.id;
  var kkk = video.find({
    _id: id
  }, function(err, docs) {
    if (err) {
      console.log(err)
    }
    console.log(docs)
  });

  kkk.update({
    question: newQ,
  }, function(err, doc) {
    if (err) {
      console.log(err);
    }

  })

  res.json('ok');
});
//ajax
router.post('/ajax/que/:id', function(req, res, next) {
  const id = req.params.id;
  var kkk = video.find({
    _id: id
  }, function(err, doc) {
    console.log(doc[0].question);
    res.json(doc[0].question)
  })

});

router.post('/ajax/anws/:id', function(req, res, next) {
  const id = req.params.id;
  console.log(id)
  // const d = 59115a409b37a426484a3020;

  // user.
  // find({
  //   name: id
  // }).
  // // populate('answ', 'answer').
  // exec(function(err, doc) {
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log(doc)
  //   res.json(doc)
  // })
  answ.
  find({
    'video': id,
  }).
  populate('user', 'name').
  exec(function(err, doc) {
    if (err) {
      console.log(err)
    }
    console.log(doc)
    res.json(doc)
  })
});

router.post('/ajax/pinfeng/:id', function(req, res, next) {
  // answ.findOne(id:)
  console.log(req.body);
  var pinfeng = req.body.pinfeng;
  console.log(pinfeng)
  const id = req.params.id;
  console.log(id);
  var kkk = answ.find({
    _id: id,
  }, function(err, doc) {
    console.log(doc);
  });

  kkk.update({
    result: pinfeng,
  }, function(err, doc) {
    if (err) {
      console.log(err);
    }

  })

  // kkk.update({
  //   result: pingfeng,
  // }, function(err, doc) {
  //   if (err) {
  //     console.log(err)
  //   }
  // });
  res.json('ok')

});
module.exports = router;
