var express = require('express');
var async = require('async');
var router = express.Router();

function checkSession(request, response) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (!request.session.Emp_UUID) {
        // console.log('403.8 - 網站存取遭拒 - 登入逾期');
        // res.redirect(403.8, '/');
        response.status(403.8);
        return true;
    }
    return false;
}

router.get('/viewothers', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        // render the error page
        res.status(403);
        var errorTemp = {
            status: 403,
            stack: ''
        };
        res.render('error', { message: '403 - forbidden. 禁止使用', error: errorTemp });
        return;
    }
    res.render('viewothers');
});

router.get('/get_requData_viewOtherByDep',function (req, res, next){
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        // render the error page
        res.status(403);
        var errorTemp = {
            status: 403,
            stack: ''
        };
        res.render('error', { message: '403 - forbidden. 禁止使用', error: errorTemp });
        return;
    }
    
    var json_pkg = {
        viewOthers_depts:[]
    };
    //console.log("gogogo");
    var task = [
        //get companyID
        function(next){
            req.db_con.query('SELECT `Company` FROM `employee` WHERE `Emp_UUID` = ?',req.session.Emp_UUID,function(err,rows){
                var companyID = rows[0].Company;
                next(err,companyID);
            });
        },
        //get all department in this company
        function(companyID,next){
            req.db_con.query('SELECT * FROM `department` WHERE `Cmp_ID` = ? AND `Disable` = 0',companyID,function(err,rows){
                for(var i = 0; i < rows.length; i++){
                    var department = {
                        dept_ID:rows[i].Dpm_ID,
                        dept_name:rows[i].Dpm_Name,
                        people:[]
                    };
                    json_pkg.viewOthers_depts.push(department);
                };
                next(err,companyID);
            });
        },
        //get all people data for each department
        function(companyID,next){
            req.db_con.query('SELECT * FROM `employee` WHERE `Company` = ? AND `Disable` = 0',companyID,function(err,rows){
                for(var i = 0; i < rows.length; i++){
                    var people = {
                        person_userID: rows[i].Emp_UUID,
                        person_progress: rows[i].Avg_Progress,
                        person_userImg: rows[i].Img_URL,
                        person_userName: rows[i].Emp_Name,
                        person_position: rows[i].Position
                    };
                    for(var j = 0; j < json_pkg.viewOthers_depts.length; j++){
                        if(rows[i].Department == json_pkg.viewOthers_depts[j].dept_ID){
                            json_pkg.viewOthers_depts[j].people.push(people);
                            break;
                        }
                    }
                };
                next(err);
            });
        }
    ];
    async.waterfall(task,function(err){
        if(err){
            console.log(err);
            var errJSON = {error: err};
            res.status(500).json(errJSON);
        }else{
            // console.log('Done viewOtherByDep');
            // console.log(JSON.stringify(json_pkg));
            res.status(200).json(JSON.stringify(json_pkg));
        }
    });
});

router.get('/get_requData_viewOtherByRan',function(req, res, next){
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        // render the error page
        res.status(403);
        var errorTemp = {
            status: 403,
            stack: ''
        };
        res.render('error', { message: '403 - forbidden. 禁止使用', error: errorTemp });
        return;
    }
    
    var reqArr= [];
    var json_pkg = {
        Emp_UUID:"",
        viewOthers_random20:[]
    };
    task = [
        //get companyID
        function(next){
            req.db_con.query('SELECT `Company` FROM `employee` WHERE `Emp_UUID` = ? ',req.session.Emp_UUID,function(err,rows){
                var companyID = rows[0].Company;
                next(err,companyID);
            });
        },
        //get total number of employee
        function(companyID,next){
            req.db_con.query('SELECT COUNT(*) c FROM `employee` WHERE `Company` = ? AND `Disable` = "0"',companyID,function(err,rows){
                var empNumber = rows[0].c - 1;
                //get how many number
                var getNumber;
                if(empNumber >= 20){
                    getNumber = 20;
                }else{
                    getNumber = empNumber;
                }
                //儲存產生的陣列
                var rdmArray = [];
                for(var i = 0; i < getNumber; i++) {
                  var rdm = 0;//暫存的亂數
                  do {
                    var exist = false;//此亂數是否已存在
                    rdm = parseInt(Math.random()*empNumber);
                    //檢查亂數是否存在於陣列中，若存在則繼續回圈
                    if(rdmArray.indexOf(rdm) != -1) 
                        exist = true;
                  }while (exist);
                  rdmArray.push(rdm);
                }
                next(err,rdmArray,getNumber,companyID);
            });
        },
        //get empolyee data
        function(rdmArray,getNumber,companyID,next){
            req.db_con.query('SELECT * FROM `employee` WHERE `Company` = ? AND `Disable` = 0 AND `Emp_UUID` != ?',[companyID,req.session.Emp_UUID],function(err,rows){
                for(var i = 0;i < getNumber; i++){
                    var temp = {
                        person_userID: rows[rdmArray[i]].Emp_UUID,
                        person_progress: rows[rdmArray[i]].Avg_Progress,
                        person_userImg: rows[rdmArray[i]].Img_URL,
                        person_userName: rows[rdmArray[i]].Emp_Name,
                        person_position: rows[rdmArray[i]].Position
                    };
                    json_pkg.viewOthers_random20.push(temp);
                }
                next(err,rdmArray);
            });
        },
    ];
    async.waterfall(task,function(err,rdmArray){
        if(err){
            console.log(err);
            res.status(500);
        }else{
            // console.log('successful');
            req.session.randomArray = rdmArray;
            json_pkg.Emp_UUID = req.session.Emp_UUID;
            // console.log("randon json " + JSON.stringify(json_pkg));
            res.status(200).json(JSON.stringify(json_pkg));
        }
    });
});

router.get('/get_requData_viewOtherLoadMore',function(req,res,next){
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        // render the error page
        res.status(403);
        var errorTemp = {
            status: 403,
            stack: ''
        };
        res.render('error', { message: '403 - forbidden. 禁止使用', error: errorTemp });
        return;
    }
    
    var reqArr = [];
    var json_pkg = {
        viewOthers_loadMore:[]
    };

    if(req.session.randomArray){
        if(req.session.randomArray.length > 0 ){
            reqArr = req.session.randomArray;
        }else{
            reqArr= [];
        }
    }else{
        reqArr= [];
    }

    task = [
        //get companyID
        function(next){
            req.db_con.query('SELECT `Company` FROM `employee` WHERE `Emp_UUID` = ? ',req.session.Emp_UUID,function(err,rows){
                var companyID = rows[0].Company;
                next(err,companyID);
            });
        },
        //get total number of employee
        function(companyID,next){
            req.db_con.query('SELECT COUNT(*) c FROM `employee` WHERE `Company` = ? AND `Disable` = "0"',companyID,function(err,rows){
                var empNumber = rows[0].c;
                //get how many number
                var getNumber;
                if(empNumber - reqArr.length >= 20){
                    getNumber = 20;
                }else{
                    getNumber = empNumber - reqArr.length;
                }
                //儲存產生的陣列
                var rdmArray = [];
                if(getNumber != 0){
                    for(var i = 0;i < reqArr.length; i++){
                        rdmArray.push(reqArr[i]);
                    }
                    for(var i = 0; i < getNumber; i++) {
                      var rdm = 0;//暫存的亂數
                      do {
                        var exist = false;//此亂數是否已存在
                        rdm = parseInt(Math.random()*empNumber);
                        //檢查亂數是否存在於陣列中，若存在則繼續回圈
                        if(rdmArray.indexOf(rdm) != -1) 
                            exist = true;
                      }while (exist);
                      rdmArray.push(rdm);
                    }
                }
                next(err,rdmArray,getNumber,companyID);
            });
        },
        //get empolyee data
        function(rdmArray,getNumber,companyID,next){
            req.db_con.query('SELECT * FROM `employee` WHERE `Company` = ? AND `Disable` = 0',companyID,function(err,rows){
                for(var i = 0;i < getNumber; i++){
                    var temp = {
                        person_userID: rows[rdmArray[reqArr.length+i]].Emp_UUID,
                        person_progress: rows[rdmArray[reqArr.length+i]].Avg_Progress,
                        person_userImg: rows[rdmArray[reqArr.length+i]].Img_URL,
                        person_userName: rows[rdmArray[reqArr.length+i]].Emp_Name,
                        person_position: rows[rdmArray[reqArr.length+i]].Position
                    };
                    json_pkg.viewOthers_loadMore.push(temp);
                }
                next(err,rdmArray);
            });
        },
    ];
    async.waterfall(task,function(err,rdmArray){
        if(err){
            console.log(err);
            res.status(500);
        }else{
            // console.log('successful');
            if(rdmArray.length != 0){
                req.session.randomArray = rdmArray;
            }
            res.status(200).json(JSON.stringify(json_pkg));
        }
    });
});

router.get('/get_requData_viewOtherByRec',function(req,res,next){
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        // render the error page
        res.status(403);
        var errorTemp = {
            status: 403,
            stack: ''
        };
        res.render('error', { message: '403 - forbidden. 禁止使用', error: errorTemp });
        return;
    }

    var json_pkg = {
        viewOthers_recent:[]
    };
    // console.log('start recent');

    
    var tasks = [
        //get recent view ID
        function(next){
            req.db_con.query("SELECT `Rec_Emp_UUID` ,MAX(`CreatTime`) FROM `recent` WHERE `Emp_UUID` = ? GROUP by `Rec_Emp_UUID` ORDER BY MAX(`CreatTime`) Asc LIMIT 20",req.session.Emp_UUID,function(err,rows){
                var recentID = [];
                for(var i = rows.length - 1;i >= 0; i--){
                    recentID.push(rows[i]);
                }
                // console.log("recentID : " + recentID);
                next(err,recentID);
            });        
        },
        function(recentID,next){
            async.forEachSeries(recentID, function (n1, callBack){
                req.db_con.query('SELECT * FROM `employee` WHERE `Emp_UUID` = ?',n1.Rec_Emp_UUID,function(err,rows){
                    // console.log("ID : " + JSON.stringify(n1));
                    var people = {
                        person_userID: rows[0].Emp_UUID,
                        person_progress: rows[0].Avg_Progress,
                        person_userImg: rows[0].Img_URL,
                        person_userName: rows[0].Emp_Name,
                        person_position: rows[0].Position
                    };
                    json_pkg.viewOthers_recent.push(people);
                    callBack(err);
                });
                
            },function(err){
                next(err);
            });
        }
    ];
    async.waterfall(tasks,function(err){
        if (err) {
            console.log(err);
            var errJSON = { error: err };
            res.status(503).json(errJSON);
        } else {
            // console.log('recent success!');
            // console.log(JSON.stringify(json_pkg));
            res.status(200).json(JSON.stringify(json_pkg));
        }
    });
});


// ########## Module Exports ##########
module.exports = router;
// ####################################