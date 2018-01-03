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

router.get('/get_requPage_viewOtherOKRs', function (req, res, next) {
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

    // ADD recent watch
    req.db_con.query('INSERT INTO `recent` (`Emp_UUID`, `Rec_Emp_UUID`, `CreatTime`, `Disable`) VALUES (? ,? ,?, ?)', [req.session.Emp_UUID, req.query.others_UUID, req.query.time, 0], function (err, rows) {
        if (err) {
            console.log('add recent fail! \n' + err);
            res.render('profileOthers', { others_UUID: req.query.others_UUID, season: req.query.season });
        } else {
            // console.log('add recent success!');
            res.render('profileOthers', { others_UUID: req.query.others_UUID, season: req.query.season });
        }
    });
});

// router.get('/get_requData_notification', function (req, res, next) {

//     // 403.8 - 網站存取遭拒。
//     // - 登入逾期
//     if (checkSession(req, res)) {
//         res.status(403).json("{}");
//         return;
//     }

//     var json_pkg = {
//         notifications: []
//     }

//     req.db_con.query('SELECT * FROM `notification` WHERE `Emp_UUID` = ?', req.session.Emp_UUID, function (err, rows) {
//         for (var i = 0; i < rows.length; i++) {
//             var noti = {
//                 noti_user_id: rows[i].Emp_UUID,
//                 noti_ID: rows[i].NF_ID,
//                 noti_user_img: rows[i].Img_URL,
//                 noti_user_name: rows[i].Emp_Name,
//                 noti_obj_id: rows[i].Obj_ID,
//                 noti_text: rows[i].NF_Text, 
//                 noti_time: rows[i].CreatTime,
//                 noti_link: rows[i].NF_Link,
//                 noti_isRead: rows[i].Is_Read
//             };
//             json_pkg.notifications.push(noti);
//         }

//         // console.log('--------------------------------- Notifications ---------------------------------');
//         // console.log(JSON.stringify(json_pkg) + "\n --already get notifications!");
//         // console.log('------------------------------------------------------------------');
//         if (err) {
//             var errJSON = { error: err };
//             res.status(503).json(errJSON);
//         } else {
//             res.json(JSON.stringify(json_pkg));
//         }
//     });
// });

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
    // console.log("load other okr");
    var otherUUID = JSON.parse(req.query.test).data.others_UUID;
    // console.log("req.query.others_UUID : " + otherUUID);
    // -- task
    var tasks = [
        // -- get profile data
        function (next) {
            req.db_con.query('SELECT * FROM `employee` WHERE `Emp_UUID` = ?', otherUUID, function (err, rows) {
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
            req.db_con.query('SELECT * FROM `season` WHERE `Cmp_ID` = ?  ORDER BY `Ses_Name` DESC', Cmp_ID, function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    if (SeasonID <= rows[i].Ses_ID) {
                        json_pkg.profile.seasons.push(rows[i].Ses_Name)
                    }
                };
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
        // render the error page
        res.status(403);
        var errorTemp = {
            status: 403,
            stack: ''
        };
        res.render('error', { message: '403 - forbidden. 禁止使用', error: errorTemp });
        return;
    }

    // console.log('UUID: ' + req.query.UUID);
    // console.log('season: ' + req.query.season);

    var peopleID = JSON.parse(req.query.test).data.others_UUID;
    var seasonName = JSON.parse(req.query.test).data.season;
    console.log(seasonName);
    console.log(peopleID);

    var json_pkg = {
        objectives: []
    };
    var tasks = [
        //get Cmp_ID
        function (next) {
            req.db_con.query('SELECT `Company` FROM `employee` WHERE `Emp_UUID` = ?', peopleID, function (err, rows) {
                var cmp_ID = rows[0].Company;
                next(err, cmp_ID);
            });
        },
        //get nowSeasonID
        function (cmp_ID, next) {
            req.db_con.query('SELECT `Ses_ID` FROM `season` WHERE `Cmp_ID` = ? AND `Ses_Name` = ?', [cmp_ID, seasonName], function (err, rows) {
                var nowSeasonID = rows[0].Ses_ID;
                next(err, nowSeasonID);
            });
        },
        //get all objective in this season
        function (nowSeasonID, next) {
            req.db_con.query('SELECT * FROM `objective` WHERE `Emp_UUID` = ? AND `Ses_ID` = ? AND `Disable` = 0 ORDER BY `CreatTime` DESC', [peopleID, nowSeasonID], function (err, rows) {
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
                next(err, nowSeasonID);
            });
        },
        //get get all obj_comments in this season
        function (nowSeasonID, next) {
            var parameter = peopleID + "^p^" + nowSeasonID + "%";
            req.db_con.query("SELECT * FROM `obj_comment` WHERE `Obj_ID` like ? AND `Disable` = 0 ORDER BY `CreatTime` ASC", parameter, function (err, rows) {
                for (var i = 0; i < rows.length; i++) {
                    var edit = false;
                    var del = false;
                    var url = '/othersOKRs/get_requPage_viewOtherOKRs/?others_UUID=' + rows[i].Emp_UUID;
                    if (rows[i].Emp_UUID == req.session.Emp_UUID) {
                        edit = true;
                        del = true;
                        url = '/profile';
                    }
                    var comment = {
                        cmt_userID: rows[i].Emp_UUID,
                        cmt_ID: rows[i].Obj_Com_ID,
                        cmt_userImg: rows[i].Img_URL,
                        cmt_userName: rows[i].Emp_Name,
                        cmt_time: rows[i].CreatTime,
                        cmt_text: rows[i].Com_Text,
                        edit: edit,
                        delete: del,
                        url: url
                    }
                    for (var j = 0; j < json_pkg.objectives.length; j++) {
                        if (json_pkg.objectives[j].obj_ID == rows[i].Obj_ID) {
                            json_pkg.objectives[j].comments.push(comment);
                        }
                    }
                }
                next(err, nowSeasonID, parameter);
            });
        },
        //get keyresult
        function (nowSeasonID, parameter, next) {
            req.db_con.query("SELECT * FROM `key_result` WHERE `Obj_ID` like ? AND `Disable` = 0 ORDER BY `CreatTime` DESC", parameter, function (err, rows) {
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
                next(err);
            });
        }
    ];
    async.waterfall(tasks, function (err) {
        if (err) {
            // console.log(err);
            // req.db_con.rollback(); // 發生錯誤 rollback?
            var errJSON = { error: err };
            res.status(503).json(errJSON);
            return;
        }
        // console.log('--------------------------------- OKRs ---------------------------------');
        // console.log(JSON.stringify(json_pkg) + "\n --already get OKRs!");
        // console.log('------------------------------------------------------------------');
        // req.db_con.end();
        res.status(200).json(JSON.stringify(json_pkg));
        //res.status(200).json({});
    });
});
// ########## Module Exports ##########
module.exports = router;
// ####################################