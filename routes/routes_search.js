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
router.get('/get_requPage_searchResults', function (req, res, next) {
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
    res.render('searchResults', { keywords : req.query.keywords , depOnly : req.query.depOnly}); 
});

router.get('/get_requData_searchResult',function(req, res, next){
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
    
    var json_pkg_search = {
        isEmpty:true,
        keyword: req.query.keywords,
        departments:[],
        staff:[],
        objectives:[]
    };
    // console.log('start search!');
    var parameter = "%" + req.query.keywords + "%";
    var depOnly = req.query.depOnly;
    // console.log("depOnly : " + depOnly);
    // console.log("parameter : " + parameter);
    //var parameter = '%張%豪%';
    var tasks = [
        //find companyID
        function(next){
            req.db_con.query('SELECT `Company` FROM `employee` WHERE `Emp_UUID` = ?',req.session.Emp_UUID,function(err,rows){
                var cmp_ID = rows[0].Company;
                next(err,cmp_ID);
            });
        },
        //find department
        function(cmp_ID,next){
            req.db_con.query('SELECT * FROM `department` WHERE  LOWER(`Dpm_Name`) LIKE LOWER(?) AND `Cmp_ID` = ? AND `Disable` = 0',[parameter,cmp_ID],function(err,rows){
                for(var i = 0;i < rows.length; i++){
                    var dep = {
                        dep_ID : rows[i].Dpm_ID,
                        dep_name : rows[i].Dpm_Name,
                        people:[]
                    };
                    json_pkg_search.departments.push(dep);
                }
                next(err,cmp_ID);
            });
        },
        //get all people in department
        function(cmp_ID,next){
            if(json_pkg_search.departments.length == 0 ){
                next(null,cmp_ID);
            }else{
                var depPersonMap = {};
                var query = 'SELECT * FROM `employee` WHERE `Department` IN (';
                for(var i = 0; i < json_pkg_search.departments.length; i++){
                    if(i == json_pkg_search.departments.length - 1){
                        query +="'" + json_pkg_search.departments[i].dep_ID +"'";
                    }else{
                        query +="'" + json_pkg_search.departments[i].dep_ID +"',";
                    }
                    depPersonMap[json_pkg_search.departments[i].dep_ID] = [];
                }
                query += ') AND `Disable` = 0';
                req.db_con.query(query,function(err,rows){
                    for(var i = 0; i < rows.length; i++){
                        if(rows[i].Emp_UUID == req.session.Emp_UUID){
                            var url = '/profile';
                        }else{
                            var url = "/othersOKRs/get_requPage_viewOtherOKRs/?others_UUID=" + rows[i].Emp_UUID;
                        }
                        var tempPerson = {
                            person_URL : url,
                            person_userID : rows[i].Emp_UUID,
                            person_progress : rows[i].Avg_Progress,
                            person_userImg : rows[i].Img_URL,
                            person_userName : rows[i].Emp_Name,
                            person_position : rows[i].Position
                        };
                        depPersonMap[rows[i].Department].push(tempPerson);
                    }
                    for(var i = 0; i < json_pkg_search.departments.length; i++){
                        json_pkg_search.departments[i].people = depPersonMap[json_pkg_search.departments[i].dep_ID];
                    }
                    // console.log("dep all people done! \n" + JSON.stringify(json_pkg_search));
                    next(err,cmp_ID);
                });
            }
        },
        //find match people
        function(cmp_ID,next){
            if(depOnly == 1){
                next(null,'');
            }else{
                req.db_con.query('SELECT * FROM `employee` WHERE LOWER(`Emp_Name`) LIKE LOWER(?) AND `Company` = ? And `Disable` = 0',[parameter,cmp_ID],function(err,rows){
                    for(var i = 0;i < rows.length; i++){
                        if(rows[i].Emp_UUID == req.session.Emp_UUID){
                            var url = '/profile';
                        }else{
                            var url = "/othersOKRs/get_requPage_viewOtherOKRs/?others_UUID=" + rows[i].Emp_UUID;
                        }
                        var person = {
                            person_URL: url,
                            person_userID : rows[i].Emp_UUID,
                            person_progress:rows[i].Avg_Progress,
                            person_userImg : rows[i].Img_URL,
                            person_userName : rows[i].Emp_Name,
                            person_position : rows[i].Position,
                        };
                        json_pkg_search.staff.push(person);
                    }
                    var companyID = '%^p^'+cmp_ID+'^p^%';
                    next(err,companyID);
                });
            }
        },
        //find match objective
        function(companyID,next){
            if(depOnly == 1){
                next(null);
            }else{
                req.db_con.query('SELECT * FROM `objective` WHERE LOWER(`Obj_Text`) LIKE LOWER(?) AND `Obj_ID` LIKE ? AND `Disable` = 0',[parameter,companyID],function(err,rows){
                    for(var i = 0;i < rows.length; i++){
                        if(rows[i].Emp_UUID == req.session.Emp_UUID){
                            var url = '/profile';
                        }else{
                            var url = "/othersOKRs/get_requPage_viewOtherOKRs/?others_UUID=" + rows[i].Emp_UUID;
                        }
                        var obj = {
                            obj_URL:url,
                            userImg : "",
                            obj_text : rows[i].Obj_Text,
                            userID : rows[i].Emp_UUID,
                            userName : "",
                            obj_season : "",
                            seasonID: rows[i].Ses_ID,    
                        };
                        json_pkg_search.objectives.push(obj);
                    }
                    next(err);
                });
            }
        },
        //get season name
        function(next){
            if(json_pkg_search.objectives.length == 0){
                next(null);
            }else{
                var query = "SELECT * FROM `season` WHERE `Ses_ID` IN (";
                for(var i = 0; i < json_pkg_search.objectives.length; i++){
                    if( i == json_pkg_search.objectives.length - 1){
                        query +="'" + json_pkg_search.objectives[i].seasonID + "'";
                    }else{
                        query +="'" + json_pkg_search.objectives[i].seasonID + "',";
                    }
                }
                query += ") AND `Disable` = 0";
                req.db_con.query(query,function(err,rows){
                    var map = {};
                    for(var i = 0;i < rows.length; i++){
                        map[rows[i].Ses_ID] = rows[i].Ses_Name;
                    }
                    for(var i = 0;i < json_pkg_search.objectives.length; i++){
                        json_pkg_search.objectives[i].obj_season = map[json_pkg_search.objectives[i].seasonID];
                    }
                    next(err);
                });
            }
        },
        //get objective data from employee
        function(next){
            if(json_pkg_search.objectives.length == 0){
                next(null);
            }else{
                var query = 'SELECT * FROM `employee` WHERE `Emp_UUID` IN (';
                for(var i = 0; i < json_pkg_search.objectives.length; i++){
                    if( i == json_pkg_search.objectives.length-1){
                        query += "'" + json_pkg_search.objectives[i].userID + "'";
                    }else{
                        query += "'" + json_pkg_search.objectives[i].userID + "',";
                    }
                }
                query += ") AND `Disable` = 0";
                req.db_con.query(query,function(err,rows){
                    var nameMap = {};
                    var imgMap = {};
                    for(var i = 0; i < rows.length; i++){
                        nameMap[rows[i].Emp_UUID] = rows[i].Emp_Name;
                        imgMap[rows[i].Emp_UUID] = rows[i].Img_URL;
                    }
                    for(var i = 0;i < json_pkg_search.objectives.length; i++){
                        json_pkg_search.objectives[i].userName = nameMap[json_pkg_search.objectives[i].userID];
                        json_pkg_search.objectives[i].userImg = imgMap[json_pkg_search.objectives[i].userID];
                    }
                    next(err);
                });
            }
        }
    ];

    async.waterfall(tasks,function(err){
        if(err){
            console.log('search fail! \n' + err);
            console.log(JSON.stringify(json_pkg_search));
            res.status(500).json({});
        }else{
            if(json_pkg_search.departments.length == 0 && json_pkg_search.objectives.length == 0 && json_pkg_search.staff.length == 0){
                json_pkg_search.isEmpty = true;
            }else{
                json_pkg_search.isEmpty = false;
            }
            console.log('search success!');
            console.log(JSON.stringify(json_pkg_search));
            res.status(200).json(JSON.stringify(json_pkg_search));
        }
    });
});

// ########## Module Exports ##########
module.exports = router;
// ####################################