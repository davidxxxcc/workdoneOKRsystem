// varables
var url_localhost_profile = 'http://localhost:3000';
var res_statusCode = 102; //Processing
var res_msg = '';

// functions
function loginCheck(info, acc, pwd) {
    $.ajax({
        data: { clientReqInfo: info, account: acc, password: pwd },
        // - 需要傳送的資料
        url: url_localhost_profile + '/loginCheck',
        // - 告訴程式表單要傳送到哪裡 
        type: 'post',
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function (resData, textStatus, jqXHR) {
            // - 資料傳送成功後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            /*
            var jsonPackage = {
                jp_status: 200,
                jp_info: req.body.clientReqInfo,
                jp_acc: req.body.account,
                jp_pwd: req.body.password
            };
            */
            if (jqXHR.status == 200) {
                // OK
                console.log('XMLHttpRequest: ' + jqXHR.status);
                console.log('textStatus: ' + textStatus);
                alert('#Sucess: Log-in check OK.');
                // direct to '/profile'
                window.location.href = '/profile';
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            if (jqXHR.status == 401) {
                // 401 - Data Dismatch
                console.log('XMLHttpRequest: ' + jqXHR.status);
                console.log('textStatus: ' + textStatus);
                alert('#Error: Account or Password is Dismatch. Re-input plz.');

            } else if (jqXHR.status == 503) {
                console.log('XMLHttpRequest: ' + jqXHR.status);
                console.log('textStatus: ' + textStatus);
                alert('#Error: SQL Service Unavailable.');
            } else {
                console.log('XMLHttpRequest: ' + jqXHR.status);
                console.log('textStatus: ' + textStatus);
                alert('#Error: UnExpected Error.');
            }
            // refresh this page
            window.location.href = '/';
        }

    });
}

