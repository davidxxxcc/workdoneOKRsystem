var express = require('express');
var async = require('async');
var router = express.Router();
var service_gcs = require('../library/service_GCS');
var service_gcs_file = require('../library/service_GCS_file');
var GCS_storage = require('@google-cloud/storage');
var GCS_imgBucketInstance = GCS_storage.bucket(GCS_imgBucketName);


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

    req.db_con.query('SELECT `Img_URL` FROM `employee` WHERE `Emp_UUID` = ?', req.session.Emp_UUID, function (err, rows) {
        if (err) {
            res.status(503).json(errJSON);
        } else {
            if (JSON.stringify(rows) == "[]") {
                res.render('personalSetting', { img_URL: 'https://vignette.wikia.nocookie.net/peanuts/images/d/dc/Woodstock.gif/revision/latest?cb=20090301022138' });
            } else {
                res.render('personalSetting', { img_URL: rows[0].Img_URL });
            }
        }
    });

    // res.render('personalSetting');
    // res.render('personalSetting', { img_URL: 'test' });
});

// --- Provide Data to edit password
router.post('/pos_provData_editPassword', function (req, res, next) {
    // 403.8 - 網站存取遭拒。
    // - 登入逾期
    if (checkSession(req, res)) {
        res.status(403).json("{}");
        return;
    }
    var editPassword = JSON.parse(req.body.test).data;
    // console.log("editPassword : " + editPassword);
    // var editPassword = {
    //     user_oldPwd: "abcdefg",
    //     user_newPwd: "hijklmn"
    // };
    var tasks = [
        //check old password
        function (next) {
            req.db_con.query('SELECT `Password` FROM `employee` WHERE `Emp_UUID` = ?', req.session.Emp_UUID, function (err, rows) {
                if (rows[0].Password == editPassword.user_oldPwd) {
                    next(err);
                } else {
                    //old password is wrong
                    res.status(403).json({});
                }
            });
        },
        //update password
        function (next) {
            req.db_con.query('UPDATE `employee` SET `Password` = ? WHERE `Emp_UUID` = ?', [editPassword.user_newPwd, req.session.Emp_UUID], function (err, rows) {
                next(err);
            });
        }
    ];

    async.waterfall(tasks, function (err) {
        if (err) {
            console.log('Update password fail');
            res.status(500).json({});
        } else {
            // console.log('Update password success');
            res.status(200).json({});
        }
    });

});


router.post('/pos_provData_editProfilePic', service_gcs.multer.single('profilePic'), service_gcs.sendUploadToGCS, (req, res, next) => {

    // Was an image uploaded? If so, we'll use its public URL
    // in cloud storage.
    if (req.file && req.file.cloudStoragePublicUrl) {
        req.body.imageUrl = req.file.cloudStoragePublicUrl;
    }

    var newPic_URL = req.body.imageUrl;
    // console.log('new picture URL: ' + newPic_URL);
    // console.log('req.body.imageUrl: ' + req.body.imageUrl);
    // console.log('req.file.cloudStoragePublicUrl: ' + req.file.cloudStoragePublicUrl);

    // update DBS img.url
    // var userEmp_ID = req.session.Emp_UUID;
    // req.db_con.query('UPDATE `employee` SET `Img_URL` = ? WHERE `Emp_UUID` = ?', [newPic_URL, req.session.Emp_UUID], function (err, rows) {
    //     next(err);
    // });

    var tasks = [
        function (next) {
            req.db_con.query('SELECT `Img_URL` FROM `employee` WHERE `Emp_UUID` = ?', req.session.Emp_UUID, function (err, rows) {
                // service_gcs.deleteFile(rows[0].Img_URL);
                var oldFileName = rows[0].Img_URL;
                GCS_imgBucketInstance
                    .file(oldFileName)
                    .delete()
                    .then(() => {
                        console.log(`gs://${GCS_imgBucketName}/${oldFileName} deleted.`);
                    })
                    .catch(err => {
                        console.error('ERROR:', err);
                    });
                next(err);
            });
        },
        // act_like
        // notification
        // employee
        // obj_comment
        function (next) {
            req.db_con.query('UPDATE `act_like` SET `Img_URL` = ? WHERE `Emp_UUID` = ?', [newPic_URL, req.session.Emp_UUID], function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('UPDATE `notification` SET `Img_URL` = ? WHERE `Sourse_UUID` = ?', [newPic_URL, req.session.Emp_UUID], function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('UPDATE `employee` SET `Img_URL` = ? WHERE `Emp_UUID` = ?', [newPic_URL, req.session.Emp_UUID], function (err, rows) {
                next(err);
            });
        },
        function (next) {
            req.db_con.query('UPDATE `obj_comment` SET `Img_URL` = ? WHERE `Emp_UUID` = ?', [newPic_URL, req.session.Emp_UUID], function (err, rows) {
                next(err);
            });
        }
    ];

    async.waterfall(tasks, function (err) {
        if (err) {
            console.log('Update profile picture fail. \n -- ' + newPic_URL + '\n -- ' + req.session.Emp_UUID);
            res.status(500).json({});
        } else {
            var json_pkg = {
                newPic_URL: newPic_URL
            };
            console.log('Edit pic success');
            res.status(200).json(JSON.stringify(json_pkg));
        }
    });



    // Save the data to the database.
    // getModel().create(data, (err, savedData) => {
    //   if (err) {
    //     next(err);
    //     return;
    //   }
    //   res.redirect(`${req.baseUrl}/${savedData.id}`);
    // });

    // response json_pkg
    // var json_pkg = {
    //     newPic_URL: newPic_URL
    // };
    // res.status(200).json(JSON.stringify(json_pkg));
});
// ########## Module Exports ##########
module.exports = router;
// ##############################