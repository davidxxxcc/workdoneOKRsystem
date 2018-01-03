// ----------------- Module require -----------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Module loading
var app = express();
// ---------------------------------------------------

// ----------------- Data Base -----------------
var mysql = require('mysql');
var mysql_local = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  dateStrings: true,
  database: 'okr_system_02',
  port: 3306
});
var mysql_cloud = mysql.createConnection({
  host: '35.194.154.136',
  user: 'root',
  password: 'okrssysrootpwd',
  dateStrings: true,
  database: 'test_okr_CMoney'
});
var db_con = mysql_cloud;
// --- 


//session
var session = require('express-session');
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 60 * 1000 }//ms
}));
// app.get('/', function (req, res) {
//   if(req.session.isVisit) {
//     req.session.isVisit++;
//     res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
//   } else {
//     req.session.isVisit = 1;
//     res.send('欢迎第一次来这里');
//   }
// });


// mysql error
db_con.connect(function (err) {
  if (err) {
    console.log('#-- Error: ./app.js: con_sql connnect fail.');
    console.log(err);
    return;
  }
  console.log('# ./app.js: con_sql connnect success.');
})

// db state
app.use(function (req, res, next) {
  req.db_con = db_con;
  next();
});
// ---------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ----------------- Router -----------------
// router setting
// -- declare
var mainRoutes = require('./routes/mainRoutes');
var routes_login = require('./routes/routes_login');
var routes_profile = require('./routes/routes_profile');
var routes_othersProfile = require('./routes/routes_othersProfile');
var routes_othersOKRs = require('./routes/routes_othersOKRs');
var routes_search = require('./routes/routes_search');
var routes_personalSetting = require('./routes/routes_personalSetting');
// -- use
app.use('/', mainRoutes);
app.use('/login', routes_login);
app.use('/profile', routes_profile);
app.use('/othersProfile', routes_othersProfile);
app.use('/othersOKRs', routes_othersOKRs);
app.use('/search', routes_search);
app.use('/personalSetting', routes_personalSetting);
// ---------------------------------------------------

// ----------------- Error -----------------
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
// ---------------------------------------------------

// ----------------- Module export -----------------
module.exports = app;
// ---------------------------------------------------
