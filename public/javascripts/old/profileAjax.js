// varables
var url_localhost = 'http://localhost:3000';
var res_statusCode = 102; //Processing
var res_msg = '';

// functions
function profileGetData() {
    $.ajax({
        data: {},
        // - 需要傳送的資料
        url: url_localhost + '/profile/req_ajax',
        // - 告訴程式表單要傳送到哪裡 
        type: 'get',
        dataType: 'json',
        cache: false,
        timeout: 5000,
        success: function (feedback, jqXHR, textStatus) {
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
            // console.log(feedback.okj_progress);
            // console.log(feedback.obj_contont);
            // OK
            // console.log('XMLHttpRequest: ' + jqXHR.status);
            // console.log('textStatus: ' + textStatus);
            //alert('#Sucess: profile get ok.');

            // document.getElementById('pjl0').innerHTML = '<p id="pjl0">' + feedback.okj_progress + '</p>';
            // document.getElementById('pjl1').innerHTML = '<p id="pjl1">' + feedback.obj_contont + '</p>';
            // document.getElementById('pjl2').innerHTML = '<p id="pjl2">' + feedback.kr_text + '</p>';
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 

            // res_statusCode = 404;
            // res_msg = 'Server connect error.';

            // console.log('status code => ' + res_statusCode + ' - ' + res_msg);

            // console.log('Msg: ajax.js - error.');
            // console.log('Server connect error.');

        }

    });
}

