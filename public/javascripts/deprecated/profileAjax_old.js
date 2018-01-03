// varables
var url_localhost_profile = 'http://localhost:3000/profile';
var res_statusCode = 102; //Processing
var res_msg = '';

// functions
function req_Ajax_JSON_Test(info) {
    $.ajax({
        data: { clientReqInfo: info },
        // - 需要傳送的資料
        url: url_localhost_profile + '/req_Ajax_JSON_Test',
        // - 告訴程式表單要傳送到哪裡 
        type: 'get',
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
            // console.log(JSON.stringify(feedback));
            // console.log('status code => ' + res_statusCode + ' - ' + res_msg);
            // console.log('status code => ' + resData.jp_status + ' - ' + resData.jp_msg);


            if (jqXHR.status == 200) {
                // OK
                console.log('XMLHttpRequest: ' + jqXHR.status);
                console.log('textStatus: ' + textStatus);
                document.getElementById('pjl0').innerHTML = '<p id="pjl0">' + resData.Emp_UUID + '</p>';
                document.getElementById('pjl1').innerHTML = '<p id="pjl1">' + resData.Emp_Account + '</p>';
                document.getElementById('pjl2').innerHTML = '<p id="pjl2">' + resData.Password + '</p>';
                document.getElementById('pjl3').innerHTML = '<p id="pjl3">' + resData.Act_Permission + '</p>';
                document.getElementById('pjl4').innerHTML = '<p id="pjl4">' + resData.Emp_Name + '</p>';
                document.getElementById('pjl5').innerHTML = '<p id="pjl5">' + resData.Act_Setting + '</p>';
                document.getElementById('pjl6').innerHTML = '<p id="pjl6">' + resData.Act_AnotherData + '</p>';
                document.getElementById('pjl7').innerHTML = '<p id="pjl7">' + resData.Company + '</p>';
                document.getElementById('pjl8').innerHTML = '<p id="pjl8">' + resData.Department + '</p>';
                document.getElementById('pjl9').innerHTML = '<p id="pjl9">' + resData.Disable + '</p>';


            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            console.log('XMLHttpRequest: ' + jqXHR.status);
            console.log('textStatus: ' + textStatus);
            alert('#Error: status => ' + jqXHR.status);
        }
    });
}

function req_Ajax_JSON_Notification(info) {
    $.ajax({
        data: { clientReqInfo: info },
        // - 需要傳送的資料
        url: url_localhost_profile + '/req_Ajax_JSON_Notification',
        // - 告訴程式表單要傳送到哪裡 
        type: 'get',
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
            // console.log(JSON.stringify(feedback));
            // console.log('status code => ' + res_statusCode + ' - ' + res_msg);
            // console.log('status code => ' + resData.jp_status + ' - ' + resData.jp_msg);


            if (jqXHR.status == 200) {
                // OK
                console.log('XMLHttpRequest: ' + jqXHR.status);
                console.log('textStatus: ' + textStatus);
                document.getElementById('ljf0').innerHTML = '<p id="ljf0">' + JSON.stringify(resData) + '</p>';
                //

                //
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            console.log('XMLHttpRequest: ' + jqXHR.status);
            console.log('textStatus: ' + textStatus);
            alert('#Error: status => ' + jqXHR.status);
        }
    });
}
function req_Ajax_JSON_ProfileData(info) {
    $.ajax({
        data: { clientReqInfo: info },
        // - 需要傳送的資料
        url: url_localhost_profile + '/req_Ajax_JSON_ProfileData',
        // - 告訴程式表單要傳送到哪裡 
        type: 'get',
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
            // console.log(JSON.stringify(feedback));
            // console.log('status code => ' + res_statusCode + ' - ' + res_msg);
            // console.log('status code => ' + resData.jp_status + ' - ' + resData.jp_msg);


            if (jqXHR.status == 200) {
                // OK
                console.log('XMLHttpRequest: ' + jqXHR.status);
                console.log('textStatus: ' + textStatus);
                document.getElementById('ljf0').innerHTML = '<p id="ljf0">' + JSON.stringify(resData) + '</p>';
                //
                //
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            console.log('XMLHttpRequest: ' + jqXHR.status);
            console.log('textStatus: ' + textStatus);
            alert('#Error: status => ' + jqXHR.status);
        }
    });
}
function req_Ajax_JSON_OKR(info) {
    $.ajax({
        data: { clientReqInfo: info },
        // - 需要傳送的資料
        url: url_localhost_profile + '/req_Ajax_JSON_OKRs',
        // - 告訴程式表單要傳送到哪裡 
        type: 'get',
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
            // console.log(JSON.stringify(feedback));
            // console.log('status code => ' + res_statusCode + ' - ' + res_msg);
            // console.log('status code => ' + resData.jp_status + ' - ' + resData.jp_msg);


            if (jqXHR.status == 200) {
                // OK
                console.log('XMLHttpRequest: ' + jqXHR.status);
                console.log('textStatus: ' + textStatus);
                document.getElementById('ljf0').innerHTML = '<p id="ljf0">' + JSON.stringify(resData) + '</p>';
                //
                // console.log('resData.seasons: ' + JSON.stringify(resData.seasons));
                // console.log('resData.profile: ' + JSON.stringify(resData.profile));
                // console.log('resData.OKRs: ' + JSON.stringify(resData.OKRs));

                // console.log('resData.OKRs[0]: ' + JSON.stringify(resData.OKRs[0]));
                // console.log('resData.OKRs[1]: ' + JSON.stringify(resData.OKRs[1]));
                
                //
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // - 資料傳送失敗後就會執行這個function內的程式，可以在這裡寫入要執行的程式 
            console.log('XMLHttpRequest: ' + jqXHR.status);
            console.log('textStatus: ' + textStatus);
            alert('#Error: status => ' + jqXHR.status);
        }
    });
}
