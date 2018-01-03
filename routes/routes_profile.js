var express = require('express');
var async = require('async');
var router = express.Router();

// ########## Function ##########
// ---
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
// ########## Routes ##########
// ----- Require Page: Profile
router.get('/', function (req, res, next) {

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
    var nowSeason;
    if (req.query.season) {
        //season given by FE
        nowSeason = req.query.season;
    } else {
        // if season not given
        // load DBS season
        nowSeason = GetSeason();
    }
    // console.log('Session: \n' + JSON.stringify(req.session));
    res.render('profile', { season: nowSeason });
});

// --- Require Data: Notification
router.get('/get_requData_notification', function (req, res, next) {

    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }

    var json_pkg = {
        notifications: []
    }
    if (req.query.test) {
        var newTime = JSON.parse(req.query.test).noti_time;
        var querySentence = 'SELECT * FROM `notification` WHERE `Disable` = 0 AND `Emp_UUID` = ? AND `CreatTime` > ? ORDER BY `CreatTime` DESC';
        var parameterNoti = [req.session.Emp_UUID, newTime];
    } else {
        var querySentence = 'SELECT * FROM `notification` WHERE `Disable` = 0 AND `Emp_UUID` = ? ORDER BY `CreatTime` DESC';
        var parameterNoti = req.session.Emp_UUID;
    }


    req.db_con.query(querySentence, parameterNoti, function (err, rows) {
        for (var i = 0; i < rows.length; i++) {
            var noti = {
                noti_user_id: rows[i].Emp_UUID,
                noti_ID: rows[i].NF_ID,
                noti_user_img: rows[i].Img_URL,
                noti_user_name: rows[i].Emp_Name,
                noti_obj_id: rows[i].Obj_ID,
                noti_text: rows[i].NF_Text,
                noti_time: rows[i].CreatTime,
                noti_link: rows[i].NF_Link,
                noti_isRead: rows[i].Is_Read
            };
            json_pkg.notifications.push(noti);
        }
        if (err) {
            var errJSON = { error: err };
            res.status(503).json(errJSON);
        } else {
            res.json(JSON.stringify(json_pkg));
        }
    });
});

// --- Require Data: ProfileData
router.get('/get_requData_profileData', function (req, res, next) {

    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }

    var json_pkg = {
        profile: {
            profile_user_img: "",
            profile_user_name: "",
            profile_user_position: "",
            profile_user_id: "",
            disable: "",
            seasons: []
        }
    };

    // -- task
    var tasks = [
        // -- get profile data
        function (next) {
            req.db_con.query('SELECT * FROM `employee` WHERE `Emp_UUID` = ?', req.session.Emp_UUID, function (err, rows) {

                json_pkg.profile.profile_user_img = rows[0].Img_URL;
                json_pkg.profile.profile_user_name = rows[0].Emp_Name;
                json_pkg.profile.profile_user_position = rows[0].Position;
                json_pkg.profile.profile_user_id = rows[0].Emp_UUID;
                json_pkg.profile.disable = rows[0].Disable;
                // console.log("already get profile");
                next(err, rows[0].Ses_ID, rows[0].Company);
            });
        },
        // -- get season
        function (SeasonID, Cmp_ID, next) {
            req.db_con.query('SELECT * FROM `season` WHERE `Cmp_ID` = ? ORDER BY `Ses_Name` DESC', Cmp_ID, function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    if (SeasonID <= rows[i].Ses_ID) {
                        json_pkg.profile.seasons.push(rows[i].Ses_Name)
                    }
                };
                //console.log(JSON.stringify(json_pkg)+"seasonseasonseasonseasonseasonseason");
                // console.log("already get season----------------------------");
                next(err);
            })
        }
    ];

    // -- async.waterfall
    async.waterfall(tasks, function (err) {
        //json_pkg.OKRs.push(okr);
        if (err) {
            console.log(err);
            var errJSON = { error: err };
            res.status(503).json(errJSON);
            return;
        }

        // console.log('--------------------------------- Profile ---------------------------------');
        // console.log(JSON.stringify(json_pkg) + "\n --already get profile");
        // console.log('------------------------------------------------------------------');
        res.json(JSON.stringify(json_pkg));
    });
});

// --- Require Data: OKR
router.get('/get_requData_OKRs', function (req, res, next) {

    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }


    // Ses_ID need get from Front-End
    // console.log("req.query.test" + JSON.parse(req.query.test).objectives);
    var seasonName = JSON.parse(req.query.test).objectives.season;//'201701'
    // console.log("seasonName : " + seasonName);
    // json
    var json_pkg = {
        objectives: [],
        season: seasonName
    };
    // console.log("json_pkg init done");

    // -- tasks
    var tasks = [
        //get Cmp_ID
        function (next) {
            req.db_con.query('SELECT `Company` FROM `employee` WHERE `Emp_UUID` = ?', req.session.Emp_UUID, function (err, rows) {
                var cmp_ID = rows[0].Company;
                next(err, cmp_ID);
            });
        },
        //get nowSeasonID
        function (cmp_ID, next) {
            req.db_con.query('SELECT `Ses_ID` FROM `season` WHERE `Cmp_ID` = ? AND `Ses_Name` = ?', [cmp_ID, seasonName], function (err, rows) {
                var nowSeasonID = rows[0].Ses_ID;
                // console.log("nowSeasonID : " + nowSeasonID);
                next(err, nowSeasonID);
            });
        },
        //get objective
        function (nowSeasonID, next) {
            if (JSON.parse(req.query.test).objectives.obj_ID) {
                if (JSON.parse(req.query.test).objectives.obj_ID != '') {
                    //get one objective
                    // console.log(JSON.parse(req.query.test));
                    var filter = '`Obj_ID` = ? AND `Disable` = 0 ORDER BY `CreatTime` DESC';
                    var temp = JSON.parse(req.query.test).objectives;
                    var parameterObj = temp.obj_ID;
                }
                else {
                    //get all
                    var filter = '`Emp_UUID` = ? AND `Ses_ID` = ? AND `Disable` = 0 ORDER BY `CreatTime` DESC';
                    var parameterObj = [req.session.Emp_UUID, nowSeasonID];
                }
            }
            else {
                // get all
                var filter = '`Emp_UUID` = ? AND `Ses_ID` = ? AND `Disable` = 0 ORDER BY `CreatTime` DESC';
                var parameterObj = [req.session.Emp_UUID, nowSeasonID];
            }

            req.db_con.query('SELECT * FROM `objective` WHERE ' + filter, parameterObj, function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    var okr = {
                        obj_ID: "",
                        obj_progress: "",
                        obj_text: "",
                        obj_likeNumber: "",
                        isLike: false,
                        obj_likeUsers: [],
                        keyResults: [],
                        comments: [],
                        activities: []
                    };
                    okr.obj_ID = rows[i].Obj_ID;
                    okr.obj_progress = rows[i].Reaching_Rate;
                    okr.obj_text = rows[i].Obj_Text;
                    json_pkg.objectives.push(okr);
                }
                //console.log(JSON.stringify(json_pkg) + "objectiveobjectiveobjectiveobjectiveobjective");
                next(err, nowSeasonID);
            });

        },
        //get obj_comments
        function (nowSeasonID, next) {
            if (JSON.parse(req.query.test).objectives.obj_ID) {
                if (JSON.parse(req.query.test).objectives.obj_ID != '') {
                    //get one objective's comments
                    var temp = JSON.parse(req.query.test).objectives;
                    var parameter = temp.obj_ID;
                }
                else {
                    //get all obj_comments in this season
                    var parameter = req.session.Emp_UUID + "^p^" + nowSeasonID + "%";
                }
            }
            else {
                // get all obj_comments in this season
                var parameter = req.session.Emp_UUID + "^p^" + nowSeasonID + "%";
            }
            req.db_con.query("SELECT * FROM `obj_comment` WHERE `Obj_ID` like ? AND `Disable` = 0 ORDER BY `CreatTime` ASC", parameter, function (err, rows) {
                //console.log("cccccccc"+JSON.stringify(rows) + "commendcommendcommendcommendcommend");
                for (var i = 0; i < rows.length; i++) {
                    var edit = false;
                    var url = "/othersOKRs/get_requPage_viewOtherOKRs/?others_UUID=" + rows[i].Emp_UUID;
                    if (rows[i].Emp_UUID == req.session.Emp_UUID) {
                        edit = true;
                        url = "/profile";
                    }
                    var comment = {
                        cmt_userID: rows[i].Emp_UUID,
                        cmt_ID: rows[i].Obj_Com_ID,
                        cmt_userImg: rows[i].Img_URL,
                        cmt_userName: rows[i].Emp_Name,
                        cmt_time: rows[i].CreatTime,
                        cmt_text: rows[i].Com_Text,
                        edit: edit,
                        delete: true,
                        url: url
                    }
                    for (var j = 0; j < json_pkg.objectives.length; j++) {
                        if (json_pkg.objectives[j].obj_ID == rows[i].Obj_ID) {
                            json_pkg.objectives[j].comments.push(comment);
                        }
                    }
                }
                //console.log(JSON.stringify(json_pkg) + "already get comments");
                next(err, nowSeasonID, parameter);
            });

        },

        //get keyresult
        function (nowSeasonID, parameter, next) {
            req.db_con.query("SELECT * FROM `key_result` WHERE `Obj_ID` like ? AND `Disable` = 0 ORDER BY `CreatTime` DESC", parameter, function (err, rows) {
                //console.log(JSON.stringify(rows) + "krrowkrrowkrrowkrrowkrrowkrrowkrrowkrrowkrrow");
                for (var i = 0; i < rows.length; i++) {
                    var kr = {
                        kr_ID: rows[i].KR_ID,
                        kr_progress: rows[i].KR_Progress,
                        kr_text: rows[i].KR_Text
                    }
                    for (var j = 0; j < json_pkg.objectives.length; j++) {
                        if (json_pkg.objectives[j].obj_ID == rows[i].Obj_ID) {
                            json_pkg.objectives[j].keyResults.push(kr);
                        }
                    }
                }
                //console.log(JSON.stringify(json_pkg) + "already get KR");
                next(err, nowSeasonID, parameter);
            });
        },
        //get like users
        function (nowSeasonID, parameter, next) {
            req.db_con.query("SELECT * FROM `act_like` WHERE `Obj_ID` like ? AND `Disable` = 0", parameter, function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    var likeUsers = {
                        like_userID: rows[i].Emp_UUID,
                        like_userImg: rows[i].Img_URL,
                        like_userName: rows[i].Emp_Name
                    };
                    for (var j = 0; j < json_pkg.objectives.length; j++) {
                        if (json_pkg.objectives[j].obj_ID == rows[i].Obj_ID) {
                            json_pkg.objectives[j].obj_likeUsers.push(likeUsers);
                            if (likeUsers.like_userID == req.session.Emp_UUID) {
                                json_pkg.objectives[j].isLike = true;
                            }
                        }
                    }
                };
                for (var k = 0; k < json_pkg.objectives.length; k++) {
                    json_pkg.objectives[k].obj_likeNumber = json_pkg.objectives[k].obj_likeUsers.length;
                };
                next(err, nowSeasonID, parameter);
            });
        },
        //get activity
        function (nowSeasonID, parameter, next) {
            req.db_con.query("SELECT * FROM `activity` WHERE `Obj_ID` like ? AND `Disable` = 0 ORDER BY `Atv_Time` DESC", parameter, function (err, rows) {
                //console.log(JSON.stringify(rows) + "``````````````````````````````````````````");
                for (var i = 0; i < rows.length; i++) {
                    var act = {
                        act_time: rows[i].Atv_Time,
                        act_text: rows[i].Atv_Text
                    };
                    for (var j = 0; j < json_pkg.objectives.length; j++) {
                        if (json_pkg.objectives[j].obj_ID == rows[i].Obj_ID) {
                            json_pkg.objectives[j].activities.push(act);
                        }
                    }
                };
                //console.log(JSON.stringify(json_pkg) + "already get activity!");
                next(err);
            });
        }
    ];

    // -- async.waterfall
    async.waterfall(tasks, function (err, results) {
        if (err) {
            console.log(err);
            // req.db_con.rollback(); // 發生錯誤 rollback?
            var errJSON = { error: err };
            res.status(503).json(errJSON);
            return;
        }
        // console.log('--------------------------------- OKRs ---------------------------------');
        // console.log(JSON.stringify(json_pkg) + "\n --already get OKRs!");
        // console.log('------------------------------------------------------------------');
        // req.db_con.end();
        // console.log("get OKR : \n" + JSON.stringify(json_pkg));
        res.json(JSON.stringify(json_pkg));
    });
});

// --- Provide Data to add a Objective
router.post('/get_provData_addOBJ', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }
    // console.log('start add obj!');
    var json_pkg_AddObjective = JSON.parse(req.body.test);
    var companyID, seasonID;
    var tasks = [
        //get companyID
        function (next) {
            req.db_con.query('SELECT `Company` FROM `employee` WHERE `Emp_UUID` = ?', json_pkg_AddObjective.AddObjective[0].user_ID, function (err, rows) {
                companyID = rows[0].Company;
                // console.log(companyID + "get companyID");
                next(err, companyID);
            });
        },
        //get seasonID
        function (companyID, next) {
            req.db_con.query('SELECT `Ses_ID` FROM `season` WHERE `Cmp_ID` = ? AND `Ses_Name` = ?', [companyID, json_pkg_AddObjective.AddObjective[0].obj_season], function (err, rows) {
                // console.log(JSON.stringify(rows) + "get seasonID");
                seasonID = rows[0].Ses_ID;
                // console.log(seasonID + " seasonID");
                next(err, seasonID);
            });
        },
        //get objNumber in this season
        function (seasonID, next) {
            req.db_con.query('SELECT COUNT(*) c FROM `objective` WHERE `Emp_UUID` = ? AND `Ses_ID` = ?', [json_pkg_AddObjective.AddObjective[0].user_ID, seasonID], function (err, rows) {
                var objNumber = rows[0].c;
                // console.log(objNumber + " objNumber");
                next(err, seasonID, objNumber);
            });
        },
        //add objective
        function (seasonID, objNumber, next) {
            var obj_ID = json_pkg_AddObjective.AddObjective[0].user_ID + "^p^" + seasonID + "O" + objNumber;
            req.db_con.query('INSERT INTO `objective` (`Obj_ID`, `Emp_UUID`, `Ses_ID`, `Reaching_Rate`, `Obj_Text`, `His_Obj_Text`, `CreatTime`, `Disable`) VALUES (?, ?, ?, ?, ? , "" ,?, "0") ', [obj_ID, json_pkg_AddObjective.AddObjective[0].user_ID, seasonID, json_pkg_AddObjective.AddObjective[0].obj_progress, json_pkg_AddObjective.AddObjective[0].obj_text, json_pkg_AddObjective.AddObjective[0].activities[0].act_time], function (err, rows) {
                next(err, obj_ID, seasonID);
            });
        },
        //compute avgProgress
        function (obj_ID, seasonID, next) {
            if (GetSeason() == json_pkg_AddObjective.AddObjective[0].obj_season) {
                req.db_con.query('SELECT * FROM `objective` WHERE `Emp_UUID` = ? AND `Ses_ID` = ? AND `Disable` = 0', [req.session.Emp_UUID, seasonID], function (err, rows) {
                    var total = 0;
                    for (var i = 0; i < rows.length; i++) {
                        total += rows[i].Reaching_Rate;
                    }
                    if(rows.length == 0){
                        var avg_progress = 0;
                    }else{
                        var avg_progress = total / rows.length;
                    }
                    
                    // console.log("new avg : " + avg_progress);
                    next(err, obj_ID, avg_progress);
                });
            } else {
                next(null, obj_ID, 0);
            }
        },
        //update person avgProgress
        function (obj_ID, avg_progress, next) {
            if (json_pkg_AddObjective.AddObjective[0].obj_season == GetSeason()) {
                req.db_con.query('UPDATE `employee` SET `Avg_Progress` = ? WHERE `Emp_UUID` = ?', [avg_progress, req.session.Emp_UUID], function (err, rows) {
                    next(err, obj_ID);
                });
            } else {
                next(null, obj_ID);
            }

        }
    ];

    async.waterfall(tasks,
        // add activity
        function (err, obj_ID) {
            var atv_ID = obj_ID + "^p^A0";
            req.db_con.query('INSERT INTO `activity` (`Atv_ID`, `Obj_ID`, `Atv_Time`, `Atv_Text`, `Disable`) VALUES (?, ?, ?, ?, ?) ', [atv_ID, obj_ID, json_pkg_AddObjective.AddObjective[0].activities[0].act_time, json_pkg_AddObjective.AddObjective[0].activities[0].act_text, 0], function (err, rows) {
                if (err) {
                    console.log(err + "Add fail");
                    var errJSON = { error: err };
                    res.status(503).json(errJSON);
                }
                else {
                    // console.log("Add successful!");
                    //回傳jsaon
                    var back = {
                        objectives: {
                            obj_ID: obj_ID,
                            season: json_pkg_AddObjective.AddObjective[0].obj_season
                        }
                    };
                    res.status(200).json(JSON.stringify(back));
                };
            });
        });
});

// --- Provide Data to edit Objective
router.post('/pos_provData_editOBJ', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }

    var json_pkg_UpdateObjective = JSON.parse(req.body.test).UpdateObjective;
    // console.log("json_pkg_UpdateObjective : \n" + JSON.stringify(json_pkg_UpdateObjective));
    // var json_pkg_UpdateObjective = {
    //     obj_ID: "81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O5",
    //     obj_Text: "修改O",
    //     act_Text: "你修改了目標為「修改O」",
    //     obj_updateTime: "2017-12-07 18:14:12",
    // };
    var tasks = [
        function (next) {
            //get obj text
            req.db_con.query('SELECT `Obj_Text` FROM `objective` WHERE `Obj_ID` = ?', json_pkg_UpdateObjective.obj_ID, function (err, rows) {
                // console.log("his_Text: "+his_Text);
                var his_Text = rows[0].Obj_Text;
                next(err, his_Text);
            });
        },
        function (his_Text, next) {
            //update objective
            req.db_con.query("UPDATE `objective` SET `Obj_Text` = ?, `His_Obj_Text` = ? WHERE `Obj_ID` = ?", [json_pkg_UpdateObjective.obj_text, his_Text, json_pkg_UpdateObjective.obj_ID], function (err, rows) {
                // console.log("update objective :" + err);
                next(err);
            });
        },
        //get activity number
        function (next) {
            req.db_con.query('SELECT COUNT(*) c FROM `activity` WHERE `Obj_ID` = ?', [json_pkg_UpdateObjective.obj_ID], function (err, rows) {
                var atvNumber = rows[0].c;
                // console.log("atvNumber :" + atvNumber);
                next(err, atvNumber);
            });
        },
        //update activity
        function (atvNumber, next) {
            var atv_ID = json_pkg_UpdateObjective.obj_ID + "^p^A" + atvNumber;
            req.db_con.query('INSERT INTO `activity` (`Atv_ID`, `Obj_ID`, `Atv_Time`, `Atv_Text`, `Disable`) VALUES (?, ?, ?, ?, ?) ', [atv_ID, json_pkg_UpdateObjective.obj_ID, json_pkg_UpdateObjective.obj_updateTime, json_pkg_UpdateObjective.act_text, 0], function (err, rows) {
                // console.log("update activity : " + err);
                next(err);
            });
        }
    ];
    async.waterfall(tasks,
        function (err) {
            // console.log("end update obj");
            if (err) {
                console.log("Update failure : " + err);
                var errJSON = { error: err };
                res.status(503).json(errJSON);
            } else {
                // console.log("Update successful!");
                //send jason back
                res.status(200).json({});
            }
        });
    //UPDATE `objective` SET `Obj_Text` = '把okr系統後端解決~~~', `His_Obj_Text` = '把okr系統後端解決~' WHERE `objective`.`Obj_ID` = '81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O3';
});

// --- Require Action: Delete a Objective
router.post('/pos_requActi_deleOBJ', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }

    var json_pkg_DeleteObjective = JSON.parse(req.body.test).DeleteObjective;
    console.log(json_pkg_DeleteObjective);
    async.waterfall([
        //delete activity, key result, obj_comment, kr_comment, act_like,notification
        function (next) {
            req.db_con.query('UPDATE `activity` SET `Disable` = "1" WHERE `Obj_ID` = ?', json_pkg_DeleteObjective.obj_ID, function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('UPDATE `key_result` SET `Disable` = "1" WHERE `Obj_ID` = ?', json_pkg_DeleteObjective.obj_ID, function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('UPDATE `obj_comment` SET `Disable` = "1" WHERE `Obj_ID` = ?', json_pkg_DeleteObjective.obj_ID, function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('UPDATE `kr_comment` SET `Disable` = "1" WHERE `Obj_ID` = ?', json_pkg_DeleteObjective.obj_ID, function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('UPDATE `act_like` SET `Disable` = "1" WHERE `Obj_ID` = ?', json_pkg_DeleteObjective.obj_ID, function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('UPDATE `notification` SET `Disable` = "1" WHERE `Obj_ID` = ?', json_pkg_DeleteObjective.obj_ID, function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('UPDATE `objective` SET `Disable` = "1" WHERE `Obj_ID` = ?', json_pkg_DeleteObjective.obj_ID, function (err, rows) {
                next(err);
            });
        },
        //get delete obj'seasonID
        function (next) {
            req.db_con.query('SELECT `Ses_ID` FROM `objective` WHERE `Obj_ID` = ?', json_pkg_DeleteObjective.obj_ID, function (err, rows) {
                var seasonID = rows[0].Ses_ID;
                next(err, seasonID);
            });
        },
        function (seasonID, next) {
            if (json_pkg_DeleteObjective.season == GetSeason()) {
                req.db_con.query('SELECT * FROM `objective` WHERE `Emp_UUID` = ? AND `Ses_ID` = ? AND `Disable` = 0', [req.session.Emp_UUID, seasonID], function (err, rows) {
                    var total = 0;
                    for (var i = 0; i < rows.length; i++) {
                        total += rows[i].Reaching_Rate;
                    }
                    if(rows.length == 0){
                        var avg_progress = 0;
                    }else{
                        var avg_progress = total / rows.length;
                    }
                    // console.log("new avg : " + avg_progress);
                    next(err, avg_progress);
                });
            } else {
                next(null, 0);
            }
        },
        function (avg_progress, next) {
            if (json_pkg_DeleteObjective.season == GetSeason()) {
                req.db_con.query('UPDATE `employee` SET `Avg_Progress` = ? WHERE `Emp_UUID` = ?', [avg_progress, req.session.Emp_UUID], function (err, rows) {
                    next(err);
                });
            } else {
                next(null);
            }
        }
    ],
        //delete objective
        function (err) {
            if (err) {
                console.log(err + "Delete failure!")
                var errJSON = { error: err };
                res.status(503).json(errJSON);
            } else {
                // console.log("Delete successful!");
                res.status(200).json({});
            }
        });
});

// --- Provide Data to add a KR
router.post('/get_provData_addKR', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }

    // console.log(req.body.test);
    var json_pkg_AddKeyResult = JSON.parse(req.body.test).AddKeyResults;
    // console.log(json_pkg_AddKeyResult);

    var objectives = {
        kr_ID: [],
        season: ""
    };
    async.waterfall([
        //add key result
        function (next) {
            async.forEachSeries(json_pkg_AddKeyResult.keyResults, function (n1, callBack) {
                // console.log(n1);
                async.waterfall([
                    //get kr number
                    function (next) {
                        req.db_con.query('SELECT COUNT(*) c FROM `key_result` WHERE `Obj_ID` = ?', json_pkg_AddKeyResult.obj_ID, function (err, rows) {
                            var krNumber = rows[0].c;
                            // console.log('找到krNumber');
                            next(err, krNumber);
                        });
                    },
                    //add key result
                    function (krNumber, next) {
                        var kr_id = json_pkg_AddKeyResult.obj_ID + "^p^KR" + krNumber;
                        objectives.kr_ID.push(kr_id);
                        req.db_con.query('INSERT INTO `key_result` (`KR_ID`, `Obj_ID`, `Emp_UUID`, `KR_Progress`, `KR_Text`,`His_KR_Text`,`CreatTime`,`Disable`) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ', [kr_id, json_pkg_AddKeyResult.obj_ID, json_pkg_AddKeyResult.user_ID, 0, n1.kr_text, "", n1.act_time, 0], function (err, rows) {
                            // console.log('新增完kr');
                            next(err);
                        });
                    }
                ],
                    function (err) {
                        if (err) {
                            // console.log(err);
                            var errJSON = { error: err };
                            res.status(503).json(errJSON);
                        } else {
                            callBack();
                        }

                    });
            }, function () {
                next();
            });
        },
        //add activity
        function (next) {
            async.forEachSeries(json_pkg_AddKeyResult.activities, function (n1, callBack) {
                // console.log(n1);
                async.waterfall([
                    //get activity number
                    function (next) {
                        req.db_con.query('SELECT COUNT(*) c FROM `activity` WHERE `Obj_ID` = ?', json_pkg_AddKeyResult.obj_ID, function (err, rows) {
                            var actNumber = rows[0].c;
                            // console.log('找到krNumber');
                            next(err, actNumber);
                        });
                    },
                    //add activity
                    function (actNumber, next) {
                        var atv_ID = json_pkg_AddKeyResult.obj_ID + "^p^A" + actNumber;
                        req.db_con.query('INSERT INTO `activity` (`Atv_ID`, `Obj_ID`, `Atv_Time`, `Atv_Text`, `Disable`) VALUES (?, ?, ?, ?, ?) ', [atv_ID, json_pkg_AddKeyResult.obj_ID, n1.act_time, n1.act_text, 0], function (err, rows) {
                            // console.log('新增完activity');
                            next(err);
                        });
                    }
                ],
                    function (err) {
                        // console.log('add activity successful');
                        if (err) {
                            // console.log(err);
                            var errJSON = { error: err };
                            res.status(503).json(errJSON);
                        } else {
                            callBack();
                        }

                    });
            }, function () {
                next();
            });
        },
        //update obj_progress
        function (next) {
            req.db_con.query("UPDATE `objective` SET `Reaching_Rate` = ? WHERE `Obj_ID` = ?", [json_pkg_AddKeyResult.obj_progress, json_pkg_AddKeyResult.obj_ID], function (err, rows) {
                next(err);
            });
        },
        //get season id
        function (next) {
            req.db_con.query('SELECT `Ses_ID` FROM `objective` WHERE `Obj_ID` = ?', json_pkg_AddKeyResult.obj_ID, function (err, rows) {
                var ses_ID = rows[0].Ses_ID;
                next(err, ses_ID);
            });
        },
        //get season name
        function (ses_ID, next) {
            req.db_con.query('SELECT `Ses_Name` FROM `season` WHERE `Ses_ID` = ?', ses_ID, function (err, rows) {
                objectives.season = rows[0].Ses_Name;
                next(err, ses_ID);
            });
        },
        function (seasonID, next) {
            if (objectives.season == GetSeason()) {
                req.db_con.query('SELECT * FROM `objective` WHERE `Emp_UUID` = ? AND `Ses_ID` = ? AND `Disable` = 0', [req.session.Emp_UUID, seasonID], function (err, rows) {
                    var total = 0;
                    for (var i = 0; i < rows.length; i++) {
                        total += rows[i].Reaching_Rate;
                    }
                    var avg_progress = total / rows.length;
                    // console.log("add kr new avg : " + avg_progress);
                    next(err, avg_progress);
                });
            } else {
                next(null, 0);
            }
        },
        function (avg_progress, next) {
            if (objectives.season == GetSeason()) {
                req.db_con.query('UPDATE `employee` SET `Avg_Progress` = ? WHERE `Emp_UUID` = ?', [avg_progress, req.session.Emp_UUID], function (err, rows) {
                    next(err);
                });
            } else {
                next(null);
            }
        }
    ],
        function (err) {
            if (err) {
                console.log(err);
                var errJSON = { error: err };
                res.status(503).json(errJSON);
            } else {
                // console.log('compelete!' + JSON.stringify(krIDback));
                var back = {
                    objectives: objectives
                };
                res.status(200).json(JSON.stringify(back));
            }
        });
});

// --- Provide Data to edit KR Text
router.post('/pos_provData_editKRText', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }
    var UpdateKeyResultText = JSON.parse(req.body.test).UpdateKeyResultText;
    // console.log("UpdateKeyResultText : \n" + UpdateKeyResultText);
    // var UpdateKeyResultText = {
    //     kr_ID: "81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O2^p^KR0",
    //     kr_userID: "81c48152-d009-11e7-8c9e-a861ec7dace5",
    //     kr_text: "提升超級多業績",
    //     kr_time: "2017-12-06 13:21:19",
    //     obj_ID: "81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O2",
    //     act_text: "你更新了關鍵成果為`提升業績`"
    // }

    var tasks = [
        //get history key result text
        function (next) {
            req.db_con.query('SELECT `KR_Text` FROM `key_result` WHERE `KR_ID` = ?', UpdateKeyResultText.kr_ID, function (err, rows) {
                var his_Text = rows[0].KR_Text;
                next(err, his_Text);
            });
        },
        //update key result
        function (his_Text, next) {
            req.db_con.query("UPDATE `key_result` SET `KR_Text` = ?, `His_KR_Text` = ? WHERE `KR_ID` = ?", [UpdateKeyResultText.kr_text, his_Text, UpdateKeyResultText.kr_ID], function (err, rows) {
                next(err);
            });
        },
        //get activity number
        function (next) {
            req.db_con.query('SELECT COUNT(*) c FROM `activity` WHERE `Obj_ID` = ?', UpdateKeyResultText.obj_ID, function (err, rows) {
                var actNumber = rows[0].c;
                next(err, actNumber);
            });
        },
        //add activity
        function (actNumber, next) {
            var act_ID = UpdateKeyResultText.obj_ID + "^p^A" + actNumber;
            req.db_con.query('INSERT INTO `activity` (`Atv_ID`, `Obj_ID`, `Atv_Time`, `Atv_Text`, `Disable`) VALUES (?, ?, ?, ?, ?) ', [act_ID, UpdateKeyResultText.obj_ID, UpdateKeyResultText.kr_time, UpdateKeyResultText.act_text, 0], function (err, rows) {
                next(err);
            });
        }
    ];
    async.waterfall(tasks,
        function (err) {
            if (err) {
                console.log(err + " Update key result text failure");
                var errJSON = { error: err };
                res.status(503).json(errJSON);
            } else {
                // console.log("Update key result text successful!");
                res.status(200).json({});
            }
        });
});

// --- Provide Data to edit KR Progress
router.post('/pos_provData_editKRProgress', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }
    var UpdateKeyResultProgress = JSON.parse(req.body.test).UpdateKeyResultProgress;
    // console.log("UpdateKeyResultProgress : \n" + JSON.stringify(UpdateKeyResultProgress));
    // var UpdateKeyResultProgress = {
    //     kr_ID: "81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O2^p^KR0",
    //     kr_userID: "81c48152-d009-11e7-8c9e-a861ec7dace5",
    //     kr_progress: 33,
    //     kr_time: "2017-12-06 13:21:19",
    //     obj_ID: "81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O2",
    //     obj_progress: 15,
    //     act_text: "你更新了關鍵成果`提升業績`的進度"
    // }
    var tasks = [
        //update key result
        function (next) {
            req.db_con.query("UPDATE `key_result` SET `KR_Progress` = ? WHERE `KR_ID` = ?", [UpdateKeyResultProgress.kr_progress, UpdateKeyResultProgress.kr_ID], function (err, rows) {
                next(err);
            });
        },
        //update objective progress
        function (next) {
            req.db_con.query("UPDATE `objective` SET `Reaching_Rate` = ? WHERE `Obj_ID` = ?", [UpdateKeyResultProgress.obj_progress, UpdateKeyResultProgress.obj_ID], function (err, rows) {
                // console.log(err + "errerrerrerr");
                next(err);
            });
        },
        //get seasonID
        function (next) {
            req.db_con.query('SELECT `Ses_ID` FROM `objective` WHERE `Obj_ID` = ?', UpdateKeyResultProgress.obj_ID, function (err, rows) {
                var seasonID = rows[0].Ses_ID;
                next(err, seasonID);
            });
        },
        function (seasonID, next) {
            if (UpdateKeyResultProgress.season == GetSeason()) {
                req.db_con.query('SELECT * FROM `objective` WHERE `Emp_UUID` = ? AND `Ses_ID` = ? AND `Disable` = 0', [req.session.Emp_UUID, seasonID], function (err, rows) {
                    var total = 0;
                    for (var i = 0; i < rows.length; i++) {
                        total += rows[i].Reaching_Rate;
                    }
                    var avg_progress = total / rows.length;
                    // console.log("edit kr new avg : " + avg_progress);
                    next(err, avg_progress);
                });
            } else {
                next(null, 0);
            }
        },
        function (avg_progress, next) {
            if (UpdateKeyResultProgress.season == GetSeason()) {
                req.db_con.query('UPDATE `employee` SET `Avg_Progress` = ? WHERE `Emp_UUID` = ?', [avg_progress, req.session.Emp_UUID], function (err, rows) {
                    // console.log('avg_progress : ' + avg_progress + '\n' + err);
                    next(err);
                });
            } else {
                next(null);
            }
        },
        //get activity number
        function (next) {
            req.db_con.query('SELECT COUNT(*) c FROM `activity` WHERE `Obj_ID` = ?', UpdateKeyResultProgress.obj_ID, function (err, rows) {
                var actNumber = rows[0].c;
                next(err, actNumber);
            });
        },
        //add activity
        function (actNumber, next) {
            var act_ID = UpdateKeyResultProgress.obj_ID + "^p^A" + actNumber;
            req.db_con.query('INSERT INTO `activity` (`Atv_ID`, `Obj_ID`, `Atv_Time`, `Atv_Text`, `Disable`) VALUES (?, ?, ?, ?, ?) ', [act_ID, UpdateKeyResultProgress.obj_ID, UpdateKeyResultProgress.kr_time, UpdateKeyResultProgress.act_text, 0], function (err, rows) {
                next(err);
            });
        }
    ];

    async.waterfall(tasks,
        function (err) {
            if (err) {
                console.log(err + " Update key result progress failure");
                var errJSON = { error: err };
                res.status(503).json(errJSON);
            } else {
                // console.log("Update key result progress successful!");
                res.status(200).json({});
            }
        });
});

// --- Require Action: Delete a KR
router.post('/pos_requActi_deleKR', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }
    // console.log(JSON.stringify(req.body.test)+" req.body.test");
    var DeleteKeyResult = JSON.parse(req.body.test).DeleteKeyResult;
    // console.log(JSON.stringify(DeleteKeyResult) + " DeleteKeyResult");
    // var DeleteKeyResult = {
    //     obj_userID: "81c48152-d009-11e7-8c9e-a861ec7dace5",
    //     obj_ID: "81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O2",
    //     obj_progress: 20,
    //     kr_ID: "81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O2^p^KR3",
    //     act_text: "你刪除了關鍵目標`提升業績`",
    //     del_time: "2017-12-08 03:18:55"
    // };

    async.waterfall([
        //delete kr comment
        function (next) {
            next();
        },
        //delete key result
        function (next) {
            req.db_con.query('UPDATE `key_result` SET `Disable` = "1" WHERE `KR_ID` = ?', DeleteKeyResult.kr_ID, function (err, rows) {
                next(err);
            });
        },
        //update objective progress
        function (next) {
            req.db_con.query("UPDATE `objective` SET `Reaching_Rate` = ? WHERE `Obj_ID` = ?", [DeleteKeyResult.obj_progress, DeleteKeyResult.obj_ID], function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('SELECT `Ses_ID` FROM `objective` WHERE `Obj_ID` = ?', DeleteKeyResult.obj_ID, function (err, rows) {
                var seasonID = rows[0].Ses_ID;
                next(err, seasonID);
            });
        },
        function (seasonID, next) {
            if (DeleteKeyResult.season == GetSeason()) {
                req.db_con.query('SELECT * FROM `objective` WHERE `Emp_UUID` = ? AND `Ses_ID` = ? AND `Disable` = 0', [req.session.Emp_UUID, seasonID], function (err, rows) {
                    var total = 0;
                    for (var i = 0; i < rows.length; i++) {
                        total += rows[i].Reaching_Rate;
                    }
                    var avg_progress = total / rows.length;
                    // console.log("delete kr new avg : " + avg_progress);
                    next(err, avg_progress);
                });
            } else {
                // console.log('no update avgProgress');
                next(null, 0);
            }
        },
        function (avg_progress, next) {
            if (DeleteKeyResult.season == GetSeason()) {
                req.db_con.query('UPDATE `employee` SET `Avg_Progress` = ? WHERE `Emp_UUID` = ?', [avg_progress, req.session.Emp_UUID], function (err, rows) {
                    next(err);
                });
            } else {
                next(null);
            }
        },
        //get activity number
        function (next) {
            req.db_con.query('SELECT COUNT(*) c FROM `activity` WHERE `Obj_ID` = ?', DeleteKeyResult.obj_ID, function (err, rows) {
                var actNumber = rows[0].c;
                next(err, actNumber);
            });
        }
    ],
        //last function in waterfall
        //add activity and send json back
        function (err, actNumber) {
            var act_ID = DeleteKeyResult.obj_ID + "^p^A" + actNumber;
            req.db_con.query('INSERT INTO `activity` (`Atv_ID`, `Obj_ID`, `Atv_Time`, `Atv_Text`, `Disable`) VALUES (?, ?, ?, ?, ?) ', [act_ID, DeleteKeyResult.obj_ID, DeleteKeyResult.del_time, DeleteKeyResult.act_text, 0], function (err, rows) {
                if (err) {
                    console.log(err + " Delete key result failure");
                    var errJSON = { error: err };
                    res.status(503).json(errJSON);
                } else {
                    // console.log("Delete key result successful!");
                    //send json
                    res.status(200).json({});
                }
            });
        });

});

// --- Require Data: Search keyword
router.get('/get_requData_searchKeyWord', function (req, res, next) {
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
        departments: [],
        people: [],
        objectives: []
    };
    // console.log('start search!');
    var parameter = "%" + JSON.parse(req.query.test).search.search_text + "%";
    // console.log("parameter : " + parameter);
    //var parameter = '%張%豪%';

    var tasks = [
        //find companyID
        function (next) {
            req.db_con.query('SELECT `Company` FROM `employee` WHERE `Emp_UUID` = ?', req.session.Emp_UUID, function (err, rows) {
                var cmp_ID = rows[0].Company;
                next(err, cmp_ID);
            });
        },
        //find department
        function (cmp_ID, next) {
            req.db_con.query('SELECT * FROM `department` WHERE  LOWER(`Dpm_Name`) LIKE LOWER(?) AND `Cmp_ID` = ? AND `Disable` = 0', [parameter, cmp_ID], function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    var dep = {
                        dep_ID: rows[i].Dpm_ID,
                        dep_name: rows[i].Dpm_Name,
                        dep_URL: "/search/get_requPage_searchResults/?keywords=" + JSON.parse(req.query.test).search.search_text + "&depOnly=" + 1
                    };
                    json_pkg_search.departments.push(dep);
                }
                next(err, cmp_ID);
            });
        },
        //find match people
        function (cmp_ID, next) {
            req.db_con.query('SELECT * FROM `employee` WHERE LOWER(`Emp_Name`) LIKE LOWER(?) AND `Company` = ? AND `Disable` = 0', [parameter, cmp_ID], function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].Emp_UUID == req.session.Emp_UUID) {
                        var url = '/profile';
                    } else {
                        var url = "/othersOKRs/get_requPage_viewOtherOKRs/?others_UUID=" + rows[i].Emp_UUID;
                    }
                    var person = {
                        person_userID: rows[i].Emp_UUID,
                        person_userImg: rows[i].Img_URL,
                        person_userName: rows[i].Emp_Name,
                        person_position: rows[i].Position,
                        person_URL: url
                    };
                    json_pkg_search.people.push(person);
                }
                var companyID = '%^p^' + cmp_ID + '^p^%';
                next(err, companyID);
            });
        },
        //find match objective
        function (companyID, next) {
            req.db_con.query('SELECT * FROM `objective` WHERE LOWER(`Obj_Text`) LIKE LOWER(?) AND `Obj_ID` LIKE ? AND `Disable` = 0', [parameter, companyID], function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].Emp_UUID == req.session.Emp_UUID) {
                        var url = '/profile';
                    } else {
                        var url = "/othersOKRs/get_requPage_viewOtherOKRs/?others_UUID=" + rows[i].Emp_UUID;
                    }
                    var obj = {
                        userID: rows[i].Emp_UUID,
                        userName: "",
                        userImg: "",
                        obj_season: "",
                        seasonID: rows[i].Ses_ID,
                        obj_text: rows[i].Obj_Text,
                        obj_URL: url
                    };
                    json_pkg_search.objectives.push(obj);
                }

                // console.log("match objective : " + JSON.stringify(json_pkg_search));
                next(err);
            });
        },
        //get season name
        function (next) {
            if (json_pkg_search.objectives.length == 0) {
                next(null);
            } else {
                var query = "SELECT * FROM `season` WHERE `Ses_ID` IN (";
                for (var i = 0; i < json_pkg_search.objectives.length; i++) {
                    if (i == json_pkg_search.objectives.length - 1) {
                        query += "'" + json_pkg_search.objectives[i].seasonID + "'";
                    } else {
                        query += "'" + json_pkg_search.objectives[i].seasonID + "',";
                    }
                }
                query += ") AND `Disable` = 0";
                // console.log("season name query : " + query);
                req.db_con.query(query, function (err, rows) {
                    // console.log('get season name : ' + JSON.stringify(rows));
                    var map = {};
                    for (var i = 0; i < rows.length; i++) {
                        map[rows[i].Ses_ID] = rows[i].Ses_Name;
                    }
                    for (var i = 0; i < json_pkg_search.objectives.length; i++) {
                        json_pkg_search.objectives[i].obj_season = map[json_pkg_search.objectives[i].seasonID];
                    }
                    next(err);
                });
            }
        },
        //get objective data from employee
        function (next) {
            if (json_pkg_search.objectives.length == 0) {
                next(null);
            } else {
                var query = 'SELECT * FROM `employee` WHERE `Emp_UUID` IN (';
                for (var i = 0; i < json_pkg_search.objectives.length; i++) {
                    if (i == json_pkg_search.objectives.length - 1) {
                        query += "'" + json_pkg_search.objectives[i].userID + "'";
                    } else {
                        query += "'" + json_pkg_search.objectives[i].userID + "',";
                    }
                }
                query += ") AND `Disable` = 0";
                // console.log("employee data query : " + query);
                req.db_con.query(query, function (err, rows) {
                    var nameMap = {};
                    var imgMap = {};
                    for (var i = 0; i < rows.length; i++) {
                        nameMap[rows[i].Emp_UUID] = rows[i].Emp_Name;
                        imgMap[rows[i].Emp_UUID] = rows[i].Img_URL;
                    }
                    for (var i = 0; i < json_pkg_search.objectives.length; i++) {
                        json_pkg_search.objectives[i].userName = nameMap[json_pkg_search.objectives[i].userID];
                        json_pkg_search.objectives[i].userImg = imgMap[json_pkg_search.objectives[i].userID];
                    }
                    next(err);
                });
            }
        }
    ];

    async.waterfall(tasks, function (err) {
        if (err) {
            console.log('search fail! \n' + err);
            console.log(JSON.stringify(json_pkg_search));
            res.status(500).json({});
        } else {
            // console.log('search success!');
            // console.log(JSON.stringify(json_pkg_search));
            res.status(200).json(JSON.stringify(json_pkg_search));
        }
    });
});

// --- Provide Data to add comment
router.get('/get_provData_addObjectiveComment', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }

    // console.log('start add cmt');
    // console.log(JSON.stringify(req.query.test));
    var json_pkg_comment = JSON.parse(req.query.test);
    // console.log('json_pkg_comment' + JSON.stringify(json_pkg_comment));
    // var json_pkg_comment = {
    //     obj_ID: "AAA",
    //     friendID:"abc",
    //     cmt_ID: "後端回傳請提供",
    //     cmt_userID: "後端回傳請提供",
    //     cmt_userImg: "後端回傳請提供",
    //     cmt_userName: "後端回傳請提供",
    //     cmt_time: "2017-10-18 16:12:4",
    //     cmt_text: "厲害欸~",
    //     edit: "後端回傳請提供",
    //     delete: "後端回傳請提供"
    // }   
    var tasks = [
        //get user name and img
        function (next) {
            req.db_con.query('SELECT * FROM `employee` WHERE `Emp_UUID` = ?', req.session.Emp_UUID, function (err, rows) {
                var userName = rows[0].Emp_Name;
                var img = rows[0].Img_URL;
                next(err, userName, img);
            });
        },
        //get comment id
        function (userName, img, next) {
            req.db_con.query('SELECT COUNT(*) c FROM `obj_comment` WHERE `Obj_ID` = ?', json_pkg_comment.obj_ID, function (err, rows) {
                var cmtNumber = rows[0].c;
                next(err, userName, img, cmtNumber);
            });
        },
        function (userName, img, cmtNumber, next) {
            var cmtID = json_pkg_comment.obj_ID + "^p^OC" + cmtNumber;
            req.db_con.query('INSERT INTO `obj_comment` (`Obj_Com_ID`, `Obj_ID`, `Emp_UUID`, `Emp_Name`, `Img_URL`, `Com_Text`, `His_Com_Text`, `CreatTime`, `Disable`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [cmtID, json_pkg_comment.obj_ID, req.session.Emp_UUID, userName, img, json_pkg_comment.cmt_text, "", json_pkg_comment.cmt_time, 0], function (err, rows) {
                var back = {
                    obj_ID: json_pkg_comment.obj_ID,
                    cmt_ID: cmtID,
                    cmt_userID: req.session.Emp_UUID,
                    cmt_userImg: img,
                    cmt_userName: userName,
                    cmt_time: json_pkg_comment.cmt_time,
                    cmt_text: json_pkg_comment.cmt_text,
                    edit: true,
                    delete: true
                };
                next(err, userName, img, back);
            });
        },
        //add notification
        function (userName, img, back, next) {
            //check friendID
            if (json_pkg_comment.friendID == '') {
                next(null, '', '', '', back);
            } else {
                //get notiID
                req.db_con.query('SELECT COUNT(*) c FROM `notification` WHERE `Emp_UUID` = ? AND `Obj_ID` = ?', [json_pkg_comment.friendID, json_pkg_comment.obj_ID], function (err, rows) {
                    var notiID = json_pkg_comment.obj_ID + "^p^NF" + rows[0].c;
                    // console.log("notiID: " + notiID);
                    next(err, notiID, userName, img, back)
                });
            }
        },
        //get url
        function (notiID, userName, img, back, next) {
            if (json_pkg_comment.friendID == '') {
                next(null, '', '', '', '', back);
            } else {
                var tempSplit = json_pkg_comment.obj_ID.split("^p^");
                var seasonID = tempSplit[1] + "^p^" + tempSplit[2].substring(0, 6);
                req.db_con.query('SELECT `Ses_Name` FROM `season` WHERE `Ses_ID` = ?', seasonID, function (err, rows) {
                    var url = '/profile/?season=' + rows[0].Ses_Name;
                    // console.log("err for get url : " + err);
                    next(err, notiID, userName, img, url, back);
                });
            }

        },
        function (notiID, userName, img, url, back, next) {
            if (json_pkg_comment.friendID == '') {
                next(null, back);
            } else {
                //add notification
                var notiText = "對你的目標留言";
                // console.log('start add in notification');
                req.db_con.query('INSERT INTO `notification` (`NF_ID`, `Emp_UUID`, `Obj_ID`, `Emp_Name`, `Img_URL`, `Is_Read`, `NF_Text`, `NF_Link`, `CreatTime`, `Disable`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [notiID, json_pkg_comment.friendID, json_pkg_comment.obj_ID, userName, img, 0, notiText, url, json_pkg_comment.cmt_time, 0], function (err, rows) {
                    // console.log("err for add notification : " + err);
                    next(err, back);
                });
            }
        }

    ];
    async.waterfall(tasks, function (err, back) {
        if (err) {
            console.log("add comment fail : " + err);
            res.status(500).json({});
        } else {
            // console.log("add comment success!");
            // console.log(JSON.stringify(back));
            res.status(200).json(JSON.stringify(back));
        }
    });

});

// --- Provide Action: Delete comment
router.get('/get_requActi_deleObjectiveComment', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }
    var del_cmt = JSON.parse(req.query.test);
    // console.log("del_cmt : " + JSON.stringify(del_cmt));
    //var cmt_ID = JSON.parse(req.query.test).cmt_ID;
    // console.log(JSON.stringify(del_cmt));
    var tasks = [
        function (next) {
            //set obj_comment's disable to 1
            req.db_con.query('UPDATE `obj_comment` SET `Disable` = 1 WHERE `Obj_Com_ID` = ?', del_cmt.cmt_ID, function (err, rows) {
                next(err);
            });
        },
        //set noti's disable to 1
        function (next) {
            if (del_cmt.friendID == '') {
                next(null);
            } else {
                // console.log("del_cmt.friendID : " + del_cmt.friendID);
                // console.log("del_cmt.obj_ID : " + del_cmt.obj_ID);
                // console.log("del_cmt.cmt_time : " + del_cmt.cmt_time);
                req.db_con.query('UPDATE `notification` SET `Disable` = 1 WHERE `Emp_UUID` = ? AND `Obj_ID` = ? AND `CreatTime` = ?', [del_cmt.friendID, del_cmt.obj_ID, del_cmt.cmt_time], function (err, rows) {
                    // console.log('set noti disable to 1');
                    next(err);
                });
            }
        }
    ];
    async.waterfall(tasks, function (err) {
        if (err) {
            console.log('delete comment fail : ' + err);
            res.status(500).json({});
        } else {
            // console.log('delete comment success !');
            res.status(200).json({});
        }
    });
});

// --- Provide Data to edit comment
router.get('/get_provData_editObjectiveComment', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }
    var json_pkg_comment = JSON.parse(req.query.test).cmt;
    // console.log("json_pkg_comment" + JSON.stringify(json_pkg_comment));
    // var json_pkg_comment = {
    //     cmt_ID: "後端回傳請提供",
    //     cmt_text: "厲害欸~",
    // };
    var tasks = [
        //get original text
        function (next) {
            req.db_con.query('SELECT `Com_Text` FROM `obj_comment` WHERE `Obj_Com_ID` = ?', json_pkg_comment.cmt_ID, function (err, rows) {
                var hisText = rows[0].Com_Text;
                next(err, hisText);
            });
        },
        //update history text
        function (hisText, next) {
            req.db_con.query('UPDATE `obj_comment` SET `His_Com_Text` = ? WHERE `Obj_Com_ID` = ?', [hisText, json_pkg_comment.cmt_ID], function (err, rows) {
                next(err);
            });
        },
        //update new text
        function (next) {
            req.db_con.query('UPDATE `obj_comment` SET `Com_Text` = ? WHERE `Obj_Com_ID` = ?', [json_pkg_comment.cmt_text, json_pkg_comment.cmt_ID], function (err, rows) {
                next(err);
            });
        }
    ];
    async.waterfall(tasks, function (err) {
        if (err) {
            console.log('edit comment fail : ' + err);
            res.status(500).json({});
        } else {
            // console.log('edit comment success !');
            res.status(200).json({});
        }
    });
});

// --- Provide Action: Press like
router.get('/get_requActi_pressLike', function (req, res, next) {//  
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
    var like = JSON.parse(req.query.test);
    // console.log("like : " + JSON.stringify(like));
    // var like = {
    //     obj_ID:"81c48152-d009-11e7-8c9e-a861ec7dace5^p^C001^p^2017Q4O000",
    //     friendID:"",
    //     time:"2017-12-26 14:36:20"
    // };
    // console.log('start add like');
    var tasks = [
        //check whether the user had press like already in the past
        function (next) {
            req.db_con.query('SELECT * FROM `act_like` WHERE `Obj_ID` = ? AND `Emp_UUID` = ?', [like.obj_ID, req.session.Emp_UUID], function (err, rows) {
                var count = rows.length;
                var disable = 0;
                if (count > 0) {
                    disable = rows[0].Disable;
                }
                // console.log('check disable: ' + disable);
                next(err, count, disable);
            });
        },
        function (count, disable, next) {
            if (count == 0) {
                //add new act_like,and add new notification
                //first get user's name and img
                req.db_con.query('SELECT * FROM `employee` WHERE `Emp_UUID` = ?', req.session.Emp_UUID, function (err, rows) {
                    var name = rows[0].Emp_Name;
                    var img = rows[0].Img_URL;
                    next(err, name, img);
                });
            } else {
                if (disable == 0) {
                    //change disable to 1
                    var changeDisableTo1Tasks = [
                        function (next) {
                            //change act_like's disable to 1
                            req.db_con.query('UPDATE `act_like` SET `Disable` = 1 WHERE `Emp_UUID` = ? AND `Obj_ID` = ?', [req.session.Emp_UUID, like.obj_ID], function (err, rows) {
                                next(err);
                            });
                        },
                        function (next) {
                            //change noti's disable to 1
                            if (like.friendID == '') {
                                next(null);
                            } else {
                                req.db_con.query('UPDATE `notification` SET `Disable` = 1 WHERE `Emp_UUID` = ? AND `Obj_ID` = ? AND `NF_Text` LIKE "%按讚%"', [like.friendID, like.obj_ID], function (err, rows) {
                                    next(err);
                                });
                            }

                        }
                    ];
                    async.waterfall(changeDisableTo1Tasks, function (err) {
                        if (err) {
                            console.log('change disable to 1 fail : ' + err);
                            res.status(500).json({});
                        } else {
                            // console.log('change disable to 1 success !');
                            res.status(200).json({});
                        }
                    });
                } else {
                    //change disable to 0
                    var changeDisableTo0Tasks = [
                        function (next) {
                            //change act_like's disable to 0
                            req.db_con.query('UPDATE `act_like` SET `Disable` = 0 WHERE `Emp_UUID` = ? AND `Obj_ID` = ?', [req.session.Emp_UUID, like.obj_ID], function (err, rows) {
                                next(err);
                            });
                        },
                        function (next) {
                            //change noti's disable to 0
                            if (like.friendID == '') {
                                next(null);
                            } else {
                                req.db_con.query('UPDATE `notification` SET `Disable` = 0, `CreatTime` = ? WHERE `Emp_UUID` = ? AND `Obj_ID` = ? AND `NF_Text` LIKE "%按讚%"', [like.time, like.friendID, like.obj_ID], function (err, rows) {
                                    next(err);
                                });
                            }
                        }
                    ];
                    async.waterfall(changeDisableTo0Tasks, function (err) {
                        if (err) {
                            console.log('change disable to 0 fail : ' + err);
                            res.status(500).json({});
                        } else {
                            // console.log('change disable to 0 success !');
                            res.status(200).json({});
                        }
                    });
                }
            }
        },
        //second get Act_Like_ID
        function (name, img, next) {
            req.db_con.query('SELECT COUNT(*) c FROM `act_like` WHERE `Obj_ID` = ?', like.obj_ID, function (err, rows) {
                var likeID = like.obj_ID + "^p^L" + rows[0].c;
                next(err, name, img, likeID);
            });
        },
        //third add act_like
        function (name, img, likeID, next) {
            req.db_con.query('INSERT INTO `act_like` (`Act_Like_ID`, `Emp_UUID`, `Obj_ID`, `Emp_Name`, `Img_URL`, `Disable`) VALUES (?, ?, ?, ?, ?, 0)', [likeID, req.session.Emp_UUID, like.obj_ID, name, img], function (err, rows) {
                next(err, name, img);
            });
        },
        //add new notification
        function (name, img, next) {
            //check friendID
            if (like.friendID == '') {
                next(null, '', '', '');
            } else {
                //get notiID
                req.db_con.query('SELECT COUNT(*) c FROM `notification` WHERE `Emp_UUID` = ? AND `Obj_ID` = ?', [like.friendID, like.obj_ID], function (err, rows) {
                    var notiID = like.obj_ID + "^p^NF" + rows[0].c;
                    next(err, notiID, name, img)
                });
            }
        },
        //get url
        function (notiID, name, img, next) {
            if (like.friendID == '') {
                next(null, '', '', '', '');
            } else {
                var tempSplit = like.obj_ID.split("^p^");
                var seasonID = tempSplit[1] + "^p^" + tempSplit[2].substring(0, 6);
                req.db_con.query('SELECT `Ses_Name` FROM `season` WHERE `Ses_ID` = ?', seasonID, function (err, rows) {
                    var url = '/profile/?season=' + rows[0].Ses_Name;
                    // console.log('notiID : ' + notiID);
                    next(err, notiID, name, img, url);
                });
            }

        },
        function (notiID, name, img, url, next) {
            if (like.friendID == '') {
                next(null);
            } else {
                //add notification
                var notiText = "對你的目標按讚";
                req.db_con.query('INSERT INTO `notification` (`NF_ID`, `Emp_UUID`, `Obj_ID`, `Emp_Name`, `Img_URL`, `Is_Read`, `NF_Text`, `NF_Link`, `CreatTime`, `Disable`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [notiID, like.friendID, like.obj_ID, name, img, 0, notiText, url, like.time, 0], function (err, rows) {
                    next(err);
                });
            }
        }
    ];
    async.waterfall(tasks, function (err) {
        if (err) {
            console.log('add act_like fail : ' + err);
            res.status(500).json({});
        } else {
            // console.log('add act_like success !');
            res.status(200).json({});
        }
    });
});

router.get('/get_requActi_logout', function (req, res, next) {
    req.session.Emp_UUID = null;
    res.render('login', { title: 'Log-in page' });
});

router.get('/get_requActi_pressNoti', function (req, res, next) {
    // console.log('start pressNoti');
    var notiID = JSON.parse(req.query.test).noti_ID;

    // console.log('notiID : ' + notiID);
    req.db_con.query('UPDATE `notification` SET `Is_Read` = 1 WHERE `NF_ID` = ?', notiID, function (err, rows) {
        if (err) {
            console.log("update noti's isRead fail" + err);
            res.status(500).json({});
        } else {
            // console.log("update noti's isRead success! " + err);
            res.status(200).json({});
        }
    });
});

router.get('/get_requData_krSuggestion', function (req, res, next) {
    var back_json = { kr_categories: [] };
    var categoriesMap = {};

    var tasks = [
        function (next) {
            req.db_con.query('SELECT * FROM `kr_suggestion` WHERE `Disable` = 0', function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    if (categoriesMap[rows[i].kr_category_ID]) {
                        categoriesMap[rows[i].kr_category_ID].push(rows[i].kr_sug_text);
                    } else {
                        categoriesMap[rows[i].kr_category_ID] = [];
                        categoriesMap[rows[i].kr_category_ID].push(rows[i].kr_sug_text);
                    }

                }
                // console.log('categoriesMap : ' + JSON.stringify(categoriesMap));
                next(err);
            });
        },
        function (next) {
            req.db_con.query('SELECT * FROM `kr_category` WHERE `Disable` = 0', function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    var category = {
                        kr_category: rows[i].kr_category_text,
                        kr_list: categoriesMap[rows[i].kr_category_ID]
                    };
                    back_json.kr_categories.push(category);
                }
                next(err);
            });
        }
    ];
    async.waterfall(tasks, function (err) {
        if (err) {
            console.log('get krSuggestion fail : ' + err);
            res.status(500).json({});
        } else {
            // console.log('get krSuggestion success !');
            // console.log('back json' + JSON.stringify(back_json));
            res.status(200).json(JSON.stringify(back_json));
        }
    });

});
// ########## Module Exports ##########
module.exports = router;
// ##############################
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