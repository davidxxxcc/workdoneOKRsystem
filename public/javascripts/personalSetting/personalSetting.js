// Global variables
var localhost_url = 'http://localhost:3000';
var GCP_url = 'http://35.196.96.33:3000';
var GCP_CMTest_URL = 'http://35.196.96.33:5000';
var Now_url = GCP_CMTest_URL;

var url_noti = Now_url + "/profile/get_requData_notification";
var url_changePwd = Now_url + "/personalSetting/pos_provData_editPassword";
var url_upload = Now_url + '/personalSetting/pos_provData_editProfilePic';
var hoverMenu = "#8de9c2";
var hoverDuration = 300;
var fadeDuration = 500;


// loading(imgURL);


/* ------ After loading... ------ */
function loading(imgURL) {
  $('#img_circle>img').attr('src', imgURL);
  // headerAfterLoading();
  // ajaxRequNotifications();
  viewPwds();
  getPwds();
  uploadImg();
}

function ajaxRequNotifications(season) {
  if (season == null) {
    season = GetSeason();
  }
  // console.log(season);
  $.ajax({
    url: url_noti,
    type: 'GET',
    dataType: 'json',
    success: function (dataJSON) {
      var data = JSON.parse(dataJSON);
      console.log(data);
      Handlebars.registerHelper("formatDateToNow", function (text) {
        str = formatDateToNow(text);
        return new Handlebars.SafeString(str);
      });
      var notiInfo = $('#noti-template').html();
      var template = Handlebars.compile(notiInfo);
      var notiData = template(data);
      $('.noti-message').append(notiData);
      headerAfterLoading();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    },
    complete: function () {
      //console.log("notification done"); //after success and error callbacks are executed
    }
  });
}

// function setProfPic(imgURL) {
//   console.log('here');
//   $('#img_circle>img').attr('src', imgURL);
// }


function viewPwds() {
  // 这里使用最原始的js语法实现，可对应换成jquery语法进行逻辑控制
  var $inputOldInvisible = $('#input_old_pwd_invisible');
  var $inputOldVisible = $('#input_old_pwd_visible');
  var $iconOldVisible = $('#icon_old_visible');
  var $iconOldInvisible = $('#icon_old_invisible');

  //隐藏password，显示text
  $('#icon_old_visible').on('click', function () {
    var value = $inputOldInvisible.val();
    $inputOldVisible.val(value);
    $inputOldInvisible.hide();
    $iconOldInvisible.show();
    $inputOldVisible.show();
    $iconOldVisible.hide();
  });

  //隐藏text block，显示password block
  $('#icon_old_invisible').on('click', function () {
    var value = $inputOldVisible.val();
    $inputOldInvisible.val(value);
    $inputOldInvisible.show();
    $iconOldInvisible.hide();
    $inputOldVisible.hide();
    $iconOldVisible.show();
  });

  var $inputNewInvisible = $('#input_new_pwd_invisible');
  var $inputNewVisible = $('#input_new_pwd_visible');
  var $iconNewVisible = $('#icon_new_visible');
  var $iconNewInvisible = $('#icon_new_invisible');

  $('#icon_new_visible').on('click', function () {
    var value = $inputNewInvisible.val();
    $inputNewVisible.val(value);
    $inputNewInvisible.hide();
    $iconNewInvisible.show();
    $inputNewVisible.show();
    $iconNewVisible.hide();
  });

  $('#icon_new_invisible').on('click', function () {
    var value = $inputNewVisible.val();
    $inputNewInvisible.val(value);
    $inputNewInvisible.show();
    $iconNewInvisible.hide();
    $inputNewVisible.hide();
    $iconNewVisible.show();
  });

  var $inputConfInvisible = $('#input_conf_pwd_invisible');
  var $inputConfVisible = $('#input_conf_pwd_visible');
  var $iconConfVisible = $('#icon_conf_visible');
  var $iconConfInvisible = $('#icon_conf_invisible');

  $('#icon_conf_visible').on('click', function () {
    var value = $inputConfInvisible.val();
    $inputConfVisible.val(value);
    $inputConfInvisible.hide();
    $iconConfInvisible.show();
    $inputConfVisible.show();
    $iconConfVisible.hide();
  });

  $('#icon_conf_invisible').on('click', function () {
    var value = $inputConfVisible.val();
    $inputConfInvisible.val(value);
    $inputConfInvisible.show();
    $iconConfInvisible.hide();
    $inputConfVisible.hide();
    $iconConfVisible.show();
  });
}


function getPwds() {
  $('#confirm_btn').on('click', function () {
    // 判斷三個都有inputs再發ajax
    var $oldPwd = $('#input_old_pwd_invisible').val();
    if (isNull($oldPwd) == true) {
      $oldPwd = $('#input_old_pwd_visible').val();
    }

    var $newPwd = $('#input_new_pwd_invisible').val();
    if (isNull($newPwd) == true) {
      $newPwd = $('#input_new_pwd_visible').val();
    }

    var $confirmPwd = $('#input_conf_pwd_invisible').val();
    if (isNull($confirmPwd) == true) {
      $confirmPwd = $('#input_conf_pwd_visible').val();
    }

    // if (($oldPwd.length == 0) && ($newPwd.length == 0) && ($confirmPwd.length == 0) && ($oldPwd.replace(/(^s*)|(s*$)/g, "").length == 0) && ($newPwd.replace(/(^s*)|(s*$)/g, "").length == 0) && ($confirmPwd.replace(/(^s*)|(s*$)/g, "").length == 0)) {
    if (isNull($oldPwd) != true && isNull($newPwd) != true && isNull($confirmPwd) != true) {
      // 先判斷新密碼及確認密碼是否吻合
      if ($newPwd === $confirmPwd) {
        // 將資料包成JSON
        var data = {
          "user_oldPwd": $oldPwd,
          "user_newPwd": $newPwd
        }
        var pwdJsonPkg = JSON.stringify({ data });
        // call ajax
        checkNewPwd(pwdJsonPkg);
      } else {
        // clear input fields
        $('#confirm_new_pwd').val('');
        // 顯示「確認密碼不相符！」之錯誤訊息
        $('#dismatch_mes').css('display', '').fadeOut(3000);
      }
    } else {
      // 顯示錯誤訊息（細一點就偵測是哪個input field沒輸入到）
      if (isNull($oldPwd) == true) {
        // 顯示incomplete_old「未完成輸入」之錯誤訊息
        $('#incomplete_old').css('display', '').fadeOut(3000);
      } else if (isNull($newPwd) == true) {
        // 顯示incomplete_new「未完成輸入」之錯誤訊息
        $('#incomplete_new').css('display', '').fadeOut(3000);
      } else if (isNull($confirmPwd) == true) {
        // 顯示incomplete_confirm「未完成輸入」之錯誤訊息
        $('#incomplete_confirm').css('display', '').fadeOut(3000);
      } else {
        // 顯示incomplete_mes「未完成輸入」之錯誤訊息
        $('#incomplete_mes').css('display', '').fadeOut(3000);
      }
    }

  });

  $('#cancel_btn').on('click', function () {
    // clear input fields
    clearInputFields();
  });
}


function checkNewPwd(pwdJsonPkg) {
  $.ajax({
    data: { test: pwdJsonPkg },
    url: url_changePwd,
    type: 'POST',
    dataType: 'JSON',
    timeout: 5000,

    // ajax succeeds --> clear input fields --> show correct messages
    success: function (responseData, textStatus, jqXHR) {
      clearInputFields();
      if (jqXHR.status == 200) {
        $('#success_mes').css('display', '').fadeOut(3000);
      } else if (jqXHR.status == 403) {
        $('#wrong_mes').css('display', '').fadeOut(3000);
      } else {
        $('#again_mes').css('display', '').fadeOut(3000);
      }
    },
    // ajax fails --> clear input fields --> show error messages
    error: function (jqXHR, textStatus, errorThrown) {
      clearInputFields();
      if (jqXHR.status == 403) {
        $('#wrong_mes').css('display', '').fadeOut(3000);
      } else {
        $('#again_mes').css('display', '').fadeOut(3000);
      }
    }

  });
}


// 清除輸入框內文字
function clearInputFields() {
  // jQuery 寫法
  var $oldPwdField = $('#input_old_pwd_invisible');
  var $oldPwdFieldVi = $('#input_old_pwd_visible');

  $oldPwdField.val('');
  $oldPwdFieldVi.val('');
  $('#input_new_pwd_invisible').val('');
  $('#input_new_pwd_visible').val('');
  $('#input_conf_pwd_invisible').val('');
  $('#input_conf_pwd_visible').val('');

  $oldPwdField.focus();
  $oldPwdFieldVi.focus();
}


// 判斷輸入字符串是否為空或者全部都是空格
function isNull(str) {
  if (str == "") {
    return true;
  } else {
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
  }
}



function uploadImg() {
  // $("#uploadImage").change(function(){
  //   readImage( this );
  // });
  //
  // function readImage(input) {
  //   if ( input.files && input.files[0] ) {
  //     var FR= new FileReader();
  //     FR.onload = function(e) {
  //       //e.target.result = base64 format picture
  //       $('#img_circle>img').attr( "src", e.target.result );
  //     };
  //     FR.readAsDataURL( input.files[0] );
  //   }
  // }

  // $('#uploadImage').change(function() {
  $('#uploadBtn').click(function () {
    //## 宣告一個FormData
    var data = new FormData();
    //## 將檔案append FormData
    var files = $("#uploadImage").get(0).files;
    var name = $('#uploadImage').attr('name');
    if (files.length > 0) {
      data.append(name, files[0]);
    }
    // console.log(files[0]);

    //## 透過ajax方式Post 至Action
    $.ajax({
      data: data,
      url: url_upload,
      type: "POST",
      contentType: false, // 告诉jQuery不要去這置Content-Type
      processData: false, // 告诉jQuery不要去處理發送的數據
      timeout: 1000,

      success: function (responseData, textStatus, jqXHR) {
        console.log('responseData: ' + responseData);
        console.log('jqXHR: ' + jqXHR);
        console.log('textStatus: ' + textStatus);
        // 後端用
        var data = JSON.parse(responseData);
        $('#img_circle>img').attr('src', data.newPic_URL);

        // 前端用
        // $('#img_circle>img').attr('src', data.newPic_URL);
      },

      error: function (jqXHR, textStatus, errorThrown) {
        console.log('jqXHR: ' + jqXHR);
        console.log('textStatus: ' + textStatus);
        console.log('errorThrown: ' + errorThrown);
        if (errorThrown == 'timeout') {
          alert('timeout.');
        } else {
          alert("error");
        }

      }

    });
  });
}

/* ------ 取得當前季度 ------ */
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

// format date compared with current time
function formatDateToNow(text) {
  var now = GetDateTime();
  var year = parseInt(text.substr(0, 4))
  var month = parseInt(text.substr(5, 2));
  var day = parseInt(text.substr(8, 2));
  var time = text.substr(11, 5);
  var yearNow = parseInt(now.substr(0, 4))
  var monthNow = parseInt(now.substr(5, 2));
  var dayNow = parseInt(now.substr(8, 2));
  var timeNow = now.substr(11, 5);
  var str;
  //今年的留言
  if (year == yearNow) {
    if (month != monthNow) {
      str = month + "月" + day + "日 " + time;
    }
    //這個月留言
    else if (month == monthNow && dayNow - day > 1) {
      str = month + "月" + day + "日 " + time;
    }
    //昨日留言
    else if (month == monthNow && dayNow - day == 1) {
      str = "昨天 " + time;
    }
    //今日留言
    else {
      str = time;
    }
  }
  else {
    str = year + "年" + month + "月" + day + "日 " + time;
  }
  return str;
}
