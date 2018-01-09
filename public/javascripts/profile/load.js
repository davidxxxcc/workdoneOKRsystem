//======================These are routers for ajax request=======================//
var localhost_url = 'http://localhost:3000';
var GCP_url = 'http://35.196.96.33:3000';
var GCP_CMTest_URL = 'http://35.196.96.33:5000';
var Now_url = GCP_CMTest_URL;

var url_noti = Now_url + "/profile/get_requData_notification";
var url_profile = Now_url + "/profile/get_requData_profileData";
var url_okrs = Now_url + "/profile/get_requData_OKRs";
var url_addObj = Now_url + "/profile/get_provData_addOBJ";
var url_addKr = Now_url + "/profile/get_provData_addKR";
var url_deleObj = Now_url + "/profile/pos_requActi_deleOBJ";
var url_deleKr = Now_url + "/profile/pos_requActi_deleKR";
var url_editObj = Now_url + "/profile/pos_provData_editOBJ";
var url_editKrText = Now_url + "/profile/pos_provData_editKRText";
var url_editKrProgress = Now_url + "/profile/pos_provData_editKRProgress";
var url_addCmt = Now_url + "/profile/get_provData_addObjectiveComment";
var url_deleCmt = Now_url + "/profile/get_requActi_deleObjectiveComment";
var url_editCmt = Now_url + "/profile/get_provData_editObjectiveComment";
var url_like = Now_url + "/profile/get_requActi_pressLike";
var url_krSug = Now_url + "/profile/get_requData_krSuggestion";


//Global variables
var friID;
var notiUpdateTime = 60 * 1000;
var hoverMenu = "#8de9c2";
var hoverAddOkr = "#f7786b";
var editBgColor = "#8de9c2";
var hoverDuration = 300;
var fadeDuration = 500;

//============================Custom events============================//

// custom-sliderUpdate : to create jQuery slider for key result progress bar
// custom-handleDragging: to drag slider
// custom-querying : to hover the search query
// custom-OkrUpdate: to modify new okr
// custom-KrUpdate: to modify kr
// custom-refreshChart: to refresh progress chart animation
// custom-checkLike: to check if like button is cliked
// custom-refreshChart: to refresh progress chart animation
// custom-checkLike: to check if like button is cliked
// custom-querying : to hover the search query
// custom-krEditing: to boadcast kr-editing to disable other kr-edit functions


//used for modal control
var loadOkrs = false;
var addKrCount = 1; //count for key results in modal
var step = 1;       //step control for modal
var updateStatus = 0; // 0 for initial value, 1 for add objective, 2 for add objective and key results, 3 for add key result only
var editStatus = 0; // 0 for initial value, 1 for editing whole objective, 2 for editing key result text only, 3 for editing key result progress only, 4 for editing key result both text and progress
var deleteStatus = 0; // 0 for initial value, 1 for deleting whole objective, 2 for deleting key result only
var $krWidth;       //Dynamically measure the width of kr suggestion menu
var $bgColor = "#fff";

//****************************Initialize check*************************//

//Check if there's any okr update data
function okrDataCheck() {
  $(".section-okr").on("custom-sliderUpdate custom-OkrUpdate", function () {
    var okr = $(">.okr", this);
    // console.log(okr);
    // console.log(okr.length);
    if (okr == null || okr.length == 0) {
      $('.prompt-no-okr').show();
    }
    else {
      $('.prompt-no-okr').hide();
    }
  });

  $(".section-okr").on("custom-sliderUpdate custom-OkrUpdate custom-KrUpdate", ".okr", function () {

    var $krContent = $(this).find(".kr-content");
    // console.log($krContent);
    $krContent.each(function () {
      if ($('>.kr', this).length == 0) {
        $('>.prompt-no-kr', this).show();
        $('>.kr-add', this).show();
      }
      else if ($('>.kr', this).length > 0 && $('>.kr', this).length < 5) {
        $('>.prompt-no-kr', this).hide();
        $('>.kr-add', this).show();
      }
      else if ($('>.kr', this).length >= 5) {
        $('>.kr-add', this).hide();
        $('>.prompt-no-kr', this).hide();
      }
    });


  });
}
//Set user ID to variable friendID
function setFriID() {
  friID = "";
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
//transform string e.g. 201704 to 2017 Q4
function seasonTrans(seasonText) {
  var season = ["Q1", "Q2", "Q3", "Q4"];
  var qtr = seasonText.toString().substr(4, 2);
  var year = seasonText.toString().substr(0, 4);
  var str = year + " " + season[qtr - 1];
  return str;
}
// activities illustration progress dot
function actDotUpdate() {
  $(".section-okr").on("custom-KrUpdate custom-OkrUpdate custom-sliderUpdate", ".okr", function () {
    // console.log($(this));
    $(this).each(function () {
      var id = $(this).attr("data-obj-id");
      // //console.log(id);
      var $actLi = $(".history-li[data-obj-id='" + id + "']");
      // var $actLi = $(">.history-slide>.history-content>.history-li", this);
      var curDate = "";
      var prevDate = "";
      $actLi.each(function (i) {
        // console.log($(this));
        prevDate = curDate;
        curDate = $(this).attr('data-history-date').substr(0, 10);
        // console.log(" curDate >> " + curDate);
        // console.log(" prevDate >> " + prevDate);
        if (prevDate == curDate) {
          $(this).find('.solid-dot').css('display', 'display');
          $(this).find('.hollow-dot').css('display', 'none');
          // console.log("=="+$(this).find(".history-text").text());
          ////console.log( "solid"+ $(this) + i);
        } else {
          $(this).find('.solid-dot').css('display', 'none');
          $(this).find('.hollow-dot').css('display', 'display');
          // console.log("!="+$(this).find(".history-text").text());
          ////console.log("hollow" + $(this) + i);
        }
      });
    });
  });
}
//Return current time
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
//Return now season format ex: "201703"
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
//Return selected season show on page ex: "201501"
function GetSelSeason() {
  return $("#selected-season").attr("data-season");
}

//****************************RWD effect*************************//

//change content of #add-okr button with when resizing window
function resizeAddOkrBtn() {
  $windowWidth = $(window).width();
  $okrBTN = $('#add-okr');
  //Current window size
  if ($windowWidth <= 800) {
    //console.log("resize");
    $okrBTN.html("+");
    $("#kr-input-options").css("right","-80vw");

  } else {
    $okrBTN.html("+新增您的OKR");
    $("#kr-input-options").css("right","-25vw");

  }

  //detect window resize
  $(window).resize(function () {
    $windowWidth = $(window).width();
    ////console.log($windowWidth);
    if ($windowWidth <= 800) {
      $okrBTN.html("+");
      $("#kr-input-options").css("right","-80vw");

    } else {
      $okrBTN.html("+新增您的OKR");
      $("#kr-input-options").css("right","-25vw");
    }
  });
}
//Get current dynamic scroll data
function GetScroll() {
  const height = $(window).height();
  const scrollTop = $(window).scrollTop();
  //console.log("height: " + height + ", scrollTop: " + scrollTop);
}

//+++++++++++++++++++++++++ProgressBar slider effect*******************//

//Initialize Slider
function initSlider() {
  $(".section-okr").on("custom-sliderUpdate", ".slider-content", function () {
    // console.log($(this));
    $(this).each(function () {
      var $krID = $(this).attr("data-kr-id");
      var $objID = $(this).attr("data-obj-id");
      var $slider = $(".slider[data-kr-id='" + $krID + "']");
      var $handle = $(".handle[data-kr-id='" + $krID + "']");
      var $krProgress = $slider.attr("data-kr-progress");
      var $progressText = $handle.siblings(".ui-slider-range");
      //initialize the slider
      var $krContent = $(".kr-text[data-kr-id='" + $krID + "']");
      var $krText = $krContent.text();
      //================These variables are kr edit button====================//
      var $krEditBtn = $(".kr-edit[data-kr-id='" + $krID + "']");
      var $krDelBtn = $(".kr-delete[data-kr-id='" + $krID + "']");
      var $krBtns = $(".kr-edit[data-kr-id='" + $krID + "'], .kr-delete[data-kr-id='" + $krID + "']");
      //================These variables are confirm button in kr edit mode====================//
      var $confirmBtn = $(".kr-confirm[data-kr-id='" + $krID + "']");
      var $cancelBtn = $(".kr-cancel[data-kr-id='" + $krID + "']");
      var $updatedBtns = $(".kr-confirm[data-kr-id='" + $krID + "'], .kr-cancel[data-kr-id='" + $krID + "']");
      //======================================================================//

      $slider.slider({
        create: function (event, ui) {
          $handle.siblings(".ui-slider-range").attr("data-kr-id", $krID);
          $handle.siblings(".ui-slider-range").attr("data-obj-id", $objID);
          if ($krProgress < 10 || $krProgress == null) {
            $handle.text($krProgress);
            $handle.siblings(".ui-slider-range").text("");
          } else {
            $handle.text("");
            $handle.siblings(".ui-slider-range").text($krProgress + "%");
          }
        },
        start: function (event, ui) {
        },
        slide: function (event, ui) {
          if (ui.value < 10 || ui.value == null) {
            $handle.text(ui.value);
            $handle.siblings(".ui-slider-range").text("");
          } else {
            $handle.text("");
            $handle.siblings(".ui-slider-range").text(ui.value + "%");
          }
        },
        animate: true,
        change: function (event, ui) {
        },
        stop: function (event, ui) {
          // console.log("ui.value" + ui.value);
          // console.log("$krProgress" + $krProgress);
          $handle.trigger("custom-handleDragging");   //trigger slider loading event
          if (ui.value != $krProgress && $krContent.attr("contenteditable") == "false") {
            editStatus = 3;           //3 for editing key result progress only
            //step 1: hide kr edit & delete btns and show updated btns
            $krBtns.hide(fadeDuration, function () {
              $updatedBtns.show(fadeDuration);
            });
          }
          else if (ui.value == $krProgress && $krContent.attr("contenteditable") == "false") {
            editStatus = 0;
            $updatedBtns.hide(function () {
              $krBtns.show();
            });
          }
        },
        min: 0,
        max: 100,
        range: "min",
        orientation: "horizontal",
        value: $krProgress,
        step: 1
      });
    });
  });
  $('.slider-content').trigger("custom-sliderUpdate");   //trigger slider loading event
}

//****************************Drop down menu*************************//

//click outside to close the drop down menu
function clickOutMenu() {
  $(document).click(function (event) {
    // //console.log(event.target);
    if (!$(event.target).closest('#fa-drop-down').length) {
      $('#drop-down-season').stop(false, true).fadeOut(fadeDuration);
      $('#fa-drop-down').stop(false, true).css('transform', 'rotate(0deg)');
    }
    if (!$(event.target).closest('.more-option').length) {
      $('.drop-down-obj').stop(false, true).fadeOut(fadeDuration);
    }
    // if(!$(event.target).closest('#options-fa-bell').length){
    //   $('#drop-down-options-notification').fadeOut(fadeDuration);
    // }
    // if(!$('#options-fa-more, #options-fa-more-mobile').is(event.target)){
    //   $('#drop-down-options-more').fadeOut(fadeDuration);
    // }
    if (!$('.cmt-more-icon').is(event.target)) {
      $('.drop-down-cmt').stop(false, true).fadeOut(fadeDuration);
    }
    if (!$(event.target).closest('.history-slide').length && !$(event.target).closest('.obj-history').length) {
      $('.history-slide').stop(false, true).animate({
        right: '-720px'
      }, fadeDuration / 2).fadeOut(fadeDuration / 2);
    }
    if ($('.section-modal').css("display") == "block") {
      if (!$('#okr-modal').is(event.target) && $('#okr-modal').has(event.target).length == 0 && !$(event.target).closest('.kr-add-icon').length) {
        if ($('#obj-input').val().trim().length != 0) {
          $('.check-box').fadeIn(fadeDuration);
        } else {
          popUpModal(false);
        }
      }
    }
    if (!$(event.target).closest('#kr-input-options').length) {
      $('#kr-prompt-options').removeClass("show");
      $('#kr-input-options').animate({
        right: $krWidth
      }, fadeDuration);
      initKrOptions();
    }
    if (!$(event.target).closest('#delete-check-box').length && !$(event.target).closest('.obj-delete').length && !$(event.target).closest('.kr-delete').length) {
      $('.section-popup-delete').fadeOut(fadeDuration);
    }
    // if(!$(event.target).closest("#search-prompt-menu").length && !$(event.target).closest('.searchBar').length){
    //   $("#search-prompt").hide();
    // }
  });
}
//Press ESC to quit modal
function pressKeyBoard() {
  $(document).keyup(function (event) {
    //press ESC
    if (event.keyCode == 27) {
      if ($('.section-modal').css("display") == "block") {
        if (!$('#okr-modal').is(event.target) && $('#okr-modal').has(event.target).length == 0) {
          if ($('#obj-input').val().trim().length != 0) {
            $('.check-box').fadeIn(fadeDuration);
          } else {
            popUpModal(false);
          }
        }
      }
    }
  });

}
//click .more-option to show .drop-down-obj menu and .obj-menu-li hover effect
function objDropDownMenu() {
  var bgColor = $('.obj-menu').css("background-color");
  //click to show or hide
  $('.section-okr').on("click", '.more-option', function (event) {
    var objId = $(this).attr("data-obj-id");
    var $moreMenu = $(".drop-down-obj[data-obj-id='" + objId + "']");
    var $moreIcon = $(".more-option[data-obj-id='" + objId + "']");

    if ($moreMenu.css('display') == 'none') {
      $moreMenu.stop(false, true).fadeIn(fadeDuration);
    } else {
      $moreMenu.stop(false, true).fadeOut(fadeDuration);
    }

  });
  $('.section-okr').on("mouseover", ".obj-menu-li", function () {
    $(this).stop(false, true).animate({
      'background-color': hoverMenu
    }, hoverDuration);
  });
  $('.section-okr').on("mouseout", ".obj-menu-li", function () {
    $(this).stop(false, true).animate({
      'background-color': bgColor
    }, hoverDuration);
  });

  // $('.more-option').on('click', function(event) {
  //   var objId = $(this).attr("data-obj-id");
  //   var $moreMenu = $(".drop-down-obj[data-obj-id='" + objId + "']");
  //   var $moreIcon = $(".more-option[data-obj-id='" + objId + "']");
  //
  //   if ($moreMenu.css('display') == 'none') {
  //     $moreMenu.stop(false,true).fadeIn(fadeDuration);
  //   } else {
  //     $moreMenu.stop(false,true).fadeOut(fadeDuration);
  //   }
  //
  // });
  // $('.obj-menu-li').hover(
  //   function() {
  //     $(this).stop(false,true).animate({
  //       'background-color': hoverMenu
  //     }, hoverDuration);
  //   },
  //   function() {
  //     $(this).stop(false,true).animate({
  //       'background-color': bgColor
  //     }, hoverDuration);
  //   }
  // );

}
//click #fa-drop-down to show #drop-down-season menu and .sea-menu-li hover effect
function seaDropDownMenu() {
  var bgColor = $('.sea-menu-li').css("background-color");
  var $seasonIcon = $('#fa-drop-down');
  var $seasonMenu = $('#drop-down-season');

  //click to show or hide season menu
  $seasonIcon.on('click', function (event) {
    if ($seasonMenu.css('display') == 'none') {
      $seasonMenu.stop(false, true).fadeIn();
      $(this).stop(false, true).css('transform', 'rotate(180deg)');
    } else {
      $seasonMenu.stop(false, true).fadeOut();
      $(this).stop(false, true).css('transform', 'rotate(0deg)');
    }
  });

  //hover effect
  $('.sea-menu-li').hover(
    function () {
      $(this).stop(false, true).animate({
        'background-color': hoverMenu
      }, hoverDuration);
    },
    function () {
      $(this).stop(false, true).animate({
        'background-color': bgColor
      }, hoverDuration);
    }
  );
}

function cmtDropDownMenu() {
  var bgColor = $('.cmt-menu').css("background-color");
  //more options menu
  $('.section-okr').on('click', '.cmt-more-icon', function () {
    var cmtId = $(this).attr("data-cmt-id");
    var $cmtMenu = $(".drop-down-cmt[data-cmt-id='" + cmtId + "']");
    if ($cmtMenu.css('display') == 'none') {
      $cmtMenu.fadeIn(fadeDuration);
    } else {
      $cmtMenu.fadeOut(fadeDuration);
    }
  });

  $('.section-okr').on('mouseover', '.cmt-menu-li', function () {
    $(this).stop(true).animate({
      'background-color': hoverMenu
    }, hoverDuration);
  }).on('mouseout', '.cmt-menu-li', function () {
    $(this).stop(true).animate({
      'background-color': bgColor
    }, hoverDuration);
  })

  //more options menu
  // $('.cmt-more-icon').on('click', function(event) {
  //   event.stopPropagation();
  //   var cmtId = $(this).attr("data-cmt-id");
  //   var $cmtMenu = $(".drop-down-cmt[data-cmt-id='" + cmtId + "']");
  //   if ($cmtMenu.css('display') == 'none') {
  //     $cmtMenu.fadeIn(fadeDuration);
  //   } else {
  //     $cmtMenu.fadeOut(fadeDuration);
  //   }
  //
  //   $('.cmt-menu-li').on('mouseover', function(event) {
  //     event.stopPropagation();
  //     $(this).stop(true).animate({
  //       'background-color': hoverMenu
  //     }, hoverDuration);
  //
  //   }).on('mouseout', function() {
  //     $(this).stop(true).animate({
  //       'background-color': bgColor
  //     }, hoverDuration);
  //   });
  // });
}
//Slide in activities $krMenu
function actSlideIn() {
  var $buttonId, $aside;
  $('.section-okr').on('click', '.obj-history', function () {
    $buttonId = $(this).attr('data-obj-id');
    $aside = $(".history-slide[data-obj-id='" + $buttonId + "']");
    // var curDate = "";
    // var prevDate = "";
    $aside.stop(false, true).animate({
      right: '0px',
      top: '80px'
    }, fadeDuration / 2).css("display", "block");
  });
  $('.section-okr').on('click', '.hisBtn', function () {
    $buttonId = $(this).attr('data-obj-id');
    $aside = $(".history-slide[data-obj-id='" + $buttonId + "']");
    $aside.stop(false, true).animate({
      right: '-720px'
    }, fadeDuration / 2).fadeOut(fadeDuration / 2);
  });
}

//****************************Hover effect************************************//

//Hover for #add-okr button
function hoverAddOkrBtn() {
  var bgColor = $('#add-okr').css("background-color");
  $('#add-okr').hover(
    function () {
      $(this).stop(false, true).animate({
        backgroundColor: '#f7786b'
      }, hoverDuration, );
    },
    function () {
      $(this).stop(true).animate({
        backgroundColor: bgColor
      }, hoverDuration);
    }
  );

}
//Hover for .kr-add-icon button
function hoverAddKrBtn() {
  var bgColor = $('.kr-add-icon').css("background-color");
  $('.section-okr').on('mouseover', '.kr-add-icon', function () {
    $(this).stop(false, true).animate({
      backgroundColor: '#f7786b'
    }, hoverDuration, );
  }).on('mouseout', '.kr-add-icon', function () {
    $(this).stop(true).animate({
      backgroundColor: bgColor
    }, hoverDuration);
  })
}

//****************************Update data function*************************//

//Check if the user click like button this obj
function checkLike() {
  $(".section-okr").on("custom-checkLike", ".okr", function () {
    var $likeIcon = $(this).find(".like-icon");
    var objID = $(this).attr("data-obj-id");
    var $likeIcon = $(".like-icon[data-obj-id='" + objID + "']");
    //如果還沒按過讚
    if ($likeIcon.attr("data-isLike") == "false") {
      $likeIcon.children("a").attr("class", "fa fa-thumbs-o-up");
    }
    //如果已經按過讚
    else {
      $likeIcon.children("a").attr("class", "fa fa-thumbs-up");
    }
  });
}
//Click like
function clickLike() {
  $(".section-okr").on("click", ".like-icon", function () {
    var objID = $(this).attr("data-obj-id");
    var time = GetDateTime();
    var friendID = "";

    var $likeNum = parseInt($(this).siblings(".like-number").text());
    if ($(this).attr("data-islike") == "false") {
      $(">a", this).attr("class", "fa fa-thumbs-up");
      $(this).attr("data-islike", true);
      $(this).siblings(".like-number").text(++$likeNum);
      ajaxSendLike(objID, friendID, time);

    } else {
      $(">a", this).attr("class", "fa fa-thumbs-o-up");
      $(this).attr("data-islike", false);
      $(this).siblings(".like-number").text(--$likeNum);
      ajaxSendLike(objID, friendID, time);
    }
  });
}
//Select season
function selectSeason() {
  var season;
  var showSeason = $("#selected-season");
  var seasonNow = $("#selected-season").attr("data-season");
  $(".sea-menu-li[data-season='" + seasonNow + "']").hide();

  $(".sea-menu-li").on("click", function () {
    season = $(this).attr("data-season");
    $(".sea-menu-li[data-season='" + season + "']").hide();
    showSeason.text(seasonTrans(season));
    showSeason.attr("data-season", season);
    $(".sea-menu-li[data-season='" + seasonNow + "']").show();
    ajaxRequdOkrs(season);
    seasonNow = season;
  });

}
//Add comment to page
function addCmtToPage(cmtData) {
  // console.log(cmtData);
  var objID = cmtData.obj_ID;
  var cmtInfo = $('#cmt-template').html();
  var template = Handlebars.compile(cmtInfo);
  var cmtData = template(cmtData);
  // console.log(cmtData);
  $('.comment-content[data-obj-id="' + objID + '"]').append(cmtData);
  $(".cmt-prompt[data-obj-id='" + objID + "']").text("更新成功!");

  window.setTimeout(function () {
    $(".cmt-message[data-obj-id='" + objID + "']").val(null);
    $(".cmt-prompt[data-obj-id='" + objID + "']").hide();
    $(".cmt-prompt[data-obj-id='" + objID + "']").text(null);
  }, 1000);

}
//Add comment
function addComment() {
  var objID, $cmtInput, $cmtBtn, cmtTime, firID = "";
  $(".section-okr").on("click", ".cmt-send", function (event) {
    objID = $(this).attr("data-obj-id");
    $cmtInput = $(".cmt-message[data-obj-id='" + objID + "']");
    $cmtBtn = $(".cmt-send[data-obj-id='" + objID + "']");
    $cmtPrompt = $(".cmt-prompt[data-obj-id='" + objID + "']");
    $cmtText = $cmtInput.val().trim();

    if ($cmtText == null || $cmtText.length == 0 ) {
      $cmtPrompt.text("輸入不能為空白!");
      $cmtPrompt.show();
    }
    else {
      $cmtInput.val(null);
      $cmtPrompt.text("留言上傳中...");
      $cmtPrompt.show();
      cmtTime = GetDateTime();
      ajaxSendAddCmt(objID, $cmtText, cmtTime, friID);
    }
  });

  $(".section-okr").on("keyup", ".cmt-message", function (event) {
    if(event.keyCode == 13){
      objID = $(this).attr("data-obj-id");
      $cmtInput = $(".cmt-message[data-obj-id='" + objID + "']");
      $cmtBtn = $(".cmt-send[data-obj-id='" + objID + "']");
      $cmtPrompt = $(".cmt-prompt[data-obj-id='" + objID + "']");
      $cmtText = $cmtInput.val().trim();

      if ($cmtText == null || $cmtText.length == 0 ) {
        $cmtPrompt.text("輸入不能為空白!");
        $cmtPrompt.show();
      }
      else {
        $cmtInput.val(null);
        $cmtPrompt.text("留言上傳中...");
        $cmtPrompt.show();
        cmtTime = GetDateTime();
        ajaxSendAddCmt(objID, $cmtText, cmtTime, friID);
      }
    }

  });


}
//Delete comment
function deleteComment() {
  var cmtID;
  //Click delete comment
  $(".section-okr").on("click", ".cmt-delete", function () {
    $("#cmt-edit-check-section").fadeIn(fadeDuration);
    cmtID = $(this).attr("data-cmt-id");
  });
  //Click confirm to delete
  $("#cmt-edit-btn-confirm").on("click", function () {
    var objID = $(".cmt-user-time[data-cmt-id='" + cmtID + "']").attr("data-obj-id");
    var cmtTime = $(".cmt-user-time[data-cmt-id='" + cmtID + "']").attr("data-cmt-time");
    // console.log(objID);
    // console.log(cmtTime);
    ajaxRequDeleCmt(cmtID, friID, objID, cmtTime);
  });
  //Click cancel to close check box
  $("#cmt-edit-btn-cancel").on("click", function () {
    $("#cmt-edit-check-section").fadeOut(fadeDuration);
  });

}
//Edit comment
function editComment() {
  var cmtID, cmtText, cmtTextNew;
  //Click edit comment
  $(".section-okr").on("click", ".cmt-edit", function () {
    cmtID = $(this).attr("data-cmt-id");
    console.log(cmtID);
    cmtText = $(".cmt-text[data-cmt-id='" + cmtID + "']").text().trim();
    $(".cmt-edit-options[data-cmt-id='" + cmtID + "']").fadeIn(fadeDuration, function () {
      $(".cmt-edit-prompt[data-cmt-id='" + cmtID + "']").text(null);
      $(".cmt-cancel[data-cmt-id='" + cmtID + "']").fadeIn(fadeDuration);
      // $(".cmt-confirm[data-cmt-id='" + cmtID + "']").fadeIn(fadeDuration);
      $(".cmt-text[data-cmt-id='" + cmtID + "']").attr("contenteditable", true).css("outline", "1px solid Aqua").focus();
    });
  });
  //Detect editing
  $(".section-okr").on("keyup paste copy", ".cmt-text", function () {
    cmtID = $(this).attr("data-cmt-id");
    cmtTextNew = $(".cmt-text[data-cmt-id='" + cmtID + "']").text().trim();
    if (cmtTextNew == null || cmtTextNew.length == 0) {
      $(".cmt-cancel[data-cmt-id='" + cmtID + "']").show();
      $(".cmt-confirm[data-cmt-id='" + cmtID + "']").fadeOut();
    }
    else if (cmtText == cmtTextNew) {
      $(".cmt-cancel[data-cmt-id='" + cmtID + "']").show();
      $(".cmt-confirm[data-cmt-id='" + cmtID + "']").fadeOut();
    }
    else {
      $(".cmt-cancel[data-cmt-id='" + cmtID + "']").show();
      $(".cmt-confirm[data-cmt-id='" + cmtID + "']").show();
    }
  });

  //Click cmt edit confirm
  $(".section-okr").on("click", ".cmt-confirm", function () {
    cmtID = $(this).attr("data-cmt-id");
    cmtTextNew = $(".cmt-text[data-cmt-id='" + cmtID + "']").text().trim();
    $(".cmt-edit-prompt[data-cmt-id='" + cmtID + "']").text("系統更新中...");
    ajaxSendEditCmt(cmtID, cmtTextNew);
  });

  //Click cmt edit cancel
  $(".section-okr").on("click", ".cmt-cancel", function () {
    cmtID = $(this).attr("data-cmt-id");
    $(".cmt-text[data-cmt-id='" + cmtID + "']").text(cmtText);
    $(".cmt-edit-options[data-cmt-id='" + cmtID + "']").fadeOut(fadeDuration, function () {
      $(".cmt-text[data-cmt-id='" + cmtID + "']").attr("contenteditable", false).css("outline", "none");
    });
  });
}
//Edit comment success function
function cmtEditSuccess(cmtID) {
  $(".cmt-edit-prompt[data-cmt-id='" + cmtID + "']").text("更新成功!");
  window.setTimeout(function () {
    $(".cmt-edit-options[data-cmt-id='" + cmtID + "']").fadeOut(fadeDuration, function () {
      $(".cmt-text[data-cmt-id='" + cmtID + "']").attr("contenteditable", false).css("outline", "none");
    });
  }, 1000);
}
//Edit key results
function krEdit() {
  var $objID, $krID, $krContent, $krText, $krPrompt, $krEditBtn, $krDelBtn, $krBtns, $confirmBtn
    , $cancelBtn, $updateBtns, $krContent, $slider, $handle, $krProgress, $krProgressNew;

    //Disable kr edit function when user drag or click kr-edit-button
    $(".section-okr").on("custom-krEditing",".slider", function(){
      $(".slider").each(function(){
        if($(this).attr("data-kr-id") != $krID){
          var krID = $(this).attr("data-kr-id");
          $(this).slider( "disable" );
          $(".kr-edit[data-kr-id='" + krID + "']").hide();
          $(".kr-delete[data-kr-id='" + krID + "']").hide();
        }
      });
    });

  //Add listener to slider
  $(".section-okr").on("custom-handleDragging", ".handle", function () {
    $objID = $(this).attr("data-obj-id");
    $krID = $(this).attr("data-kr-id");
    $krContent = $(".kr-text[data-kr-id='" + $krID + "']");

    //使用者直接拖曳模式
    if ($krContent.attr("contenteditable") == "false") {
      $krText = $krContent.text().trim();
      $krPrompt = $(".kr-edit-prompt[data-kr-id='" + $krID + "']");
      $updatedBtns = $(".kr-confirm[data-kr-id='" + $krID + "'], .kr-cancel[data-kr-id='" + $krID + "']");
      $slider = $(".slider[data-kr-id='" + $krID + "']");
      $handle = $(".handle[data-kr-id='" + $krID + "']");
      $krProgress = parseInt($slider.attr("data-kr-progress"));
      $slider.trigger("custom-krEditing");

    }
    //使用者先點擊編輯模式再拖曳
    else {
      $krTextNew = $krContent.text().trim();
      if ($slider.slider("option", "value") == $krProgress && $krText == $krTextNew) {
        $krBtns.show(function () {
          $updatedBtns.hide();
        });
      }
    }

  });
  //Click kr edit icon to start edit mode
  $(".section-okr").on("click", ".kr-edit", function (event) {

    $objID = $(this).attr("data-obj-id");
    $krID = $(this).attr("data-kr-id");
    $krContent = $(".kr-text[data-kr-id='" + $krID + "']");
    $krText = $krContent.text().trim();
    $krPrompt = $(".kr-edit-prompt[data-kr-id='" + $krID + "']");
    $slider = $(".slider[data-kr-id='" + $krID + "']");
    $handle = $(".handle[data-kr-id='" + $krID + "']");
    $krProgress = parseInt($slider.attr("data-kr-progress"));
    $slider.trigger("custom-krEditing");

    //================These variables are kr edit button====================//
    $krEditBtn = $(".kr-edit[data-kr-id='" + $krID + "']");
    $krDelBtn = $(".kr-delete[data-kr-id='" + $krID + "']");
    $krBtns = $(".kr-edit[data-kr-id='" + $krID + "'], .kr-delete[data-kr-id='" + $krID + "']");
    //================These variables are confirm button in kr edit mode====================//
    $confirmBtn = $(".kr-confirm[data-kr-id='" + $krID + "']");
    $cancelBtn = $(".kr-cancel[data-kr-id='" + $krID + "']");
    $updatedBtns = $(".kr-confirm[data-kr-id='" + $krID + "'], .kr-cancel[data-kr-id='" + $krID + "']");
    //======================================================================//

    //step 1: hide kr edit & delete btns and show updated btns
    $krBtns.fadeOut(fadeDuration, function () {
      $updatedBtns.fadeIn(fadeDuration);
      $krContent.attr("contenteditable", true);
      $krContent.focus();
      $krContent.css("background-color", editBgColor);
    });
  });

  //Click confirm
  $(".section-okr").on("click", ".kr-confirm", function () {
    $krID = $(this).attr("data-kr-id");
    $slider = $(".slider[data-kr-id='" + $krID + "']");
    $krContent = $(".kr-text[data-kr-id='" + $krID + "']");
    $krProgressNew = parseInt($slider.slider("option", "value"));
    var $userID = $('#user').attr("data-user-id");
    var $krTextNew = $krContent.text().trim();
    var actTime = GetDateTime();
    var objProgress = 0, sum = 0, count = 0;
    var $allKrSliders = $(".slider[data-obj-id='" + $objID + "']");
    $krPrompt = $(".kr-edit-prompt[data-kr-id='" + $krID + "']");
    // //console.log("$objID: "+$objID);
    ////console.log($allKrs);
    ////console.log($krPrompt);
    // console.log("$krText: " + $krText);
    // console.log("$krTextNew: " + $krTextNew);
    // console.log("$krProgress: " + $krProgress);
    // console.log("$krProgressNew: " + $krProgressNew);
    $(".slider").each(function(){
      if($(this).attr("data-kr-id") != $krID){
        var krID = $(this).attr("data-kr-id");
        $(this).slider( "enable" );
        $(".kr-edit[data-kr-id='" + krID + "']").show();
        $(".kr-delete[data-kr-id='" + krID + "']").show();
      }
    });
    $allKrSliders.each(function () {
      if ($(this).attr("data-kr-id") != $krID) {
        sum += parseInt($(this).attr("data-kr-progress"));
        count++;
      }
    });
    objProgress = ((sum + $krProgressNew) / (count + 1)).toFixed(0);
    // 0 for initial value, 1 for editing whole objective, 2 for editing key result text only, 3 for editing key result progress only, 4 for editing key result both text and progress
    //edit krProgress only
    if (!hasNumber($krTextNew)) {
      $krPrompt.html("關鍵目標必須包含阿拉伯數字!<br>例: 粉絲團人數提升1000人");
    }
    else {
      if ($krText == $krTextNew && $krProgress != $krProgressNew) {
        editStatus = 3;
        $krPrompt.text("更新中...");
        ////console.log("edit krProgress only");
        var actText = "您更新關鍵成果「" + $krText + "」的完成度為" + $krProgressNew + "%。";
        ////console.log("editStatus: " + editStatus);
        ////console.log("$userID: " + $userID);
        ////console.log("$objID: " + $objID);
        ////console.log("objProgress: " + objProgress);
        ////console.log("$krID: " + $krID);
        ////console.log("$krProgressNew: " + $krProgressNew);
        ////console.log("actTime: "+ actTime);
        ////console.log("actText: "+ actText);
        ajaxSendEditKrProgress($userID, $objID, objProgress, $krID, $krProgressNew, actTime, actText);
      }
      //edit krText only
      else if ($krTextNew != $krText && $krProgress == $krProgressNew) {
        ////console.log("edit krText only");
        editStatus = 2;
        $krPrompt.text("更新中...");
        var actText = "您修改關鍵成果為「" + $krTextNew + "」。";
        ajaxSendEditKrText($userID, $objID, $krID, $krTextNew, actTime, actText);
      }
      //edit both krProgress and krText
      else if ($krTextNew != $krText && $krProgress != $krProgressNew) {
        editStatus = 4;
        $krPrompt.text("更新中...");
        var actText0 = "您修改關鍵成果為「" + $krTextNew + "」。";
        var actText1 = "您更新關鍵成果「" + $krTextNew + "」的完成度為" + $krProgressNew + "%。";
        var actText = [actText0, actText1];
        ajaxSendEditKrText($userID, $objID, $krID, $krTextNew, actTime, actText, objProgress, $krProgress);

        ////console.log("edit both krProgress and krText");
      }
      // //Set to original kr view
      $updatedBtns.fadeOut(fadeDuration, function () {
        $krContent.attr("contenteditable", false);   //disable kr content editable function
        //$krBtns.fadeIn(fadeDuration);               //show kr buttons
        $krContent.css("background-color", "#ffffff");   //set original background color kr content
      });
    }
  });
  //Click cancel
  $(".section-okr").on("click", ".kr-cancel", function () {
    // ////console.log("krID: "+ $krID);
    $krID = $(this).attr("data-kr-id");
    $slider = $(".slider[data-kr-id='" + $krID + "']");
    $handle = $(".handle[data-kr-id='" + $krID + "']");
    $sliderRange = $(".ui-slider-range[data-kr-id='" + $krID + "']");
    // //console.log($sliderRange);
    $krProgress = $slider.attr("data-kr-progress");
    $krProgressNew = $slider.slider("option", "value");
    // //console.log("$krProgress: "+$krProgress);
    // //console.log("$krProgressNew: "+$krProgressNew);
    $updatedBtns = $(".kr-confirm[data-kr-id='" + $krID + "'], .kr-cancel[data-kr-id='" + $krID + "']");
    $krBtns = $(".kr-edit[data-kr-id='" + $krID + "'], .kr-delete[data-kr-id='" + $krID + "']");
    $krContent = $(".kr-text[data-kr-id='" + $krID + "']");

    $(".slider").each(function(){
      if($(this).attr("data-kr-id") != $krID){
        var krID = $(this).attr("data-kr-id");
        $(this).slider( "enable" );
        $(".kr-edit[data-kr-id='" + krID + "']").show();
        $(".kr-delete[data-kr-id='" + krID + "']").show();
      }
    });
    //hide updated buttons
    $updatedBtns.fadeOut(fadeDuration, function () {
      $krContent.attr("contenteditable", false);   //disable kr content editable function
      $krBtns.fadeIn(fadeDuration);               //show kr buttons
      $krContent.css("background-color", "#ffffff");   //set original background color kr content
      $slider.slider("option", "value", $krProgress);   //set original value of slider
      if ($krProgress < 10) {
        // //console.log("$krProgress < 10")
        $handle.text($krProgress)   //set original value of slider
        $sliderRange.text("");
      }
      else {
        // //console.log("$krProgress > 10, $krProgress: "+ $krProgress);
        $handle.text(null)   //set original value of slider
        $sliderRange.text($krProgress + "%");
      }
      $krPrompt.text(null);
      $krContent.text($krText);           //set original text of kr text
    });
  });

}
//Edit objective
function objEdit() {
  $(".section-okr").on("click", ".obj-edit", function (event) {
    editStatus = 1;
    var objID = $(this).attr("data-obj-id");
    var $objContent = $(".objective-content[data-obj-id='" + objID + "']");
    var $objBtns = $(".obj-edit-btns[data-obj-id='" + objID + "']");
    $objContent.css("background-color", editBgColor);
    $(".more-option[data-obj-id='" + objID + "']").hide();
    $objBtns.fadeIn(fadeDuration);
    $objContent.attr("contenteditable", "true");
    $objContent.focus();
    var userID = $('#user').attr("data-user-id");
    var objText = $(".objective-content[data-obj-id='" + objID + "']").text().trim();
    var objTextNew;
    var confirmCode = 1;    //1為確定修改 2為確定捨棄
    //偵測輸入內容不能為空白或相同
    $objContent.on("change keyup paste", function (event) {
      document.execCommand("DefaultParagraphSeparator", true, "p");
      objTextNew = $(".objective-content[data-obj-id='" + objID + "']").text().trim();
      if (objTextNew.length == 0) {
        $(".obj-edit-confirm[data-obj-id='" + objID + "']").hide();
        $(".obj-edit-cancel[data-obj-id='" + objID + "']").show();
        $(".obj-edit-prompt").text("目標內容不能為空白!");
        $(".obj-edit-prompt").show();
      }
      else if (objText == objTextNew) {
        $(".obj-edit-confirm[data-obj-id='" + objID + "']").hide();
        $(".obj-edit-cancel[data-obj-id='" + objID + "']").show();
        $(".obj-edit-prompt").text("目標內容未更改!");
        $(".obj-edit-prompt").show();
      }
      else {
        $(".obj-edit-confirm[data-obj-id='" + objID + "']").show();
        $(".obj-edit-cancel[data-obj-id='" + objID + "']").show();
        $(".obj-edit-prompt").text("目標內容不能為空白!");
        $(".obj-edit-prompt").hide();
      }
    });
    //點選放棄按鈕
    $(".section-okr").on("click", ".obj-edit-cancel", function () {
      $("#edit-btn-confirm").text("捨棄");
      $("#edit-check-text").text("確定要捨棄此次修改嗎?");
      confirmCode = 2;
      $("#edit-check-section").fadeIn(fadeDuration, function () {
        $objBtns.children().hide();
      });
    });
    //點選保存按鈕
    $(".section-okr").on("click", ".obj-edit-confirm", function () {
      $("#edit-btn-confirm").text("修改");
      $("#edit-check-text").text("確定要修改此目標嗎?");
      confirmCode = 1;
      $("#edit-check-section").fadeIn(fadeDuration, function () {
        $objBtns.children().hide();
      });

    });
    //確認視窗點選確認
    $("#edit-btn-confirm").on("click", function () {
      //確定修改
      if (confirmCode == 1) {
        objText = $(".objective-content[data-obj-id='" + objID + "']").text().trim();
        var userID = $('#user').attr("data-user-id");
        var actTime = GetDateTime();
        var objSeason = $("#selected-season").attr("data-season");
        // var objSeason = GetSeason();
        var actText = "您修改目標為「" + objText + "」。";
        $("#edit-check-text").text("資料更新中...");
        $objBtns.fadeOut(fadeDuration);
        $("#edit-btn-confirm, #edit-btn-cancel").fadeOut(fadeDuration);
        ajaxSendEditObj(userID, objID, objSeason, objText, actTime, actText);
      }
      //確定捨棄
      else if (confirmCode == 2) {
        $("#edit-check-section").fadeOut(fadeDuration, function () {
          $objContent.text(objText);
          $objBtns.fadeOut(fadeDuration);
          $objContent.css("background-color", "#ffffff");
          $objContent.attr("contenteditable", "false");
          $(".more-option[data-obj-id='" + objID + "']").show();
          $objBtns.children('button').show();
          initEditCheckBox();
        });
      }
    });
    //確認視窗點選取消
    $("#edit-btn-cancel").on("click", function () {
      $("#edit-check-section").fadeOut(fadeDuration);
      if ($objContent.text().trim().length == 0) {
        $objBtns.children('.obj-edit-cancel').show();
      }
      else if (objText == objTextNew) {
        $objBtns.children('.obj-edit-cancel').show();
      }
      else {
        $objBtns.children('button').show();
      }
    });
  });
}
//Click .kr-add-icon button to add one key result
function addKrOnlyBtn() {
  var $krContainer = $('#kr-input-container');
  var $addKrBtn = $('#add-kr');
  var $saveBtn = $('#obj-input-save');
  var $prevBtn = $('#obj-input-prev');
  var $krHint = $('#kr-hint');
  var $krModule = $('#kr-input-module');
  var $krInputHint = $('#kr-input-hint');
  var $krText = $('#kr-input');
  $('.section-okr').on('click', '.kr-add-icon', function () {
    updateStatus = 3;
    //console.log("updateStatus: " + updateStatus);
    var objID = $(this).attr('data-obj-id');
    var objText = $('.objective-content[data-obj-id="' + objID + '"]').text();
    $krText.attr("data-obj-id", objID);
    popUpModal(true);     //open modal
    step2(objText);       //go to step2
    initKrOptions();
    $('#kr-input').val(null);
    $('#obj-input').val(objText);
    $('#add-kr').stop(false, true).hide(function () {
      $krModule.show();
      $krHint.hide();
      $krContainer.hide();
      $saveBtn.hide();
      $prevBtn.hide();
      $krText.focus();
    });

  });
}
//Delete the objective / key results
function deleteOkr() {
  var objID, userID, objText, krID, actTime, krText, actText, krProgress;
  //click delete objective
  $('.section-okr').on('click', '.obj-delete', function () {
    deleteStatus = 1;
    $('.delete-type').text("目標");
    objID = $(this).attr('data-obj-id');
    userID = $('#user').attr("data-user-id");
    objText = "「" + $(".objective-content[data-obj-id='" + objID + "']").text() + "」";
    $('#delete-check-text').text(objText);
    $('.section-popup-delete').fadeIn(fadeDuration);

  });

  //click delete key results
  $('.section-okr').on('click', '.kr-delete', function () {
    deleteStatus = 2;
    $('.delete-type').text("關鍵成果");
    objID = $(this).attr('data-obj-id');
    userID = $('#user').attr("data-user-id");
    krID = $(this).attr('data-kr-id')
    actTime = GetDateTime();
    krText = $('.kr-text[data-kr-id="' + krID + '"]').text();
    actText = "您刪除了關鍵成果「" + krText + "」。";
    krProgress = $('.slider[data-obj-id="' + objID + '"]');
    var sum = 0, count = 0;
    krProgress.each(function (index) {
      var krNumber = parseInt($(this).attr("data-kr-progress"));
      if ($(this).attr("data-kr-id") != krID) {
        sum += krNumber;
        count++;
      }
    });
    if (count == 0) {
      objProgress = 0;
    } else {
      objProgress = (sum / count).toFixed(0);
    }

    $('#delete-check-text').text(krText);
    $('.section-popup-delete').fadeIn(fadeDuration);
  });

  //Click confirm to delete button
  $('#delete-check-box-confirm').on('click', function () {
    $('#delete-input-btns').hide();
    $('.del-process').fadeIn(fadeDuration);
    $('.del-prompt').hide();
    var season = $("#selected-season").attr("data-season");
    if (deleteStatus == 1) {
      ajaxRequDeleObj(userID, objID, season);
    }
    else if (deleteStatus == 2) {
      ajaxRequDeleKr(userID, objID, krID, objProgress, actText, actTime, season);

    }
  });
  //Click cancel button
  $('#delete-check-box-cancel').on('click', function () {
    $('.section-popup-delete').fadeOut(fadeDuration);
  });
}
//Prompt user when deleting obj/kr success
function deleteOkrSuccess(deleteStatus, krID, objID, objProgress) {
  //deleteStatus :1 >> delete whole obj
  if (deleteStatus == 1) {
    $(".okr[data-obj-id='" + objID + "']").remove();
    $('.section-okr').trigger("custom-OkrUpdate");
  }
  //deleteStatus :2 >> delete single kr only
  else if (deleteStatus == 2) {
    $(".percent-number[data-obj-id='" + objID + "']").text(objProgress);
    $(".kr[data-kr-id='" + krID + "']").remove();
    $(".kr-content").trigger("custom-KrUpdate");
  }
  //console.log("deleteSuccess!!");
  $('.del-process').text("刪除成功!");
  window.setTimeout(function () {
    objChartRefresh(objID);
  }, 500);
  window.setTimeout(function () {
    $('.section-popup-delete').fadeOut(fadeDuration);
  }, 1500);
  window.setTimeout(function () {
    initDeleteCheckBox();
  }, 2000);
}
//Animation refresh for .chart objective progress chart
function objChartRefresh(objID) {
  // $(".chart").trigger("custom-refreshChart");


  // custom-sliderUpdate
  // custom-KrUpdate
  if (objID == null) {
    $('.chart').each(function () {
      // console.log($(".chart"));
      var $chart = $(this),
        //Store mask and set to 0 deg
        $circleLeft = $chart.find('.left .circle-mask-inner').css({ transform: 'rotate(0)' }),
        $circleRight = $chart.find('.right .circle-mask-inner').css({ transform: 'rotate(0)' }),
        //get current percentage
        $percentNumber = $chart.find('.percent-number'),
        percentData = parseInt($percentNumber.text());
      if (percentData >= 100) {
        percentData = 100;
      }
      //set current percentage to 0
      $percentNumber.text(0);

      $({ percent: 0 }).delay(500).animate({
        percent: percentData
      }, {
          duration: 1500,
          progress: function () {
            var now = this.percent,
              deg = now * 360 / 100,
              degRight = Math.min(Math.max(deg, 0), 180),
              degLeft = Math.min(Math.max(deg - 180, 0), 1800);
            $circleRight.css({
              transform: 'rotate(' + degRight + 'deg)'
            });
            $circleLeft.css({
              transform: 'rotate(' + degLeft + 'deg)'
            });
            $percentNumber.text(Math.floor(now));

          }

        });

    });
  }
  else {
    var $chart = $('.chart[data-obj-id="' + objID + '"]'),
      //Store mask and set to 0 deg
      $circleLeft = $chart.find('.left .circle-mask-inner').css({ transform: 'rotate(0)' }),
      $circleRight = $chart.find('.right .circle-mask-inner').css({ transform: 'rotate(0)' }),
      //get current percentage
      $percentNumber = $chart.find('.percent-number'),
      percentData = parseInt($percentNumber.text());
    if (percentData >= 100) {
      percentData = 100;
    }
    //set current percentage to 0
    $percentNumber.text(0);
    $({ percent: 0 }).delay(500).animate({
      percent: percentData
    }, {
        duration: 1500,
        progress: function () {
          var now = this.percent,
            deg = now * 360 / 100,
            degRight = Math.min(Math.max(deg, 0), 180),
            degLeft = Math.min(Math.max(deg - 180, 0), 1800);
          $circleRight.css({
            transform: 'rotate(' + degRight + 'deg)'
          });
          $circleLeft.css({
            transform: 'rotate(' + degLeft + 'deg)'
          });
          $percentNumber.text(Math.floor(now));

        }

      });

  }

}
//Slide up/down the kr/comment table
function slideKrCmt() {
  $('.section-okr').on('click', '.kr-upper', function () {
    var id = $(this).attr("data-obj-id");
    $(".kr-content[data-obj-id='" + id + "']").stop(false, true).toggle(fadeDuration);
  });
  $('.section-okr').on('click', '.cmt-upper', function () {
    var id = $(this).attr("data-obj-id");
    $(".comment-content[data-obj-id='" + id + "']").stop(false, true).toggle(fadeDuration);
  });

  // $(".kr-upper").click(function(event) {
  //   event.stopPropagation();
  //   var id = $(this).attr("data-obj-id");
  //   $(".kr-content[data-obj-id='" + id + "']").stop(false,true).toggle(fadeDuration);
  // });
  // $(".cmt-upper").click(function(event) {
  //   event.stopPropagation();
  //   var id = $(this).attr("data-obj-id");
  //   $(".comment-content[data-obj-id='" + id + "']").stop(false,true).toggle(fadeDuration);
  // });
}
//Prompt user when editing obj success
function editOkrSuccess(editStatus, objID, objText) {
  var $objBtns = $(".obj-edit-btns[data-obj-id='" + objID + "']");
  var $objContent = $(".objective-content[data-obj-id='" + objID + "']");
  $("#edit-check-text").text("更新成功!");
  console.log(objText);
  // 0 for initial value, 1 for editing whole objective, 2 for editing key result text only, 3 for editing key result progress only, 4 for editing key result both text and progress
  window.setTimeout(function () {
    if (editStatus == 1) {
      $(".okr[data-obj-id='" + objID + "']").trigger("custom-OkrUpdate");
    }
    objChartRefresh(objID);
  }, 500);
  window.setTimeout(function () {
    $("#edit-check-section").fadeOut(fadeDuration, function () {
      $objBtns.fadeOut(fadeDuration);
      $objContent.css("background-color", "#ffffff");
      // $objContent.text(null);
      $objContent.attr("contenteditable", "false");
      // $objContent.text(objText);
      console.log($objContent.text());
      $(".more-option[data-obj-id='" + objID + "']").show();
    });
  }, 1500);
  window.setTimeout(function () {
    initEditCheckBox();
    // $objContent.text(objText);
  }, 2000);

}
//Prompt user when editing kr success
function editKrSuccess(editStatus, objID, krID, objProgress, krProgress) {
  //console.log("editStatus: " + editStatus);
  //console.log("objID: " + objID);
  //console.log("krID: " + krID);
  //console.log("objProgress: " + objProgress);

  var $krPrompt = $(".kr-edit-prompt[data-kr-id='" + krID + "']");
  var $krBtns = $("a.kr-edit[data-kr-id='" + krID + "'], a.kr-delete[data-kr-id='" + krID + "']");
  //console.log($krBtns);
  // 0 for initial value, 1 for editing whole objective, 2 for editing key result text only, 3 for editing key result progress only, 4 for editing key result both text and progress
  if (editStatus == 2) {
    $(".kr-content[data-obj-id='" + objID + "']").trigger("custom-KrUpdate");
  }
  else if (editStatus == 3 || editStatus == 4) {
    // $objNumber.text(objProgress);
    $(".okr[data-obj-id='" + objID + "']").trigger("custom-updateOkr");
    $(".kr-content[data-obj-id='" + objID + "']").trigger("custom-KrUpdate");
    if (krProgress != null) {
      $(".slider[data-kr-id='" + krID + "']").attr("data-kr-progress", krProgress);
    }
  }
  window.setTimeout(function () {
    var $objNumber = $(".percent-number[data-obj-id='" + objID + "']");
    $objNumber.text(objProgress);
    objChartRefresh(objID);
    $krBtns.fadeIn(fadeDuration);
    $krPrompt.text("更新成功!");
  }, 500);
  window.setTimeout(function () {
    $krPrompt.text(null);
  }, 1500);
}
//Initi  delete checkbox
function initDeleteCheckBox() {
  $('.del-process').hide();
  $('.del-prompt').show();
  $('#delete-input-btns').show();

}
//Initi edit checkbox
function initEditCheckBox() {
  $("#edit-check-box>input-btns check").show();
  $("#edit-btn-cancel, #edit-btn-confirm").show();
}
// Load all of javacripts after dynamic HTML generation
function afterLoading() {
  selectSeason();
  headerAfterLoading();
  okrDataCheck();
  setFriID();
  actDotUpdate();
  clickOutMenu();
  pressKeyBoard();
  resizeAddOkrBtn();
  objDropDownMenu()
  hoverAddOkrBtn();
  hoverAddKrBtn();
  objChartRefresh();
  seaDropDownMenu();
  cmtDropDownMenu();
  actSlideIn();
  slideKrCmt();
  addKrOnlyBtn();
  addComment();
  deleteComment();
  editComment();
  deleteOkr();
  objEdit();
  krEdit();
  initSlider();
  clickLike();
  checkLike();

  initiModal();
  modalControlFlow();
  clickAddOkrBtn();
  checkObjInput();
  CheckBox();
  clickAddKrBtn();
  clickKrOptions();
  expandKrOptions();
  ajaxRequKrSug();
}

//***************************OKR Modal control function***********************//

//init modal menu
function initiModal() {
  var $objInput = $('#obj-input');
  var $modalSlide = $('#modal-slide');
  var $saveBtn = $('#obj-input-save');
  var $nextBtn = $('#obj-input-next');
  var $disBtn = $('#obj-input-discard');
  var $prevBtn = $('#obj-input-prev');
  var $step1 = $('.step-1');
  var $step2 = $('.step-2');
  var $step3 = $('.step-3');
  var $stepDotColor = "#c2c1c9";
  var $stepNowColor = "#54c8cf";
  addKrCount = 1;
  step = 1;
  $objInput.val(null).focus();
  $('#update-text').html("資料更新中");
  $('#update-progress').show();
  $('#kr-input-container').html(null);
  step1();
  initKrOptions();
  $('#kr-input').val(null);
  $step1.css("background-color", $stepNowColor);
  $step2.css("background-color", $stepDotColor);
  $step3.css("background-color", $stepDotColor);
  $modalSlide.css("left", "0");
  $saveBtn.css("display", "none");
  $nextBtn.css("display", "none");
  $disBtn.css("display", "inline-block");
  $prevBtn.css("display", "none");
  $('.check-box').css("display", "none");

  $('#add-kr').show();
  $('#kr-input-module').hide();
  $('#kr-hint').show();
  $('#kr-input-container').show();
  $('#kr-input-hint').text(null);

}
//Show or hide section-modal
function popUpModal(turnOn) {
  $sectionOkr = $('.section-modal');
  $sectionBlur = $('header, section');
  if (turnOn == true) {
    $({ blurRadius: 0 }).animate({
      blurRadius: 5
    }, {
        duration: 500,
        easing: 'swing', // or "linear"
        // use jQuery UI or Easing plugin for more options
        step: function () {
          // //console.log(this.blurRadius);
          $sectionBlur.css({
            "-webkit-filter": "blur(" + this.blurRadius + "px)",
            "filter": "blur(" + this.blurRadius + "px)"
          });
        }
      });
    $sectionOkr.fadeIn(fadeDuration, function () {
      $('#obj-input').focus();
    });
  }
  else {
    $({ blurRadius: 5 }).animate({ blurRadius: 0 }
      , {
        duration: 500,
        easing: 'swing',
        step: function () {
          $sectionBlur.css({
            "-webkit-filter": "blur(" + this.blurRadius + "px)",
            "filter": "blur(" + this.blurRadius + "px)"
          });
        }
      });
    $sectionOkr.fadeOut(fadeDuration, function () {
      initiModal();
    });
  }
}
//Control flow of modal menu
function modalControlFlow() {
  step = 1;
  var $disBtn = $('#obj-input-discard');    //捨棄 按鈕
  var $nextBtn = $('#obj-input-next');      //下一步 按鈕
  var $prevBtn = $('#obj-input-prev');      //上一步 按鈕
  var $saveBtn = $('#obj-input-save');      //儲存按鈕
  var $objInput = $('#obj-input');        //目標輸入框
  var $krItem = $('.kr-input-content');   //新增的kr項目
  var $btn = $('.input-btn');             //偵測所有modal的按鈕
  var $checkBtnDis = $('#check-box-discard');
  var $checkBox = $('.check-box');
  var $modalSlide = $('#modal-slide');
  var $stepDotColor = "#c2c1c9";
  var $stepNowColor = "#54c8cf";
  var $width = 0;
  var objText,
    objTime,
    actText,
    userID,
    objSeason;
  //button detect
  $btn.stop(false, true).on("click", function (event) {
    event.stopPropagation();
    if (step == 1) {
      var objInputText = $objInput.val().trim();
      if ($(this).is($nextBtn) && objInputText != "") {
        actTime = GetDateTime();                                 //restore date and time
        objText = $objInput.val();                              //restore objective text
        actText = "您新增了「" + $objInput.val() + "」的目標。"; //restore Activity
        userID = $('#user').attr("data-user-id");             //restore userID
        objSeason = $("#selected-season").attr("data-season");                              //restore current season
        step2(objText);
      }
      if ($(this).is($disBtn)) {
        if ($('#obj-input').val().trim().length != 0) {
          $checkBox.fadeIn(fadeDuration);
        } else {
          popUpModal(false);
        }
      }
    }
    else if (step == 2) {
      if ($(this).is($prevBtn)) {
        step1(objText);
        var curText = $objInput.val().trim();
        if (curText.length == 0) {
          $nextBtn.hide();
        }
        else {
          $nextBtn.show();
        }
      }
      else if ($(this).is($saveBtn)) {
        $krItem = $('.kr-input-content');
        if ($krItem.length == 0) {
          updateStatus = 1;       //updateStatus = 1 indicate add obj only
          //console.log("updateStatus: " + updateStatus);
        }
        else {
          updateStatus = 2;     //updateStatus = 2 indicate add obj and kr
          //console.log("updateStatus: " + updateStatus);
        }
        ajaxSendAddObj(userID, objSeason, objText, actTime, actText);   //ajax
        step3();
      }
      else if ($(this).is($disBtn)) {
        $checkBox.fadeIn(fadeDuration);
      }
    }
    else if (step == 3) {

    }
  });
  //click cancel in check box to init objText & objTime
  $checkBtnDis.on("click", function () {
    step = 1;
    objText = null;
    objTime = null;
  });
}
// Move to step1 in modal
function step1(objText) {
  var $objInput = $('#obj-input');        //目標輸入框
  var $nextBtn = $('#obj-input-next');      //下一步 按鈕
  var $prevBtn = $('#obj-input-prev');      //上一步 按鈕
  var $saveBtn = $('#obj-input-save');      //儲存按鈕
  var $stepDotColor = "#c2c1c9";
  var $stepNowColor = "#54c8cf";
  step = 1;
  $('#modal-slide').animate({
    left: 0 + "px"
  }, fadeDuration);
  // $('#modal-obj').show(function(){
  //     $('#modal-slide').animate({
  //       left: 0 + "px"
  //     }, fadeDuration);
  //   $('#modal-confirm').hide();
  //   $('#modal-kr').hide();
  //});
  // $('#modal-kr').show(function(){
  //   $('#modal-slide').animate({
  //     left: 0 + "px"
  //   }, fadeDuration);
  //   $('#modal-obj').css("display","block");
  $('.step-2').css("backgroundColor", $stepDotColor);
  $prevBtn.hide();
  // $nextBtn.hide();
  $saveBtn.hide();
  $objInput.focus();

}
// Move to step2 in modal
function step2(objText) {
  var $nextBtn = $('#obj-input-next');      //下一步 按鈕
  var $prevBtn = $('#obj-input-prev');      //上一步 按鈕
  var $saveBtn = $('#obj-input-save');      //儲存按鈕
  var $stepNowColor = "#54c8cf";
  step = 2;
  $width = -1 * parseFloat($('#modal-slide').width());
  $('#obj-text').html(objText);
  $('#modal-slide').animate({
    left: $width + "px"
  }, fadeDuration);
  // $('#modal-kr').show(function(){
  //   $('#modal-slide').animate({
  //     left: $width + "px"
  //   },fadeDuration);
  //   $('#modal-obj').hide();
  //   $('#modal-confirm').hide();
  //});
  $('.step-2').css("backgroundColor", $stepNowColor);
  $prevBtn.show();
  $nextBtn.hide();
  $saveBtn.show();
}
// Move to step3 in modal
function step3() {
  var $prevBtn = $('#obj-input-prev');      //上一步 按鈕
  var $saveBtn = $('#obj-input-save');      //儲存按鈕
  var $disBtn = $('#obj-input-discard');    //捨棄 按鈕
  var $stepNowColor = "#54c8cf";
  var $width = -2 * parseFloat($('#modal-content').width());
  step = 3;
  $('#modal-slide').animate({
    left: $width + "px"
  }, fadeDuration);

  // $('#modal-confirm').show(function(){
  //   $('#modal-slide').animate({
  //     left: $width + "px"
  //   },fadeDuration, function(){
  //     $('#modal-kr').hide();
  //     $('#modal-obj').hide();
  //   });
  //});
  $saveBtn.hide();
  $prevBtn.hide();
  $disBtn.hide();
  $('.step-3').css("backgroundColor", $stepNowColor);
}
//Visual effect when successfully add data
function addOkrSuccess(objID) {
  // 0 for initial value, 1 for add objective, 2 for add objective and key results, 3 for add key result only
  window.setTimeout(function () {
    if (updateStatus == 1) {
      $('.section-okr').trigger("custom-OkrUpdate");
      $('.kr-content').trigger("custom-KrUpdate");
    }
    else if (updateStatus == 2) {
      $('.section-okr').trigger("custom-OkrUpdate");
      $(".kr-content[data-obj-id='" + objID + "']").trigger("custom-KrUpdate");
    }
    else if (updateStatus == 3) {
      $(".kr-content[data-obj-id='" + objID + "']").trigger("custom-KrUpdate");
    }
    $('.slider-content').trigger("custom-sliderUpdate");
    $('#update-text').html('更新完成!');
  }, 1000);
  $('#update-progress').delay(1000).fadeOut();
  window.setTimeout(function () {
    popUpModal(false);
  }, 1500);
  window.setTimeout(function () {
    objChartRefresh(objID);
  }, 500);
}
//click #add-okr button to pop up section-modal
function clickAddOkrBtn() {
  $('#add-okr').stop(false, true).on("click", function (event) {
    event.stopPropagation();
    updateStatus = 1;
    //console.log("updateStatus: " + updateStatus);
    initiModal();
    popUpModal(true);
    step1();
  });
}
//monitor the #obj-input obj input to show up next button
function checkObjInput() {
  $objInput = $('#obj-input');
  $nextBtn = $('#obj-input-next');
  $objInput.on("change keyup paste", function (event) {
    event.stopPropagation();
    var curText = $(this).val().trim();
    if (curText.length == 0) {
      $nextBtn.hide();

    } else {
      $nextBtn.fadeIn(fadeDuration / 2);
    }
  });
}
//Dynamically generate kr information in add-kr module
function addKeyResult(krText, addKrCount) {
  var $krContainer = $('#kr-input-container');
  var $krSn = $('<div class="kr-input-sn" data-obj-id="" data-kr-id="">');
  var $krText = $('<div class="kr-input-text" data-obj-id="" data-kr-id="" data-act-time="" data-act-text="">');
  var $krDel = $('<i class="fa fa-trash kr-input-delete" aria-hidden="true">');
  $krText.attr("data-act-time", GetDateTime);
  var actStr = "您新增關鍵成果「" + krText + "」。";
  $krText.attr("data-act-text", actStr);
  $krSn.text(addKrCount + ".");
  $krText.text(krText);
  var $krContent = $('<div class="kr-input-content" data-obj-id="">').append($krSn, $krText, $krDel);
  $krContainer.append($krContent);
}
//Return current time ex: "2017-10-18 16:12:4"

function CheckBox() {
  var $objDisBtn = $('#obj-input-discard');
  var $checkBox = $('.check-box');
  var $checkBtnCan = $('#check-box-cancel');
  var $checkBtnDis = $('#check-box-discard');

  //click cancel button in check box to hide check box
  $checkBtnCan.stop(true).on('click', function (event) {
    event.stopPropagation();
    $checkBox.fadeOut(fadeDuration);
  });
  //click discard button in check box to close modal
  $checkBtnDis.stop(true).on('click', function (event) {
    event.stopPropagation();
    $checkBox.fadeOut(fadeDuration);
    popUpModal(false);
  });
}
//click #add-kr button to show input prompt
function clickAddKrBtn() {
  var $krContainer = $('#kr-input-container');
  var $addKrBtn = $('#add-kr');
  var $krCanBtn = $('#kr-input-cancel');
  var $krOkBtn = $('#kr-input-ok');
  var $saveBtn = $('#obj-input-save');
  var $prevBtn = $('#obj-input-prev');
  var $krHint = $('#kr-hint');
  var $krModule = $('#kr-input-module');
  var $krInputHint = $('#kr-input-hint');
  var $krText = $('#kr-input');
  var $krDelete = $('.kr-input-delete');
  $addKrBtn.on("click", function (event) {
    event.stopPropagation();
    updateStatus = 1;
    //console.log("updateStatus: " + updateStatus);

    initKrOptions();
    $('#kr-input').val(null);
    $(this).stop(true).fadeOut(fadeDuration / 2, function () {
      $krModule.fadeIn(fadeDuration);
      $krHint.hide();
      $krContainer.hide();
      $saveBtn.hide();
      $prevBtn.hide();
      $krText.focus();
    });
  });
  $krCanBtn.on("click", function (event) {
    event.stopPropagation();
    initKrOptions();
    $('#kr-input').val(null);
    if (updateStatus == 1 || updateStatus == 2) {
      $krModule.stop(true).fadeOut(fadeDuration, function () {
        $krHint.show();
        $addKrBtn.show();
        $krContainer.show();
        $saveBtn.show();
        $prevBtn.show();
      });
    }
    else if (updateStatus == 3) {
      popUpModal(false);
    }
  });
  $krOkBtn.on("click", function (event) {
    event.stopPropagation();
    initKrOptions();
    var krText = $('#kr-input').val().trim();
    if (updateStatus == 1 || updateStatus == 2) {
      if (krText.length == 0) {
        $krInputHint.text("內容不能為空白!").css("display", "inline");
      }
      else if (!hasNumber(krText)) {
        $krInputHint.html("關鍵目標必須包含阿拉伯數字!<br>例: 粉絲團人數提升1000人").css("display", "inline");
      }
      else {
        $krInputHint.css("display", "none");
        addKeyResult(krText, addKrCount++);
        $krModule.stop(true).fadeOut(fadeDuration, function () {
          $krHint.show();
          $saveBtn.show();
          $prevBtn.show();
          $krContainer.show();
          if (addKrCount <= 5) {
            $addKrBtn.show();
          }
        });
      }
    }
    else if (updateStatus == 3) {   //在已存在的OKR模組中新增kr
      console.log("add kr success");
      if (krText.length == 0) {
        $krInputHint.text("內容不能為空白!").css("display", "inline");
      }
      else if (!hasNumber(krText)) {
        $krInputHint.html("關鍵目標必須包含阿拉伯數字!<br>例: 粉絲團人數提升1000人").css("display", "inline");
      }
      else {
        $krInputHint.css("display", "none");
        var objID = $krText.attr("data-obj-id");
        // console.log("objID: " + objID);
        // var objID_JSON = "{obj_ID:" + id + "}";
        var userID = $('#user').attr("data-user-id");
        var actTime = GetDateTime();
        var actText = "您新增了關鍵成果「" + krText + "」。";
        var $krProgress = $(".slider[data-obj-id='" + objID + "']");
        var curKrNumber = $krProgress.length;
        var sum = 0, obj_progress = 0;
        $krProgress.each(function (index) {
          sum += parseInt($(this).attr("data-kr-progress"));
        });
        objProgress = (sum / (curKrNumber + 1)).toFixed(0);
        ajaxSendAddOneKr(userID, objID, krText, actTime, actText, objProgress);
        step3();
      }
    }
  });
  $krContainer.on("click", ".kr-input-delete", function (event) {
    event.stopPropagation();
    addKrCount--;
    var curCount = $(this).siblings('.kr-input-sn').text().substr(0, 1);
    $('.kr-input-sn').each(function () {
      var n = $(this).text().substr(0, 1);
      if (curCount == 1) {
        n = n - 1;
        $(this).text(n + ".");
      } else {
        if (n > curCount) {
          n = n - 1;
          $(this).text(n + ".");
        }
      }
    });
    $(this).closest('.kr-input-content').hide(fadeDuration, function () {
      $(this).closest('.kr-input-content').remove();
      if (addKrCount <= 5) {
        $addKrBtn.fadeIn(fadeDuration);
      }
    });
  });

}
// Check if string contains number
function hasNumber(myString) {
  return /\d/.test(myString);
}
//click kr suggestion bottom to slide in windows
function clickKrOptions() {
  var $krMenu = $('#kr-input-options');
  var $krPromptBtn = $('#kr-prompt-options');
  $krWidth = $('#kr-input-options').css("right");
  //click krbtn to silde in
  $krPromptBtn.on("click", function (event) {
    event.stopPropagation();
    if ($(this).hasClass("show")) {
      $(this).removeClass("show");
      $krMenu.stop(false, true).animate({
        right: $krWidth
      }, fadeDuration);
    }
    else {
      $(this).addClass("show");
      $krMenu.stop(false, true).animate({
        right: 0
      }, fadeDuration);
    }
  });
}
//click to expand key result suggested options
function expandKrOptions() {
  // $subMenu = $('.sub-menu');
  // $title = $('.sub-menu-title');
  // $krItem = $('.kr-item');
  var $rightArrow = '<i class="fa fa-chevron-right" aria-hidden="true" style=""></i>';
  //close other job category while opening one job category
  $("#kr-input-options").on("click", ".sub-menu-title", function () {
    $('.sub-menu.show').stop(true).removeClass("show").slideUp('fast');
    $('.sub-menu-title.show').stop(true).removeClass("show").css("background-color", $bgColor);

    if ($(this).siblings('.sub-menu').css("display") == "none") {
      $(this).addClass("show");
      $(this).siblings('.sub-menu').addClass("show");
      $(this).siblings('.sub-menu').stop(true).slideDown('slow', 'swing');
      $(this).children('.fa-chevron-right').stop(true).css('transform', 'rotate(90deg)');
      $(this).css("background-color", "#54c8cf");
    }
    else {
      $(this).removeClass("show");
      $(this).siblings('.sub-menu').removeClass("show");
      $(this).siblings('.sub-menu').stop(true).slideUp('fast');
      $(this).children('.fa-chevron-right').stop(true).css('transform', 'rotate(0deg)');
      $(this).css("background-color", $bgColor);
    }
  });

  $("#kr-input-options").on("mouseover", ".kr-item", function () {
    $(this).prepend($rightArrow);
  });
  $("#kr-input-options").on("mouseout", ".kr-item", function () {
    $(this).children().remove('.fa-chevron-right');
  });

  $("#kr-input-options").on("click", ".kr-item", function () {
    $krBg = $(this).css("background-color");
    $(this).animate({
      backgroundColor: "#8de9c2"
    }, 300, function () {
      $(this).animate({
        backgroundColor: $krBg
      }, 300)
    });
    var text = $('> .kr-item-text', this).html();
    $('#kr-input').val(text);
  });

  // $title.on("click", function(event) {
  //   event.stopPropagation();
  //   $('.sub-menu.show').stop(true).removeClass("show").slideUp('fast');
  //   $('.sub-menu-title.show').stop(true).removeClass("show").css("background-color", $bgColor);
  //
  //   if ($(this).siblings('.sub-menu').css("display") == "none") {
  //     $(this).addClass("show");
  //     $(this).siblings('.sub-menu').addClass("show");
  //     $(this).siblings('.sub-menu').stop(true).slideDown('slow', 'swing');
  //     $(this).children('.fa-chevron-right').stop(true).css('transform', 'rotate(90deg)');
  //     $(this).css("background-color", "#54c8cf");
  //   } else {
  //     $(this).removeClass("show");
  //     $(this).siblings('.sub-menu').removeClass("show");
  //     $(this).siblings('.sub-menu').stop(true).slideUp('fast');
  //     $(this).children('.fa-chevron-right').stop(true).css('transform', 'rotate(0deg)');
  //     $(this).css("background-color", $bgColor);
  //   }
  // });
  //hover effect for each kr-item
  // $krItem.hover(function() {
  //   $(this).prepend($rightArrow);
  // }, function() {
  //   $(this).children().remove('.fa-chevron-right');
  // });
  //click kr-item to copy into inputbox
  // $krItem.on("click", function(event) {
  //   event.stopPropagation();
  //   $krBg = $(this).css("background-color");
  //   $(this).animate({
  //     backgroundColor: "#8de9c2"
  //   }, 300, function() {
  //     $(this).animate({
  //       backgroundColor: $krBg
  //     }, 300)
  //   });
  //
  //   var text = $('> .kr-item-text', this).html();
  //   $('#kr-input').val(text);
  // });
}
//init kr options sub-menu
function initKrOptions() {
  var $krMenu = $('#kr-input-options');
  $('#kr-prompt-options').removeClass("show");
  $krMenu.animate({
    right: $krWidth
  }, fadeDuration);
  $('.sub-menu.show').stop(true).removeClass("show").slideUp('fast');
  $('.sub-menu-title.show').stop(true).removeClass("show").css("background-color", $bgColor);
  $('.sub-menu-title').children('.fa-chevron-right').stop(true).css('transform', 'rotate(0deg)');
}

//==================These are data loading requests using ajax ===============//

//程式載入起始點 load noficiations data
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
      ajaxRequProfile(season);
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
//load profile data
function ajaxRequProfile(season) {
  $.ajax({
    url: url_profile,
    type: 'GET',
    dataType: 'json',
    success: function (dataJSON) {
      var data = JSON.parse(dataJSON);
      console.log(data);
      Handlebars.registerHelper("formatSeason", function (text) {
        var str = seasonTrans(text);
        return new Handlebars.SafeString(str);
      });
      var profileInfo = $("#profile-template").html();
      var template = Handlebars.compile(profileInfo);
      var profileData = template(data);
      $('.section-profile').html(profileData);
      var userID = data.profile.profile_user_id;
      $("#options-fa-home").attr("data-user-id", userID);
      $("#selected-season").attr("data-season", season);   //將指定季度輸入data-season
      $("#selected-season").text(seasonTrans(season));    //將指定季度輸入顯示畫面 e.g. 201704>>2017 Q4
      ajaxRequdOkrs(season);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    },
    complete: function () {
      //console.log("profile done")
    }
  });
}
//Load all okrs data into and call afterLoading function
function ajaxRequdOkrs(season) {
  var objectives = { "season": season };
  var objectives_JSON = JSON.stringify({ objectives });
  $("#update-okr-progress").show();
  $.ajax({
    url: url_okrs,
    type: 'GET',
    dataType: 'json',
    data: { test: objectives_JSON },
    success: function (dataJSON) {
      var data = JSON.parse(dataJSON);
      console.log(data);
      Handlebars.registerHelper("formatDate", function (text) {
        str = formatDate(text);
        return new Handlebars.SafeString(str);
      });
      Handlebars.registerHelper("formatCmtDate", function (text) {
        var str = formatDateToNow(text);
        return new Handlebars.SafeString(str);
      });
      Handlebars.registerHelper("formatCmtURL", function (url) {
        if (url != "/profile") {
          url = url + "&season=" + GetSeason() + "&time=" + GetDateTime();
        } else {
          url = url + "/?season=" + GetSeason();
        }
        return new Handlebars.SafeString(url);
      });
      var okrInfo = $('#okr-template').html();
      var template = Handlebars.compile(okrInfo);
      var okrData = template(data);
      $(".okr").remove();
      $("#update-okr-progress").hide();
      $('.section-okr').append(okrData);
      if (loadOkrs == false) {
        afterLoading();
        loadOkrs = true;
      }
      else {
        $('.slider-content').trigger("custom-sliderUpdate");   //trigger slider loading event
        objChartRefresh();
      }
      $(".section-okr").trigger("custom-OkrUpdate");
      $('.okr').trigger("custom-sliderUpdate");   //trigger slider loading event
      $('.okr').trigger("custom-checkLike"); // trigger like check event
      // console.log("Selected season: " + GetSelSeason());
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    },
    complete: function () {
      //console.log("okr done");
    }
  });
}
//request server to ask data
function ajaxRequestNewObj(userID, obj_JSON) {
  var objData = JSON.parse(obj_JSON);
  var objID = objData.objectives.obj_ID;
  $.ajax({
    url: url_okrs,
    type: 'GET',
    dataType: 'json',
    data: { test: obj_JSON },
    timeout: 5000,
    success: function (respData, textStatus, jqXHR) {
      //updateStatus = 1 indicate add obj only no krs
      if (updateStatus == 1) {
        var data = JSON.parse(respData);
        Handlebars.registerHelper("formatDate", function (text) {
          var str = formatDate(text);
          return new Handlebars.SafeString(str);
        });
        var okrInfo = document.getElementById("okr-template").innerHTML;
        var template = Handlebars.compile(okrInfo);
        var okrData = template(data);
        $('.section-okr').prepend(okrData); //Add new obj at top of page
        addOkrSuccess();
      }
      else if (updateStatus == 2) {
        ajaxSendAddKr(userID, obj_JSON);
      }
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
//request server to ask data
function ajaxRequestNewKr(userID, obj_JSON) {
  //console.log(objID_JSON);
  $.ajax({
    url: url_okrs,
    type: 'GET',
    dataType: 'json',
    data: { test: obj_JSON },
    timeout: 5000,
    success: function (respData, textStatus, jqXHR) {
      var data = JSON.parse(respData);
      //console.log(data);
      Handlebars.registerHelper("formatDate", function (text) {
        var str = formatDate(text);
        return new Handlebars.SafeString(str);
      });
      var okrInfo = document.getElementById("okr-template").innerHTML;
      var template = Handlebars.compile(okrInfo);
      var okrData = template(data);
      $('.section-okr').prepend(okrData);
      addOkrSuccess();
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
//request server to ask data
function ajaxRequestUpdateKr(userID, objID, kr_JSON) {
  // var objID = JSON.parse(objID_JSON).obj_ID;
  var season = JSON.parse(kr_JSON).objectives.season;
  var objectives = {
    "obj_ID": objID,
    "season": season
  }
  var objID_JSON = JSON.stringify({ objectives });
  $.ajax({
    url: url_okrs,
    type: 'GET',
    dataType: 'json',
    data: { test: objID_JSON },
    timeout: 5000,
    success: function (respData, textStatus, jqXHR) {
      var data = JSON.parse(respData).objectives[0];
      console.log(data);
      Handlebars.registerHelper("formatDate", function (text) {
        var str = formatDate(text);
        return new Handlebars.SafeString(str);
      });
      var krInfo = document.getElementById("kr-template").innerHTML;
      var template = Handlebars.compile(krInfo);
      var krData = template(data);
      $(".kr[data-obj-id='" + objID + "']").remove();
      $(".kr-content[data-obj-id='" + objID + "']").prepend(krData);
      $(".percent-number[data-obj-id='" + objID + "']").html(data.obj_progress);
      var actInfo = document.getElementById("act-template").innerHTML;
      var template = Handlebars.compile(actInfo);
      var actData = template(data);
      $(".history-li[data-obj-id='" + objID + "']").remove();
      $(".history-content[data-obj-id='" + objID + "']").prepend(actData);

      addOkrSuccess(objID);
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
//request server to delete obj
function ajaxRequDeleObj(userID, objID, season) {
  var DeleteObjective = { "obj_userID": userID, "obj_ID": objID, "season": season };
  var DeleteObjective_JSON = JSON.stringify({ DeleteObjective });
  $.ajax({
    url: url_deleObj,
    type: 'POST',
    dataType: 'json',
    data: { test: DeleteObjective_JSON },
    timeout: 5000,
    success: function (respData, textStatus, jqXHR) {
      deleteOkrSuccess(deleteStatus, "", objID);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log(jqXHR);
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    }
  });
}
//request server to delete kr
function ajaxRequDeleKr(userID, objID, krID, objProgress, actText, actTime, season) {
  var DeleteKeyResult = {
    "obj_userID": userID,
    "obj_ID": objID,
    "obj_progress": objProgress,
    "season": season,
    "kr_ID": krID,
    "act_text": actText,
    "del_time": actTime
  };
  var DeleteKeyResult_JSON = JSON.stringify({ DeleteKeyResult });
  //console.log(DeleteKeyResult_JSON);

  $.ajax({
    url: url_deleKr,
    type: 'POST',
    dataType: 'json',
    data: { test: DeleteKeyResult_JSON },
    timeout: 5000,
    success: function (respData, textStatus, jqXHR) {
      var data = { "activities": [{ "act_text": actText, "act_time": actTime }] };
      //console.log(data);
      var actInfo = document.getElementById("act-template").innerHTML;
      var template = Handlebars.compile(actInfo);
      var actData = template(data);
      $(".history-content[data-obj-id='" + objID + "']").prepend(actData);
      deleteOkrSuccess(deleteStatus, krID, objID, objProgress);
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
//request server to delete cmt data
function ajaxRequDeleCmt(cmtID, friID, objID, cmtTime) {
  var cmt = {
    "cmt_ID": cmtID,
    "friendID": friID,
    "obj_ID": objID,
    "cmt_time": cmtTime
  };
  var cmtData = JSON.stringify(cmt);
  // console.log(cmt);
  // console.log(cmtData);
  $.ajax({
    url: url_deleCmt,
    type: 'GET',
    dataType: 'json',
    data: { test: cmtData },
    timeout: 5000,
    success: function (respData, textStatus, jqXHR) {
      //console.log(data);
      $("#cmt-edit-check-section").fadeOut(fadeDuration);
      $(".cmt[data-cmt-id='" + cmtID + "']").remove();
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
//request kr sugeestion
function ajaxRequKrSug() {
  $.ajax({
    url: url_krSug,
    type: 'GET',
    dataType: 'json',
    success: function (dataJSON) {
      var data = JSON.parse(dataJSON);
      console.log(data);
      var krSugInfo = $('#kr-suggestion-template').html();
      var template = Handlebars.compile(krSugInfo);
      var krSugData = template(data);
      $(".main-menu").append(krSugData);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    },
    complete: function () {
      //console.log("kr suggestion done");
    }
  });

}

//===========================These are data sending using ajax================//

//Send like data to server
function ajaxSendLike(objID, friendID, time) {
  var like = {
    "obj_ID": objID,
    "friendID": friendID,
    "time": time
  }
  var likeData = JSON.stringify(like);
  console.log(likeData);

  $.ajax({
    url: url_like,
    type: 'GET',
    dataType: 'json',
    data: { test: likeData },
    timeout: 5000,
    success: function (respData, textStatus, jqXHR) {
      // var data = JSON.parse(respData);
      // console.log(data);
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
//Send updated comment dat to server
function ajaxSendEditCmt(cmtID, cmtText) {
  var cmt = {
    "cmt_text": cmtText,
    "cmt_ID": cmtID
  }
  var editCmt = JSON.stringify({ cmt });
  $.ajax({
    url: url_editCmt,
    type: 'GET',
    dataType: 'json',
    data: { test: editCmt },
    timeout: 5000,
    success: function (cmt_JSON, textStatus, jqXHR) {
      console.log("edit cmt success!");
      cmtEditSuccess(cmtID);
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
//Send new comment to server via ajax and get cmt_userID
function ajaxSendAddCmt(objID, $cmtText, cmtTime, friID) {
  var cmt = {
    "obj_ID": objID,
    "cmt_text": $cmtText,
    "cmt_time": cmtTime,
    "friendID": friID
  };
  var addCmt = JSON.stringify(cmt);
  console.log(addCmt);
  $.ajax({
    url: url_addCmt,
    type: 'GET',
    dataType: 'json',
    data: { test: addCmt },
    timeout: 5000,
    success: function (cmt_JSON, textStatus, jqXHR) {
      var cmtData = JSON.parse(cmt_JSON);
      console.log(cmtData);
      console.log("add cmt success!");
      addCmtToPage(cmtData);
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
//Send new obj json to server via ajax and get obj_ID
function ajaxSendAddObj(userID, objSeason, objText, actTime, actText) {
  var AddObjective = new Array();
  var comments = new Array();
  var keyResults = new Array();
  var likeUsers = new Array();
  var activities = new Array();
  activities.push({ "act_time": actTime, "act_text": actText });  //activity for adding obj
  var objective = {
    "obj_ID": "",
    "user_ID": userID,
    "obj_text": objText,
    "obj_season": objSeason,
    "obj_progress": 0,
    "obj_likeNumber": 0,
    "obj_likeUsers": likeUsers,
    "keyResults": keyResults,
    "comments": comments,
    "activities": activities
  }
  AddObjective.push(objective);
  console.log(AddObjective);
  var dataAddObjective = JSON.stringify({ AddObjective });
  $.ajax({
    url: url_addObj,
    type: 'POST',
    dataType: 'json',
    data: { test: dataAddObjective },
    timeout: 5000,
    success: function (obj_JSON, textStatus, jqXHR) {
      ajaxRequestNewObj(userID, obj_JSON);
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
//Send multi-key results with new obj to server via ajax and get kr_ID array back
function ajaxSendAddKr(userID, Obj_JSON) {
  var $kr = $('.kr-input-text');
  var len = $kr.length;
  var activities = new Array();
  var keyResults = new Array();
  var objID = JSON.parse(Obj_JSON).objectives.obj_ID;
  var season = JSON.parse(Obj_JSON).objectives.season;

  //activity for adding kr
  $kr.each(function () {
    var krText = $(this).text();
    var actTime = $(this).attr("data-act-time");
    var actText = $(this).attr("data-act-text");
    activities.push({ "act_time": actTime, "act_text": actText });
    keyResults.push({ "kr_text": krText, "act_time": actTime, "kr_ID": "", "kr_progress": 0 });
  });

  var AddKeyResults = {
    "user_ID": userID,
    "obj_ID": objID,
    "obj_progress": 0,
    "season": season,
    "keyResults": keyResults,
    "activities": activities
  }
  console.log(AddKeyResults);
  ////console.log(AddKeyResults);
  var dataAddKeyResults = JSON.stringify({ AddKeyResults });
  //send new key results to server and generate html
  $.ajax({
    url: url_addKr,
    type: 'POST',
    dataType: 'json',
    data: { test: dataAddKeyResults },   //return kr_ID array
    success: function (kr_JSON, textStatus, jqXHR) {
      ajaxRequestNewKr(userID, Obj_JSON);
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
//Send one key result only with existing obj
function ajaxSendAddOneKr(userID, objID, krText, actTime, actText, objProgress) {
  // var objID_JSON = '{"obj_ID":"' + objID + '"}';
  var keyResults = new Array();
  var activities = new Array();
  activities.push({ "act_time": actTime, "act_text": actText });
  keyResults.push({ "kr_text": krText, "act_time": actTime, "kr_ID": "", "kr_progress": 0 });

  var AddKeyResults = {
    "user_ID": userID,
    "obj_ID": objID,
    "obj_progress": objProgress,
    "keyResults": keyResults,
    "activities": activities
  }
  var dataAddKeyResults = JSON.stringify({ AddKeyResults });
  //console.log(dataAddKeyResults);
  $.ajax({
    url: url_addKr,
    type: 'POST',
    dataType: 'json',
    data: { test: dataAddKeyResults },   //return kr_ID array
    success: function (kr_JSON, textStatus, jqXHR) {
      //console.log(krIDArray);
      ajaxRequestUpdateKr(userID, objID, kr_JSON);
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
//Send one edit obj data to server
function ajaxSendEditObj(userID, objID, objSeason, objText, actTime, actText) {
  var UpdateObjective = {
    "obj_userID": userID,
    "obj_ID": objID,
    "obj_text": objText,
    "obj_updateTime": actTime,
    "act_text": actText
  };
  var UpdateObjective_JSON = JSON.stringify({ UpdateObjective });
  //console.log(UpdateObjective_JSON);
  $.ajax({
    url: url_editObj,
    type: 'POST',
    dataType: 'json',
    timeout: 5000,
    data: { test: UpdateObjective_JSON },
    success: function (RequData, textStatus, jqXHR) {
      var objectives = {
        "activities": [{
          "act_time": actTime,
          "act_text": actText
        }]
      };
      var actInfo = document.getElementById("act-template").innerHTML;
      var template = Handlebars.compile(actInfo);
      var actData = template(objectives);
      $(".history-content[data-obj-id='" + objID + "']").prepend(actData);
      editOkrSuccess(editStatus, objID,objText);
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
//Send one key result data to server
//2 for editing key result text only, 3 for editing key result progress only, 4 for editing key result both text and progress
function ajaxSendEditKrText(userID, objID, krID, krText, actTime, actText, objProgress, krProgress) {
  //console.log("ajax start...");
  var UpdateKeyResultText, UpdateKeyResultText_JSON;
  if (editStatus == 2) {
    UpdateKeyResultText = {
      "kr_ID": krID,
      "kr_userID": userID,
      "kr_text": krText,
      "kr_time": actTime,
      "obj_ID": objID,
      "act_text": actText
    };
  }
  else if (editStatus == 4) {
    UpdateKeyResultText = {
      "kr_ID": krID,
      "kr_userID": userID,
      "kr_text": krText,
      "kr_time": actTime,
      "obj_ID": objID,
      "act_text": actText[0]
    };
  }
  UpdateKeyResultText_JSON = JSON.stringify({ UpdateKeyResultText });
  console.log(UpdateKeyResultText_JSON);

  $.ajax({
    url: url_editKrText,
    type: 'POST',
    dataType: 'json',
    timeout: 5000,
    data: { test: UpdateKeyResultText_JSON },
    success: function (RequData, textStatus, jqXHR) {
      //console.log("edit kr text success!");
      var objectives;
      if (editStatus == 2) {
        objectives = {
          "obj_ID": objID,
          "activities": [{
            "act_time": actTime,
            "act_text": actText
          }]
        };
      }
      else if (editStatus == 4) {
        objectives = {
          "obj_ID": objID,
          "activities": [{
            "act_time": actTime,
            "act_text": actText[0]
          }]
        };
      }

      var actInfo = document.getElementById("act-template").innerHTML;
      var template = Handlebars.compile(actInfo);
      var actData = template(objectives);
      // console.log(actData);
      $(".history-content[data-obj-id='" + objID + "']").prepend(actData);
      if (editStatus == 2) {
        editKrSuccess(editStatus, objID, krID);
      }
      else if (editStatus == 4) {
        ajaxSendEditKrProgress(userID, objID, objProgress, krID, krProgress, actTime, actText[1])
      }
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
//Send one key result data to server
function ajaxSendEditKrProgress(userID, objID, objProgress, krID, krProgress, actTime, actText) {
  //console.log("ajax start...");
  var UpdateKeyResultProgress = {
    "kr_ID": krID,
    "kr_userID": userID,
    "kr_progress": krProgress,
    "kr_time": actTime,
    "obj_ID": objID,
    "obj_progress": objProgress,
    "season": GetSelSeason(),
    "act_text": actText
  };
  var UpdateKeyResultProgress_JSON = JSON.stringify({ UpdateKeyResultProgress });
  console.log(UpdateKeyResultProgress_JSON);
  $.ajax({
    url: url_editKrProgress,
    type: 'POST',
    dataType: 'json',
    timeout: 5000,
    data: { test: UpdateKeyResultProgress_JSON },
    success: function (RequData, textStatus, jqXHR) {
      //console.log("edit kr progress success!");
      var objectives = {
        "obj_ID": objID,
        "activities": [{
          "act_time": actTime,
          "act_text": actText
        }]
      };
      var actInfo = document.getElementById("act-template").innerHTML;
      var template = Handlebars.compile(actInfo);
      var actData = template(objectives);
      $(".history-content[data-obj-id='" + objID + "']").prepend(actData);
      //console.log("objProgress"+objProgress);
      editKrSuccess(editStatus, objID, krID, objProgress, krProgress);
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
