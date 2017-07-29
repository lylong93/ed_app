var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
//数据库连接
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ed_app');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('mongodb is run')
});


var index = require('./routes/index');
var sign = require('./routes/sign');
var user = require('./routes/user');
const admin = require('./routes/admin');
const play = require('./routes/play');
const set = require('./routes/set');
const answ = require('./routes/answ');
const userlist = require('./routes/userlist')


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'io',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({
    url: 'mongodb://127.0.0.1:27017/ed_app',
  })
}))
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  // sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname)));

app.use(index);
app.use(sign);
app.use(user);
app.use(admin);
app.use(play);
app.use(set);
app.use(answ);
app.use(userlist);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
