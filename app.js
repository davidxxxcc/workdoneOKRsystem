// ----------------- Module require -----------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
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
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// ---------------------------------------------------

schedule.scheduleJob('0 0 0 1 1,4,7,10 *', function () {
  var str = GetSeason();
  var year, season;
  if (str.substring(5) > 3) {
    year = str.substring(0, 3) + 1;
    season = '1';
  } else {
    year = str.substring(0, 3);
    season = str.substring(5) + 1;
  }
  var now = new Date();

  var seasonID = 'C001^p^' + year + 'Q' + season;
  var seasonName = year + season;
  var startDay = startDate();
  var endDay = endDate();

  db_con.query('INSERT INTO `season` (`Ses_ID`, `Cmp_ID`, `Ses_Name`, `Start_Day`, `End_Day`, `Disable`) VALUE (?, ?, ?, ?, ?, ?)', [seasonID, 'C001', seasonName, startDay, endDay, 0], function (err, rows) {
    console.log('insert into season!');
    if (err) {
      console.log("err: " + err);
    } else {
      console.log('add season success!');
    }
  });
});


// ----------------- Module export -----------------
module.exports = app;
//exports.db_con = db_con;
// ---------------------------------------------------
//Return season format ex: "201703"
function GetSeason() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var season;

  if (month <= 3) {
    season = "01";
  } else if (month > 3 && month <= 6) {
    season = "02";
  } else if (month > 6 && month <= 9) {
    season = "03";
  } else if (month > 9 && month <= 12) {
    season = "04";
  }
  var str = year + season;
  return str;
}
function startDate() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (date < 10) {
    date = '0' + date;
  }
  return year + '-' + month + '-' + date;
};
function endDate() {
  var now = startDate();
  if (now.substring(5, 9) == '01-01') {
    return now.substring(0, 4) + '-' + '03-31';
  } else if (now.substring(5, 9) == '04-01') {
    return now.substring(0, 4) + '-' + '06-30';
  } else if (now.substring(5, 9) == '07-01') {
    return now.substring(0, 4) + '-' + '09-30';
  } else {
    return now.substring(0, 4) + '-' + '12-31';
  }
};