// varables
var url_localhost = 'http://localhost:3000';
var res_statusCode = 102; //Processing
var res_msg = '';

// functions
function loginCheck(info, acc, pwd) {
    $.ajax({
        data: { clientReqInfo: info, account: acc, password: pwd },
        // - 需要傳送的資料
        url: url_localhost + '/loginCheck',
        // - 告訴程式表單要傳送到哪裡 
        type: 'post',
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function (feedback) {
            // - 資料傳送成功後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            /*
            var jsonPackage = {
                jp_status: 200,
                jp_info: req.body.clientReqInfo,
                jp_acc: req.body.account,
                jp_pwd: req.body.password
            };
            */
            // console.log(JSON.stringify(feedback));

            if (feedback.jp_status == 200) {
                // ### result
                // 200
                // ###
                res_statusCode = feedback.jp_status;
                res_msg = feedback.jp_msg;
                console.log('status code => ' + res_statusCode + ' - ' + res_msg);
                window.location.href = '/profile';
            } else {
                res_statusCode = feedback.jp_status;
                res_msg = feedback.jp_msg;
                console.log('status code => ' + res_statusCode + ' - ' + res_msg);
                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 

            res_statusCode = 404;
            res_msg = 'Server connect error.';

            console.log('status code => ' + res_statusCode + ' - ' + res_msg);

            // console.log('Msg: ajax.js - error.');
            // console.log('Server connect error.');

        }

    });
}

