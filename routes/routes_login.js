var express = require('express');
var async = require('async');
var router = express.Router();

// ########## Routes ##########
// ----- Require Page: Login
router.get('/', function (req, res, next) {
    var now = new Date();
    console.log(now);
    new Date().toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '')     // delete the dot and everything after
    res.render('login', { title: 'Log-in page' });
});
// ----- Provide Data to Login Check
router.post('/pos_provData_loginCheck', function (req, res, next) {

    // from Client
    // var info = req.body.clientReqInfo;
    // var acc = req.body.account;
    // var pwd = req.body.password;
    // console.log('sdagagfggfgafgfg');

    // console.log('Date.now: ' + Date.now);
    // console.log('Date().getTime()' + Date().getTime());
    var acc = req.body.id;
    // console.log('acc: ' + acc);
    var pwd = req.body.pwd;

    // db query -----
    if (acc && pwd) {
        var filter = 'SELECT * FROM `employee` WHERE `Emp_Account` = ? AND `Password` = ?';
        /* 
         table: employee
         column: Emp_Account (PK), 員工帳號,         varchar(30)
                 Password,         密碼,             varchar(30)
                 Act_Permission,   帳號權限,         int(5)
                 Emp_Name,         員工名稱,         varchar(15)
                 Act_Setting,      帳號偏好設定,      text
                 Act_AnotherData,  帳號雜項,         text
                 Company (FK),     隸屬公司(Cmp_ID), varchar(15)
                 Department (FK),  隸屬部門(Dpm_id), varchar(15)
         */

        // json package
        var jsonPkg = {
            jp_status: 0,
            jp_msg: ''
        };

        req.db_con.query(filter, [acc, pwd], function (err, rows) {
            if (err) {
                // console.log('#-- Error: ./routes/mainRoutes.js: .post /loginCheck: db.query: error.');
                console.log(err);
                // jsonPkg.jp_status = 503;
                // jsonPkg.jp_msg = '#-- Error: SQL Service Unavailable.';
                var errJSON = { error: err };
                res.status(503).json(errJSON);
                return;
            }
            if (JSON.stringify(rows) == "[]") {
                // account or password incorrect.
                console.log('#-- Error: ./routes/mainRoutes.js: .post /loginCheck: db.query: data dismatch.');
                // jsonPkg.jp_status = 401;
                // jsonPkg.jp_msg = '#-- Fail: data dismatch.';
                var errJSON = { error: err };
                res.status(401).json(errJSON);
                return;
            } else {
                // console.log('#-- Sucess: ./routes/mainRoutes.js: .post /loginCheck: db.query: login.');
                // console.log('req:/loginCheck rows: ' + JSON.stringify(rows));
                jsonPkg.jp_status = 200;
                jsonPkg.jp_msg = '#-- Sucess: Log-in. ';
                res.status(200);
                req.session.Emp_UUID = rows[0].Emp_UUID;

            }

            res.json(jsonPkg);
        });
    }
});

// ----- Require Page: Password Reset
router.get('/get_requPage_PWDReset', function (req, res, next) {
    res.send('Designning...');
});

// ----- Provide Data to Check user's identify on DBS
router.get('/pos_provData_IDFCheck', function (req, res, next) {
    res.send('Designning...');
});
// ############################

// ########## Module Exports ##########
module.exports = router;
// ####################################