var localhost_url = 'http://localhost:3000';
var GCP_url = 'http://35.196.96.33:3000';
var GCP_CMTest_URL = 'http://35.196.96.33:5000';
var Now_url = GCP_CMTest_URL;
var settingLink = Now_url + "/personalSetting";
var homeLink = Now_url + "/profile";
var signOutLink = Now_url + "/profile/get_requActi_logout";
var viewOthersLink = Now_url + "/othersProfile/viewothers";
var url_noti = Now_url + "/profile/get_requData_notification";
var url_notiRead = Now_url + "/profile/get_requActi_pressNoti";
var url_queryKeyWords = Now_url + "/profile/get_requData_searchKeyWord";

//Global variables
var notiUpdateTime = 60 * 1000;
var hoverMenu = "#8de9c2";
var hoverAddOkr = "#f7786b";
var editBgColor = "#8de9c2";
var hoverDuration = 300;
var fadeDuration = 500;
var doneTypingInterval = 500;


//============================Custom events============================//

// custom-sliderUpdate : to create jQuery slider for key result progress bar
// custom-handleDragging: to drag slider
// custom-querying : to hover the search query
// custom-OkrUpdate: to modify new okr
// custom-KrUpdate: to modify kr
// custom-refreshChart: to refresh progress chart animation
// custom-checkLike: to check if like button is cliked

//****************************Initialize check*************************//

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
//formate date e.g.  20171222 to Dec 22
function formatDate(text) {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = text.toString().substr(0, 4);
  var month = monthNames[parseInt(text.toString().substr(5, 2)) - 1];
  var day = text.toString().substr(8, 2);
  var str = day + " " + month;
  return str;
}
//Set up home & viewothers
function setHref() {
  $("#options-fa-home").attr("href", homeLink);
  $("#viewOthers").attr("href", viewOthersLink);
  $("#setting").attr("href", settingLink);
  $("#singout").attr("href", signOutLink);
}
//click outside to close the drop down menu
function clickOutHeaderMenu() {
  $(document).click(function (event) {
    if (!$(event.target).closest('#options-fa-bell').length) {
      $('#drop-down-options-notification').fadeOut(fadeDuration);
    }
    if (!$('#options-fa-more, #options-fa-more-mobile').is(event.target)) {
      $('#drop-down-options-more').fadeOut(fadeDuration);
    }
    if (!$(event.target).closest("#search-prompt-menu").length && !$(event.target).closest('.searchBar').length) {
      $("#search-prompt").hide();
    }
  });
}
//Show header options drop down menu
function optDropDwonMenu() {
  var $moreIcon = $('#options-fa-more, #options-fa-more-mobile');
  var $moreMenu = $('#drop-down-options-more');
  // //more options menu
  $moreIcon.on('click', function (event) {
    if ($moreMenu.css('display') == 'none') {
      $moreMenu.fadeIn(fadeDuration);
    } else {
      $moreMenu.fadeOut(fadeDuration);
    }

    $moreMenu.find('li').on('mouseover', function (event) {
      event.stopPropagation();
      $(this).stop(true).animate({
        'background-color': '#54c8cf',
        'border-left-width': '10px',
        'border-left-color': '#2FEE85'
      }, hoverDuration / 2);

    }).on('mouseout', function (event) {
      event.stopPropagation();
      $(this).stop(true).animate({
        'background-color': '#f2f2f2',
        'border-left-width': '0px'
      }, hoverDuration / 2);
    });
  });
}

//****************************Hover effect************************************//

//Hover for search query
function hoverSearch() {
  $(".searchBar").on("mouseover", ".search-dept, .search-user, .search-obj", function () {
    $(this).css("background-color", "#8de9c2");
  });

  $(".searchBar").on("mouseout", ".search-dept, .search-user, .search-obj", function () {
    $(this).css("background-color", "#f2f2f2");
  });
}

//**************************Search key words**********************************//

// search key words
function searchKeyWords() {
  var $searBtn = $("#seatchButton");
  var $searInput = $("#searchInput");
  var $searPrompt = $("#search-prompt");
  var keyWords;
  var typingTimer;
  $searInput.val(null);

  //on keyup, start the countdown
  $searInput.on('keyup copy paste compositionend', function (event) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  $searInput.on('keydown', function () {
    clearTimeout(typingTimer);
  });

  $searBtn.on("click", function () {
    keyWords = $searInput.val().trim();
    if (keyWords != null) {
      if (keyWords.length > 0) {
        window.location.href = '/search/get_requPage_searchResults/?keywords=' + keyWords;
        $searPrompt.hide();
        $searInput.text(null);
      }
    }
  });

  $searInput.bind("enterKey", function (e) {
    keyWords = $searInput.val().trim();
    console.log("keyWords: " + keyWords);
    if (keyWords != null) {
      if (keyWords.length > 0) {
        window.location.href = '/search/get_requPage_searchResults/?keywords=' + keyWords;
        $searPrompt.hide();
      }
    }
  });

  $searInput.keyup(function (e) {
    if (e.keyCode == 13) {
      $(this).trigger("enterKey");
    }
  });
}
//user is "finished typing," do something
function doneTyping() {
  var $searInput = $("#searchInput");
  var $searPrompt = $("#search-prompt");
  keyWords = $searInput.val().trim();
  console.log("keyWords: " + keyWords);
  if (keyWords != null) {
    if (keyWords.length > 0) {
      ajaxRequestQuery(keyWords);
      $searPrompt.show();
    }
    if (keyWords.length == 0) {
      $searPrompt.hide();
    }
  }
}


//****************************Update data function*************************//

//Set time interal to update notification
function updatedNoti() {
  var notiTime;
  var myVar = setInterval(function () {
    notiTime = $(".noti-li").first().attr("data-noti-time");
    ajaxRequNotiClocking(notiTime);
  }, notiUpdateTime);
  function stopColor() {
    clearInterval(myVar);
  }
}
//Check isRead value to show the notifications
function checkNotiIsRead() {
  var $notiIcon = $('#options-fa-bell');
  var $notiMenu = $('#drop-down-options-notification');

  // 點擊鈴鐺開啟通知訊息
  $notiIcon.on("click", function (event) {
    $('#noti-circle').fadeOut(fadeDuration, function () {
      if ($notiMenu.css('display') == 'none') {
        $notiMenu.fadeIn(fadeDuration);
      } else {
        $notiMenu.fadeOut(fadeDuration);
      }
    });
  });

  // data-noti-read = 0 未讀    1已讀
  var notiNumber = $(".noti-li[data-noti-read='" + 0 + "']").length;
  var notiNumTotal = $(".noti-li").length;

  if (notiNumTotal == 0) {
    $('#noti-circle').hide();
    $(".noti-prompt").show();
  }
  else {
    $(".noti-prompt").hide();
    if (notiNumber == 0) {
      $('#noti-circle').hide();
    }
    else {
      $('#noti-circle').show().html(notiNumber + "+");

    }

  }

  //將已讀的訊息取消未讀UI提示
  $(".noti-li[data-noti-read='" + 1 + "']").each(function () {
    $(this).css('backgroundColor', '#f2f2f2');
    $(this).find('.fa-circle').hide();
  });

  //點擊某則通知
  $('.noti-li').on('click', function (event) {
    event.stopPropagation();
    $(this).css('backgroundColor', '#f2f2f2');
    $(this).find('.fa-circle').fadeOut(fadeDuration);
    if ($(this).attr("data-noti-read") == 0) {
      $(this).attr("data-noti-read", 1);
      var notiID = $(this).attr("data-noti-id");
      ajaxSendReadNoti(notiID);
    }
  });

}

function headerAfterLoading() {
  setHref();
  optDropDwonMenu();
  searchKeyWords();
  hoverSearch();
  updatedNoti();
  checkNotiIsRead();
  clickOutHeaderMenu();
}


//==================These are data loading requests using ajax ===============//

//定時讀取通知
function ajaxRequNotiClocking(notiTime) {
  var notiTimeJSON = JSON.stringify({
    "noti_time": notiTime
  });
  console.log(notiTimeJSON);

  $.ajax({
    url: url_noti,
    type: 'GET',
    dataType: 'json',
    data: { test: notiTimeJSON },
    success: function (dataJSON) {
      var data = JSON.parse(dataJSON);
      var notiNumNew = data.notifications.length;
      ////console.log(data);
      //如果有新通知
      if (notiNumNew > 0) {
        // $('#noti-circle').text(notiNumCur + notiNumNew);
        Handlebars.registerHelper("formatDateToNow", function (text) {
          str = formatDateToNow(text);
          return new Handlebars.SafeString(str);
        });
        var notiInfo = $('#noti-template').html();
        var template = Handlebars.compile(notiInfo);
        var notiData = template(data);
        $('.noti-message').prepend(notiData);
        // var notiNumCur = parseInt($('#noti-circle').text().substr(0,1));
      }

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
//Query keyWords
function ajaxRequestQuery(keywords) {
  var search = {
    "search_text": keywords
  }
  var queryKeyWords = JSON.stringify({ search });

  $.ajax({
    url: url_queryKeyWords,
    type: 'GET',
    dataType: 'json',
    data: { test: queryKeyWords },
    timeout: 5000,
    success: function (respData, textStatus, jqXHR) {
      var data = JSON.parse(respData);
      console.log(data);

      Handlebars.registerHelper("formatSeason", function (text) {
        var str = seasonTrans(text);
        return new Handlebars.SafeString(str);
      });
      Handlebars.registerHelper("deptChar", function (text) {
        var deptChar = text.toString().substr(0, 1);
        return new Handlebars.SafeString(deptChar);
      });
      Handlebars.registerHelper("formatObj", function (obj) {
        var objLower = obj.toLowerCase();
        var kwLower = keywords.toLowerCase();
        var kwLength = keywords.length;
        var objLength = obj.length;
        var startIndex = objLower.indexOf(kwLower);    //starting index of key words in obj text
        var endIndex = startIndex + kwLength - 1;   //ending index of key words in obj text
        var trimStart, trimEnd, str;
        if (kwLength >= 13) {
          return new Handlebars.SafeString(keywords.substr(0, 13));
        }
        else if (obj.length <= 13) {
          return new Handlebars.SafeString(obj);
        }
        else {
          var subStrNumber = 13 - kwLength;
          var count = 0;
          trimStart = startIndex;
          trimEnd = endIndex;

          while (count < subStrNumber) {
            //往前找開頭索引，最多找subStrNumber/2個
            if ((trimStart - 1) >= 0 && (count <= subStrNumber / 2)) {
              trimStart--;
            }
            //往後找，最多找滿subStrNumber
            else if ((trimEnd + 1) <= objLength && (count <= subStrNumber)) {
              trimEnd++;
            }
            count++;
          }
          // console.log("keywords: " + keywords);
          // console.log("keywords length: " + kwLength);
          // console.log("trimStart: "  + trimStart);
          // console.log("trimEnd: "  + trimEnd);
          // console.log("subStrNumber: " + subStrNumber);
          // console.log("objLength: " + objLength);

          //輸出字串
          if (trimStart == 0) {
            str = obj.substr(trimStart, 13) + "...";
          }
          else if (trimEnd == objLength - 1) {
            str = "..." + obj.substr(trimStart, 13);
          }
          else {
            str = "..." + obj.substr(trimStart, 13); + "...";
          }
          return new Handlebars.SafeString(str);
        }
      });
      Handlebars.registerHelper("checkData", function (depts, peo, objs) {
        if (depts.length == 0 && peo.length == 0 && objs.length == 0) {
          var str = '<li class="search-main-li search-prompt">查無此關鍵字!</li>';
          return new Handlebars.SafeString(str);
        }
      })
      Handlebars.registerHelper("formatPersonURL", function (url) {
        if (url != "/profile") {
          url = url + "&season=" + GetSeason() + "&time=" + GetDateTime();
        } else {
          url = url + "/?season=" + GetSeason();
        }
        return new Handlebars.SafeString(url);
      });
      Handlebars.registerHelper("formatObjURL", function (url, objSea) {
        if (url != "/profile") {
          url = url + "&season=" + objSea + "&time=" + GetDateTime();
        } else {
          url = url + "/?season=" + objSea;
        }
        return new Handlebars.SafeString(url);
      });
      var searchInfo = $("#search-template").html();
      var template = Handlebars.compile(searchInfo);
      var searchData = template(data);
      $('#search-prompt').html(searchData);
      $("#search-prompt").trigger("custom-querying");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    }
  });

}

//===========================These are data sending using ajax================//
//Send read notification to server
function ajaxSendReadNoti(notiID) {
  //var notiJSON = '{"noti_ID":"' + notiID + '"}';
  var notiData = {
    "noti_ID": notiID
  };
  var notiJSON = JSON.stringify(notiData);
  console.log(notiJSON);
  $.ajax({
    url: url_notiRead,
    type: 'GET',
    dataType: 'json',
    data: { test: notiJSON },
    timeout: 5000,
    success: function (respData, textStatus, jqXHR) {

    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    }
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

/* ------ 取得當前時間 ------ */
function GetDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (month.toString().length == 1) {
    var month = '0' + month;
  }
  if (day.toString().length == 1) {
    var day = '0' + day;
  }
  if (hour.toString().length == 1) {
    var hour = '0' + hour;
  }
  if (minute.toString().length == 1) {
    var minute = '0' + minute;
  }
  if (second.toString().length == 1) {
    var second = '0' + second;
  }
  var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  return dateTime;
}

