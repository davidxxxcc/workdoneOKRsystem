//======================These are routers for ajax request=======================//
var localhost_url = 'http://localhost:3000';
var GCP_url = 'http://35.196.96.33:3000';
var GCP_CMTest_URL = 'http://35.196.96.33:5000';
var Now_url = GCP_CMTest_URL;
// var homeLink = Now_url + "/profile";
// var viewOthersLink = Now_url + "/othersProfile/viewothers";
// var signOutLink = Now_url +"/profile/get_requActi_logout";
// var settingLink = Now_url + "/personalSetting";
// var url_notiRead = Now_url + "/profile/get_requActi_pressNoti";
// var url_queryKeyWords = Now_url + "/profile/get_requData_searchKeyWord";

var url_noti = Now_url + "/profile/get_requData_notification";
var url_profile = Now_url + "/othersOKRs/get_requData_profileData";
var url_okrs = Now_url + "/othersOKRs/get_requData_OKRs";

var url_addCmt = Now_url + "/profile/get_provData_addObjectiveComment";
var url_deleCmt = Now_url + "/profile/get_requActi_deleObjectiveComment";
var url_editCmt = Now_url + "/profile/get_provData_editObjectiveComment";
var url_like = Now_url + "/profile/get_requActi_pressLike";

//Global variables
var friID;
var notiUpdateTime = 60*1000;
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


//used for modal control
var loadOkrs = false;
var addKrCount = 1; //count for key results in modal
var step = 1;       //step control for modal
var updateStatus = 0; // 0 for initial value, 1 for add objective, 2 for add objective and key results, 3 for add key result only
var editStatus = 0; // 0 for initial value, 1 for editing whole objective, 2 for editing key result text only, 3 for editing key result progress only, 4 for editing key result both text and progress
var deleteStatus = 0; // 0 for initial value, 1 for deleting whole objective, 2 for deleting key result only
var $krWidth;       //Dynamically measure the width of kr suggestion menu
var $bgColor = $(".sub-menu-title").css('background-color');

//****************************Initialize check*************************//

function okrDataCheck(){
  $(".section-okr").on("custom-sliderUpdate custom-OkrUpdate", function(){
    var okr = $(">.okr",this);
    // console.log(okr);
    // console.log(okr.length);
    if(okr == null || okr.length == 0){
      $('.prompt-no-okr').show();
    }
    else{
      $('.prompt-no-okr').hide();
    }
  });

  $(".section-okr").on("custom-sliderUpdate custom-OkrUpdate custom-KrUpdate",".okr", function(){


    var $krContent = $(this).find(".kr-content");
    // console.log($krContent);
    $krContent.each(function(){
      if( $('>.kr',this).length == 0 ){
        $('>.prompt-no-kr',this).show();
        $('>.kr-add', this).show();
      }
      else if($('>.kr',this).length > 0 && $('>.kr',this).length < 5){
        $('>.prompt-no-kr',this).hide();
        $('>.kr-add', this).show();
      }
      else if($('>.kr',this).length >= 5){
        $('>.kr-add', this).hide();
        $('>.prompt-no-kr',this).hide();
      }
    });


  });
}
//Set user ID to variable friendID
function setFriID(){
  friID = $("#profile-user-img").attr("data-user-id");
  console.log("friID" + friID);
}
//Set up home & viewothers
// function setHref(){
//   $("#options-fa-home").attr("href",homeLink);
//   $("#viewOthers").attr("href",viewOthersLink);
//   $("#singout").attr("href",signOutLink);
//   $("#setting").attr("href",settingLink);
//
// }

//****************************RWD effect*************************//

//change content of #add-okr button with when resizing window
function resizeAddOkrBtn(){
  $windowWidth = $(window).width();
  $okrBTN = $('#add-okr');
  //Current window size
  if ($windowWidth <= 800) {
    //console.log("resize");
    $okrBTN.html("+");
  } else {
    $okrBTN.html("+新增您的OKR");
  }

  //detect window resize
  $(window).resize(function() {
    $windowWidth = $(window).width();
    ////console.log($windowWidth);
    if ($windowWidth <= 800) {
      $okrBTN.html("+");
    } else {
      $okrBTN.html("+新增您的OKR");
    }
  });
}
//Get current dynamic scroll data
function GetScroll(){
  const height = $(window).height();
  const scrollTop = $(window).scrollTop();
  //console.log("height: " + height + ", scrollTop: " + scrollTop);
}
// format date compared with current time
function formatDateToNow(text) {
  var now = GetDateTime();
  var year = parseInt(text.substr(0,4))
  var month = parseInt(text.substr(5,2));
  var day = parseInt(text.substr(8,2));
  var time = text.substr(11,5);
  var yearNow = parseInt(now.substr(0,4))
  var monthNow = parseInt(now.substr(5,2));
  var dayNow = parseInt(now.substr(8,2));
  var timeNow = now.substr(11,5);
  var str;
  //今年的留言
  if(year == yearNow){
    if(month != monthNow){
      str = month + "月" + day + "日 " + time;
    }
    //這個月留言
    else if (month == monthNow && dayNow - day > 1){
      str = month + "月" + day + "日 " + time;
    }
    //昨日留言
    else if (month == monthNow && dayNow - day == 1){
      str = "昨天 " + time;
    }
    //今日留言
    else{
      str = time;
    }
  }
  else{
    str = year + "年" + month + "月" + day + "日 " + time;
  }
  return str;
}
//formate date e.g.  20171222 to Dec 22
function formatDate(text){
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
//+++++++++++++++++++++++++ProgressBar slider effect*******************//

//Initialize Slider
function initSlider(){
  $(".section-okr").on("custom-sliderUpdate", ".slider-content", function(){
      $(this).each(function(){
        var $krID = $(this).attr("data-kr-id");
        var $objID = $(this).attr("data-obj-id");
        var $slider = $( ".slider[data-kr-id='" + $krID + "']" );
        var $handle = $( ".handle[data-kr-id='" + $krID + "']" );
        var $krProgress = $slider.attr("data-kr-progress");
        var $progressText = $handle.siblings(".ui-slider-range");
        //initialize the slider
        var $krContent = $(".kr-text[data-kr-id='"+$krID+"']");
        var $krText = $krContent.text();
        //================These variables are kr edit button====================//
        var $krEditBtn = $(".kr-edit[data-kr-id='"+$krID+"']");
        var $krDelBtn = $(".kr-delete[data-kr-id='"+$krID+"']");
        var $krBtns = $(".kr-edit[data-kr-id='"+$krID+"'], .kr-delete[data-kr-id='"+$krID+"']");
        //================These variables are confirm button in kr edit mode====================//
        var $confirmBtn = $(".kr-confirm[data-kr-id='"+$krID+"']");
        var $cancelBtn = $(".kr-cancel[data-kr-id='"+$krID+"']");
        var $updatedBtns = $(".kr-confirm[data-kr-id='"+$krID+"'], .kr-cancel[data-kr-id='"+$krID+"']");
        //======================================================================//
        $slider.slider({
          create: function(event, ui) {
            $handle.siblings(".ui-slider-range").attr("data-kr-id",$krID);
            $handle.siblings(".ui-slider-range").attr("data-obj-id",$objID);
            if($krProgress < 10 || $krProgress == null){
              $handle.text( $krProgress );
              $handle.siblings(".ui-slider-range").text("");
            }else{
              $handle.text("");
              $handle.siblings(".ui-slider-range").text($krProgress +"%");
            }
          },
          start: function(event, ui){
          },
          slide: function( event, ui ) {
            // if(ui.value < 10 || ui.value == null){
            //   $handle.text( ui.value );
            //   $handle.siblings(".ui-slider-range").text("");
            // }else{
            //   $handle.text("");
            //   $handle.siblings(".ui-slider-range").text(ui.value+"%");
            // }
          },
          animate: false,
          change: function(event, ui){
          },
          stop: function(event, ui){
            // console.log("ui.value" + ui.value);
            // console.log("$krProgress" + $krProgress);
            $handle.trigger("custom-handleDragging");   //trigger slider loading event
            if(ui.value != $krProgress && $krContent.attr("contenteditable") == "false"){
              editStatus = 3;           //3 for editing key result progress only
              //step 1: hide kr edit & delete btns and show updated btns
              $krBtns.hide(fadeDuration, function(){
                $updatedBtns.show(fadeDuration);
              });
            }
            else if(ui.value == $krProgress && $krContent.attr("contenteditable") == "false"){
              editStatus = 0;
              $updatedBtns.hide(function(){
                $krBtns.show();
              });
            }
          },
          min:0,
          max:100,
          range: "min",
          orientation: "horizontal",
          value: $krProgress,
          step: 1,

        });
        $handle.hide();
        $slider.on("slide", function (event, ui) { return false; });
      });
  });
  $('.slider-content').trigger("custom-sliderUpdate");   //trigger slider loading event
}

//****************************Drop down menu*************************//

//click outside to close the drop down menu
function clickOutMenu(){
  $(document).click(function(event){
    // //console.log(event.target);
    if(!$(event.target).closest('#fa-drop-down').length){
      $('#drop-down-season').stop(false,true).fadeOut(fadeDuration);
      $('#fa-drop-down').stop(false,true).css('transform', 'rotate(0deg)');
    }
    if(!$(event.target).closest('.more-option').length){
      $('.drop-down-obj').stop(false,true).fadeOut(fadeDuration);
    }
    // if(!$(event.target).closest('#options-fa-bell').length){
    //   $('#drop-down-options-notification').fadeOut(fadeDuration);
    // }
    // if(!$('#options-fa-more, #options-fa-more-mobile').is(event.target)){
    //   $('#drop-down-options-more').fadeOut(fadeDuration);
    // }
    if(!$('.cmt-more-icon').is(event.target)){
      $('.drop-down-cmt').stop(false,true).fadeOut(fadeDuration);
    }
    if(!$(event.target).closest('.history-slide').length && !$(event.target).closest('.obj-history').length){
      $('.history-slide').stop(false,true).animate({
        right: '-720px'
      }, fadeDuration/2).fadeOut(fadeDuration/2);
    }

    // if(!$(event.target).closest("#search-prompt-menu").length && !$(event.target).closest('.searchBar').length){
    //   $("#search-prompt").hide();
    // }
  });
}

//click .more-option to show .drop-down-obj menu and .obj-menu-li hover effect
function objDropDownMenu(){
  var bgColor = $('.obj-menu').css("background-color");
  //click to show or hide
  $('.section-okr').on("click",'.more-option', function(event) {
    var objId = $(this).attr("data-obj-id");
    var $moreMenu = $(".drop-down-obj[data-obj-id='" + objId + "']");
    var $moreIcon = $(".more-option[data-obj-id='" + objId + "']");

    if ($moreMenu.css('display') == 'none') {
      $moreMenu.stop(false,true).fadeIn(fadeDuration);
    } else {
      $moreMenu.stop(false,true).fadeOut(fadeDuration);
    }

  });
  $('.section-okr').on("mouseover", ".obj-menu-li", function(){
    $(this).stop(false,true).animate({
      'background-color': hoverMenu
    }, hoverDuration);
  });
  $('.section-okr').on("mouseout", ".obj-menu-li", function(){
    $(this).stop(false,true).animate({
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
function seaDropDownMenu(){
  var bgColor = $('.sea-menu-li').css("background-color");
  var $seasonIcon = $('#fa-drop-down');
  var $seasonMenu = $('#drop-down-season');

  //click to show or hide season menu
  $seasonIcon.on('click', function(event) {
    if ($seasonMenu.css('display') == 'none') {
      $seasonMenu.stop(false,true).fadeIn();
      $(this).stop(false,true).css('transform', 'rotate(180deg)');
    } else {
      $seasonMenu.stop(false,true).fadeOut();
      $(this).stop(false,true).css('transform', 'rotate(0deg)');
    }
  });

  //hover effect
  $('.sea-menu-li').hover(
    function() {
      $(this).stop(false,true).animate({
        'background-color': hoverMenu
      }, hoverDuration);
    },
    function() {
      $(this).stop(false,true).animate({
        'background-color': bgColor
      }, hoverDuration);
    }
  );
}
//Show header options drop down menu
// function optDropDwonMenu(){
//
//   var $moreIcon = $('#options-fa-more, #options-fa-more-mobile');
//   var $moreMenu = $('#drop-down-options-more');
//   // //more options menu
//   $moreIcon.on('click', function(event) {
//     if ($moreMenu.css('display') == 'none') {
//       $moreMenu.fadeIn(fadeDuration);
//     } else {
//       $moreMenu.fadeOut(fadeDuration);
//     }
//
//     $moreMenu.find('li').on('mouseover', function(event) {
//       event.stopPropagation();
//       $(this).stop(true).animate({
//         'background-color': '#54c8cf',
//         'border-left-width': '10px',
//         'border-left-color': '#2FEE85'
//       }, hoverDuration/2);
//
//     }).on('mouseout', function(event) {
//       event.stopPropagation();
//       $(this).stop(true).animate({
//         'background-color': '#f2f2f2',
//         'border-left-width': '0px'
//       }, hoverDuration/2);
//     });
//   });
// }
//Show comment drop down menu
function cmtDropDownMenu(){
  var bgColor = $('.cmt-menu').css("background-color");
  //more options menu
  $('.section-okr').on('click','.cmt-more-icon',function(){
    var cmtId = $(this).attr("data-cmt-id");
    var $cmtMenu = $(".drop-down-cmt[data-cmt-id='" + cmtId + "']");
    if ($cmtMenu.css('display') == 'none') {
      $cmtMenu.fadeIn(fadeDuration);
    } else {
      $cmtMenu.fadeOut(fadeDuration);
    }
  });

    $('.section-okr').on('mouseover','.cmt-menu-li',function(){
      $(this).stop(true).animate({
        'background-color': hoverMenu
      }, hoverDuration);
    }).on('mouseout','.cmt-menu-li',function(){
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
function actSlideIn(){
  var $buttonId, $aside;
  $('.section-okr').on('click','.obj-history', function(){
    $buttonId = $(this).attr('data-obj-id');
    $aside = $(".history-slide[data-obj-id='" + $buttonId + "']");
    // var curDate = "";
    // var prevDate = "";
    $aside.stop(false,true).animate({
      right: '0px',
      top: '80px'
    }, fadeDuration/2).css("display","block");
  });
  $('.section-okr').on('click','.hisBtn', function(){
    $buttonId = $(this).attr('data-obj-id');
    $aside = $(".history-slide[data-obj-id='" + $buttonId + "']");
    $aside.stop(false,true).animate({
      right: '-720px'
    }, fadeDuration/2).fadeOut(fadeDuration/2);
  });
}
// activities illustration progress dot
function actDotUpdate(){
  $(".section-okr").on("custom-KrUpdate custom-OkrUpdate custom-sliderUpdate",".okr", function(){
    // console.log($(this));
    $(this).each(function(){
      var id = $(this).attr("data-obj-id");
      // //console.log(id);
      var $actLi = $(".history-li[data-obj-id='" + id + "']");
      var curDate = "";
      var prevDate = "";
      $actLi.each(function(i) {
        prevDate = curDate;
        curDate = $(this).attr('data-history-date').substr(0,10);
        // //console.log(" curDate >> " + curDate);
        // //console.log(" prevDate >> " + prevDate);
        if (prevDate == curDate) {
          $(this).find('.solid-dot').css('display', 'display');
          $(this).find('.hollow-dot').css('display', 'none');
          ////console.log( "solid"+ $(this) + i);
        } else {
          $(this).find('.solid-dot').css('display', 'none');
          $(this).find('.hollow-dot').css('display', 'display');
          ////console.log("hollow" + $(this) + i);
        }
      });
    });
  });
  $(".section-okr").on("custom-OkrUpdate",".okr", function(){
    console.log($(this));
    $(this).each(function(){
      var id = $(this).attr("data-obj-id");
      // //console.log(id);
      var $actLi = $(".history-li[data-obj-id='" + id + "']");
      var curDate = "";
      var prevDate = "";
      $actLi.each(function(i) {
        prevDate = curDate;
        curDate = $(this).attr('data-history-date').substr(0,10);
        // //console.log(" curDate >> " + curDate);
        // //console.log(" prevDate >> " + prevDate);
        if (prevDate == curDate) {
          $(this).find('.solid-dot').css('display', 'display');
          $(this).find('.hollow-dot').css('display', 'none');
          ////console.log( "solid"+ $(this) + i);
        } else {
          $(this).find('.solid-dot').css('display', 'none');
          $(this).find('.hollow-dot').css('display', 'display');
          ////console.log("hollow" + $(this) + i);
        }
      });
    });
  });
}
//transform string e.g. 201704 to 2017 Q4
function seasonTrans(seasonText){
  var season = ["Q1", "Q2", "Q3", "Q4"];
  var qtr = seasonText.toString().substr(4, 2);
  var year = seasonText.toString().substr(0, 4);
  var str = year + " " + season[qtr - 1];
  return str;
}
//****************************Hover effect************************************//

//Hover for search query $krMenu
// function hoverSearch(){
//
//   $("#search-prompt").on("custom-querying",".search-dept, .search-user, .search-obj", function(){
//     console.log("hoverSearch");
//     $(this).hover(
//       function(){
//         $(this).css("background-color","#8de9c2");
//       }, function(){
//         $(this).css("background-color","#f2f2f2");
//       }
//     );
//   });
// }

//**************************Search key words**********************************//
// search key words
// function searchKeyWords(){
//   var $searBtn = $("#seatchButton");
//   var $searInput = $("#searchInput");
//   var $searPrompt = $("#search-prompt");
//   var keyWords;
//   var typingTimer;
//   var doneTypingInterval = 1000;
//   $searInput.val(null);
//
//   //on keyup, start the countdown
//   $searInput.on('keyup copy paste compositionend', function (event) {
//     clearTimeout(typingTimer);
//     typingTimer = setTimeout(doneTyping, doneTypingInterval);
//   });
//
//   $searInput.on('keydown', function () {
//   clearTimeout(typingTimer);
//   });
//
//   $searBtn.on("click",function(){
//     keyWords = $searInput.val().trim();
//     if(keyWords != null){
//       if(keyWords.length > 0){
//         window.location.href = '/search/get_requPage_searchResults/?keywords=' + keyWords;
//         $searPrompt.hide();
//         $searInput.text(null);
//       }
//     }
//   });
//
//   $searInput.bind("enterKey",function(e){
//     keyWords = $searInput.val().trim();
//     console.log("keyWords: " + keyWords);
//     if(keyWords != null){
//       if(keyWords.length > 0){
//         window.location.href = '/search/get_requPage_searchResults/?keywords=' + keyWords;
//         $searPrompt.hide();
//       }
//     }
//   });
//
//   $searInput.keyup(function(e){
//     if(e.keyCode == 13)
//     {
//         $(this).trigger("enterKey");
//     }
//   });
// }

//user is "finished typing," do something
// function doneTyping(){
//   var $searInput = $("#searchInput");
//   var $searPrompt = $("#search-prompt");
//   keyWords = $searInput.val().trim();
//   console.log("keyWords: " + keyWords);
//   if(keyWords != null){
//     if(keyWords.length > 0){
//       ajaxRequestQuery(keyWords);
//       $searPrompt.show();
//     }
//     if(keyWords.length == 0){
//       $searPrompt.hide();
//     }
//   }
// }

//****************************Update data function*************************//

//Set time interal to update notification
// function updatedNoti(){
//   var notiTime;
//   var myVar = setInterval(function(){
//     notiTime = $(".noti-li").first().attr("data-noti-time");
//     ajaxRequNotiClocking(notiTime);
//   }, notiUpdateTime);
//   function stopColor() {
//       clearInterval(myVar);
//   }
// }
//Check isRead value to show the notifications
// function checkNotiIsRead(){
//   var $notiIcon = $('#options-fa-bell');
//   var $notiMenu = $('#drop-down-options-notification');
//
//   // 點擊鈴鐺開啟通知訊息
//   $notiIcon.on("click", function(event){
//     $('#noti-circle').fadeOut(fadeDuration, function() {
//         if ($notiMenu.css('display') == 'none') {
//           $notiMenu.fadeIn(fadeDuration);
//         } else {
//           $notiMenu.fadeOut(fadeDuration);
//         }
//       });
//   });
//
//   // data-noti-read = 0 未讀    1已讀
//   var notiNumber = $(".noti-li[data-noti-read='" + 0 + "']").length;
//
//   if (notiNumber == 0) {
//     $('#noti-circle').hide();
//     $(".noti-prompt").show();
//   }
//   else {
//     $('#noti-circle').show().html(notiNumber + "+");
//     $(".noti-prompt").hide();
//   }
//
//   //將已讀的訊息取消未讀UI提示
//   $(".noti-li[data-noti-read='" + 1 + "']").each(function(){
//     $(this).css('backgroundColor', '#f2f2f2');
//     $(this).find('.fa-circle').hide();
//   });
//
//   //點擊某則通知
//   $('#noti-menu li').on('click', function(event) {
//     event.stopPropagation();
//     $(this).css('backgroundColor', '#f2f2f2');
//     $(this).find('.fa-circle').fadeOut(fadeDuration);
//     if($(this).attr("data-noti-read") == 0){
//       $(this).attr("data-noti-read",1);
//       var notiID = $(this).attr("data-noti-id");
//       ajaxSendReadNoti(notiID);
//     }
//   });
//
// }
//Check if the user click like button this obj
function checkLike(){
  $(".section-okr").on("custom-checkLike", ".okr", function(){
    var $likeIcon = $(this).find(".like-icon");
    var objID = $(this).attr("data-obj-id");
    var $likeIcon = $(".like-icon[data-obj-id='" + objID + "']");
    //如果還沒按過讚
    if($likeIcon.attr("data-isLike") == "false"){
      $likeIcon.children("a").attr("class","fa fa-thumbs-o-up");
    }
    //如果已經按過讚
    else{
      $likeIcon.children("a").attr("class","fa fa-thumbs-up");
    }
  });
}
//Click like
function clickLike(){
  $(".section-okr").on("click",".like-icon", function(){
    var objID = $(this).attr("data-obj-id");
    var time = GetDateTime();

    var $likeNum = parseInt($(this).siblings(".like-number").text());
    if($(this).attr("data-islike") == "false"){
      $(">a",this).attr("class","fa fa-thumbs-up");
      $(this).attr("data-islike",true);
      $(this).siblings(".like-number").text(++$likeNum);
      ajaxSendLike(objID, time);

    }else{
      $(">a",this).attr("class","fa fa-thumbs-o-up");
      $(this).attr("data-islike",false);
      $(this).siblings(".like-number").text(--$likeNum);
      ajaxSendLike(objID, time);
    }
  });
}



//Select season
function selectSeason(){
  var season;
  var showSeason = $("#selected-season");
  var seasonNow = $("#selected-season").attr("data-season");
  $(".sea-menu-li[data-season='" + seasonNow +"']").hide();

  $(".sea-menu-li").on("click",function(){
    season = $(this).attr("data-season");
    $(".sea-menu-li[data-season='" + season +"']").hide();
    showSeason.text(seasonTrans(season));
    showSeason.attr("data-season",season);
    $(".sea-menu-li[data-season='" + seasonNow +"']").show();
    ajaxRequdOkrs(friID, season);
    seasonNow = season;
  });

}
//Add comment to page
function addCmtToPage(cmtData){
  // console.log(cmtData);
  var objID = cmtData.obj_ID;
  var cmtInfo = $('#cmt-template').html();
  var template = Handlebars.compile(cmtInfo);
  var cmtData = template(cmtData);
  // console.log(cmtData);
  $('.comment-content[data-obj-id="' + objID + '"]').append(cmtData);
  $(".cmt-prompt[data-obj-id='" + objID + "']").text("更新成功!");

  window.setTimeout(function(){
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
function deleteComment(){
  var cmtID;
  //Click delete comment
  $(".section-okr").on("click",".cmt-delete", function(){
    $("#cmt-edit-check-section").fadeIn(fadeDuration);
    cmtID = $(this).attr("data-cmt-id");
  });
  //Click confirm to delete
  $("#cmt-edit-btn-confirm").on("click", function(){
    var objID = $(".cmt-user-time[data-cmt-id='" +  cmtID + "']").attr("data-obj-id");
    var cmtTime = $(".cmt-user-time[data-cmt-id='" +  cmtID + "']").attr("data-cmt-time");
    // console.log(objID);
    // console.log(cmtTime);
    ajaxRequDeleCmt(cmtID, friID, objID, cmtTime);
  });
  //Click cancel to close check box
  $("#cmt-edit-btn-cancel").on("click", function(){
    $("#cmt-edit-check-section").fadeOut(fadeDuration);
  });

}
//Edit comment
function editComment() {
  var cmtID, cmtText, cmtTextNew;
  //Click edit comment
  $(".section-okr").on("click", ".cmt-edit", function() {
    cmtID = $(this).attr("data-cmt-id");
    console.log(cmtID);
    cmtText = $(".cmt-text[data-cmt-id='" + cmtID + "']").text().trim();
    $(".cmt-edit-options[data-cmt-id='" + cmtID + "']").fadeIn(fadeDuration, function() {
      $(".cmt-edit-prompt[data-cmt-id='" + cmtID + "']").text(null);
      $(".cmt-cancel[data-cmt-id='" + cmtID + "']").fadeIn(fadeDuration);
      // $(".cmt-confirm[data-cmt-id='" + cmtID + "']").fadeIn(fadeDuration);
      $(".cmt-text[data-cmt-id='" + cmtID + "']").attr("contenteditable", true).css("outline", "1px solid Aqua").focus();
    });
  });
  //Detect editing
  $(".section-okr").on("keyup paste copy", ".cmt-text",function(){
    cmtID = $(this).attr("data-cmt-id");
    cmtTextNew = $(".cmt-text[data-cmt-id='" + cmtID + "']").text().trim();
    if(cmtTextNew == null || cmtTextNew.length == 0){
      $(".cmt-cancel[data-cmt-id='" + cmtID + "']").show();
      $(".cmt-confirm[data-cmt-id='" + cmtID + "']").fadeOut();
    }
    else if(cmtText == cmtTextNew){
      $(".cmt-cancel[data-cmt-id='" + cmtID + "']").show();
      $(".cmt-confirm[data-cmt-id='" + cmtID + "']").fadeOut();
    }
    else {
      $(".cmt-cancel[data-cmt-id='" + cmtID + "']").show();
      $(".cmt-confirm[data-cmt-id='" + cmtID + "']").show();
    }
  });

  //Click cmt edit confirm
  $(".section-okr").on("click",".cmt-confirm", function(){
    cmtID = $(this).attr("data-cmt-id");
    cmtTextNew = $(".cmt-text[data-cmt-id='" + cmtID + "']").text().trim();
    $(".cmt-edit-prompt[data-cmt-id='" + cmtID + "']").text("系統更新中...");
    ajaxSendEditCmt(cmtID, cmtTextNew);
  });

  //Click cmt edit cancel
  $(".section-okr").on("click",".cmt-cancel", function(){
    cmtID = $(this).attr("data-cmt-id");
    $(".cmt-text[data-cmt-id='" + cmtID + "']").text(cmtText);
    $(".cmt-edit-options[data-cmt-id='" + cmtID + "']").fadeOut(fadeDuration, function() {
      $(".cmt-text[data-cmt-id='" + cmtID + "']").attr("contenteditable", false).css("outline", "none");
    });
  });
}

function cmtEditSuccess(cmtID){
  $(".cmt-edit-prompt[data-cmt-id='" + cmtID + "']").text("更新成功!");
  window.setTimeout(function(){
    $(".cmt-edit-options[data-cmt-id='" + cmtID + "']").fadeOut(fadeDuration, function() {
      $(".cmt-text[data-cmt-id='" + cmtID + "']").attr("contenteditable", false).css("outline", "none");
    });
  },1000);
}


//Animation refresh for .chart objective progress chart
function objChartRefresh(objID){
  if(objID == null){
    $('.chart').each(function() {
      var $chart = $(this),
        //Store mask and set to 0 deg
        $circleLeft = $chart.find('.left .circle-mask-inner').css({transform: 'rotate(0)'}),
        $circleRight = $chart.find('.right .circle-mask-inner').css({transform: 'rotate(0)'}),
        //get current percentage
        $percentNumber = $chart.find('.percent-number'),
        percentData = parseInt($percentNumber.text());
      if (percentData >= 100) {
        percentData = 100;
      }
      //set current percentage to 0
      $percentNumber.text(0);

      $({percent: 0}).delay(500).animate({
        percent: percentData
      }, {
        duration: 1500,
        progress: function() {
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
  else{
    var $chart = $('.chart[data-obj-id="' + objID + '"]'),
      //Store mask and set to 0 deg
    $circleLeft = $chart.find('.left .circle-mask-inner').css({transform: 'rotate(0)'}),
    $circleRight = $chart.find('.right .circle-mask-inner').css({transform: 'rotate(0)'}),
      //get current percentage
    $percentNumber = $chart.find('.percent-number'),
    percentData = parseInt($percentNumber.text());
    if (percentData >= 100) {
      percentData = 100;
    }
    //set current percentage to 0
    $percentNumber.text(0);

    $({percent: 0}).delay(500).animate({
      percent: percentData
    }, {
      duration: 1500,
      progress: function() {
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
function slideKrCmt(){
  $('.section-okr').on('click','.kr-upper',function(){
    var id = $(this).attr("data-obj-id");
    $(".kr-content[data-obj-id='" + id + "']").stop(false,true).toggle(fadeDuration);
  });
  $('.section-okr').on('click','.cmt-upper',function(){
    var id = $(this).attr("data-obj-id");
    $(".comment-content[data-obj-id='" + id + "']").stop(false,true).toggle(fadeDuration);
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

//Initi  delete checkbox
function initDeleteCheckBox(){
  $('.del-process').hide();
  $('.del-prompt').show();
  $('#delete-input-btns').show();

}
//Initi edit checkbox
function initEditCheckBox(){
  $("#edit-check-box>input-btns check").show();
  $("#edit-btn-cancel, #edit-btn-confirm").show();
}
//Return current time ex: "2017-10-18 16:12:4"
function GetDateTime(){
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
//Return season format ex: "201703"
function GetSeason(){
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
// Load all of javacripts after dynamic HTML generation
function afterLoading(){
  setFriID();
  headerAfterLoading();
  // setHref();
  okrDataCheck();
  // okrDataUpdateCheck();
  actDotUpdate();
  clickOutMenu();
  // pressKeyBoard();
  resizeAddOkrBtn();
  objDropDownMenu()
  objChartRefresh();
  seaDropDownMenu();
  // optDropDwonMenu();
  cmtDropDownMenu();
  actSlideIn();
  slideKrCmt();
  addComment();
  deleteComment();
  editComment();
  initSlider();
  // searchKeyWords();
  // hoverSearch();
  selectSeason();
  checkLike();
  clickLike();
  // updatedNoti();
  // checkNotiIsRead();



  // loading modal setting
  // okrModal();
}

//==================These are data loading requests using ajax ===============//

//定時讀取通知
// function ajaxRequNotiClocking(notiTime){
//   var notiTimeJSON = JSON.stringify({
//     "noti_time": notiTime
//   });
//   console.log(notiTimeJSON);
//
//   $.ajax({
//     url: url_noti,
//     type: 'GET',
//     dataType: 'json',
//     data: {test:notiTimeJSON},
//     success: function(dataJSON) {
//       var data = JSON.parse(dataJSON);
//       var notiNumNew = data.notifications.length;
//       ////console.log(data);
//       //如果有新通知
//       if(notiNumNew > 0){
//         Handlebars.registerHelper("formatDateToNow", function(text) {
//           str = formatDateToNow(text);
//           return new Handlebars.SafeString(str);
//         });
//         $('#noti-circle').text(notiNumCur + notiNumNew);
//         var notiInfo = $('#noti-template').html();
//         var template = Handlebars.compile(notiInfo);
//         var notiData = template(data);
//         $('.noti-message').prepend(notiData);
//         // var notiNumCur = parseInt($('#noti-circle').text().substr(0,1));
//       }
//
//     },
//     error: function (jqXHR, textStatus, errorThrown) {
//       //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
//       if (jqXHR.status == 403) {
//         alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
//         window.location.href = '/';
//       }
//     },
//     complete: function() {
//       //console.log("notification done"); //after success and error callbacks are executed
//     }
//   });
// }
//load noficiations data
function ajaxRequNotifications(UUID, season){
  if(season == null){
    season = GetSeason();
  }
  // console.log(season);
  $.ajax({
    url: url_noti,
    type: 'GET',
    dataType: 'json',
    success: function(dataJSON) {
      var data = JSON.parse(dataJSON);
      console.log(data);
      Handlebars.registerHelper("formatDateToNow", function(text) {
        str = formatDateToNow(text);
        return new Handlebars.SafeString(str);
      });
      var notiInfo = $('#noti-template').html();
      var template = Handlebars.compile(notiInfo);
      var notiData = template(data);
      $('.noti-message').append(notiData);
      ajaxRequProfile(UUID,season);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    },
    complete: function() {
      //console.log("notification done"); //after success and error callbacks are executed
    }
  });
}
//load profile data
function ajaxRequProfile(UUID, season){
  // console.log("UUID : " + UUID);
  // console.log("season : " + season);
  var data = {
    others_UUID: UUID,
    season: season
  };
  var temp = JSON.stringify({data});
  // console.log(temp);

  $.ajax({
    url: url_profile,
    data:{test: temp},
    type: 'GET',
    dataType: 'json',
    data:{test: temp},
    success: function(dataJSON) {
      var data = JSON.parse(dataJSON);
      console.log(data);
      Handlebars.registerHelper("formatSeason", function(text) {
        var season = ["Q1", "Q2", "Q3", "Q4"];
        var qtr = text.toString().substr(4, 2);
        var year = text.toString().substr(0, 4);
        var str = year + " " + season[qtr - 1];
        return new Handlebars.SafeString(str);
      });
      var profileInfo = $("#profile-template").html();
      var template = Handlebars.compile(profileInfo);
      var profileData = template(data);
      $('.section-profile').html(profileData);
      var userID = data.profile.profile_user_id;
      $("#options-fa-home").attr("data-user-id",userID);
      $("#selected-season").attr("data-season",season);   //將指定季度輸入data-season
      $("#selected-season").text(seasonTrans(season));    //將指定季度輸入顯示畫面 e.g. 201704>>2017 Q4
      ajaxRequdOkrs(UUID, season);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    },
    complete: function() {
      //console.log("profile done")
    }
  });
}
//Load all okrs data into and call afterLoading function
function ajaxRequdOkrs(UUID, season){
  // var objectives = {"season": season};
  // var objectives_JSON = JSON.stringify({objectives});
  $(".okr").remove();
  $("#update-okr-progress").show();
  var data = {
  others_UUID: UUID,
  season: season
  };
  var temp = JSON.stringify({data});
  console.log(temp);
  $.ajax({
    url: url_okrs,
    type: 'GET',
    dataType: 'json',
    data:{test: temp},
    success: function(dataJSON) {
      var data = JSON.parse(dataJSON);
      console.log(data);
      Handlebars.registerHelper("formatDate", function(text) {
        var str = formatDate(text);
        return new Handlebars.SafeString(str);
      });
      Handlebars.registerHelper("formatCmtDate", function(text){
        var str = formatDateToNow(text);
        return new Handlebars.SafeString(str);
      });
      Handlebars.registerHelper("formatCmtURL" ,function(url){
        if(url != "/profile"){
          url = url + "&season=" + GetSeason() + "&time=" + GetDateTime();
        }else{
          url = url + "/?season=" + GetSeason();
        }
        return new Handlebars.SafeString(url);
      });
      var okrInfo = $('#okr-template').html();
      var template = Handlebars.compile(okrInfo);
      var okrData = template(data);
      $("#update-okr-progress").hide();
      $('.section-okr').append(okrData);
      if(loadOkrs == false){
        afterLoading();
        loadOkrs = true;
      }
      else{
        $('.slider-content').trigger("custom-sliderUpdate");   //trigger slider loading event
        objChartRefresh();
      }
      $(".section-okr").trigger("custom-OkrUpdate");
      $('.okr').trigger("custom-sliderUpdate");   //trigger slider loading event
      $('.okr').trigger("custom-checkLike"); // trigger like check event

    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    },
    complete: function() {
      //console.log("okr done");
    }
  });
}
//request server to delete cmt data
function ajaxRequDeleCmt(cmtID, friID, objID, cmtTime){
  var cmt = {
    "cmt_ID": cmtID,
    "friendID": friID,
    "obj_ID": objID,
    "cmt_time": cmtTime
  };
  var cmtData = JSON.stringify(cmt);
  // console.log(cmt);
  console.log(cmtData);
  $.ajax({
    url:url_deleCmt,
    type: 'GET',
    dataType: 'json',
    data: {test:cmtData},
    timeout: 5000,
    success: function(respData, textStatus, jqXHR){
      //console.log(data);
      $("#cmt-edit-check-section").fadeOut(fadeDuration);
      $(".cmt[data-cmt-id='" + cmtID + "']").remove();
    },
    error: function (jqXHR, textStatus, errorThrown){
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    }

  });

}

//Query keyWords
// function ajaxRequestQuery(keywords){
//   var search = {
//     "search_text": keywords
//   }
//   var queryKeyWords = JSON.stringify({search});
//
//   $.ajax({
//     url:url_queryKeyWords,
//     type: 'GET',
//     dataType: 'json',
//     data: {test:queryKeyWords},
//     timeout: 5000,
//     success: function(respData, textStatus, jqXHR){
//       var data = JSON.parse(respData);
//       console.log(data);
//
//       Handlebars.registerHelper("formatSeason", function(text) {
//         var season = ["Q1", "Q2", "Q3", "Q4"];
//         var qtr = text.toString().substr(4, 2);
//         var year = text.toString().substr(0, 4);
//         var str = year + "年" + season[qtr - 1];
//         return new Handlebars.SafeString(str);
//       });
//       Handlebars.registerHelper("deptChar", function(text) {
//         var deptChar = text.toString().substr(0, 1);
//         return new Handlebars.SafeString(deptChar);
//       });
//       Handlebars.registerHelper("formatObj", function(obj) {
//         var objLower = obj.toLowerCase();
//         var kwLower = keywords.toLowerCase();
//         var kwLength = keywords.length;
//         var objLength = obj.length;
//         var startIndex = objLower.indexOf(kwLower);    //starting index of key words in obj text
//         var endIndex = startIndex + kwLength - 1;   //ending index of key words in obj text
//         var trimStart, trimEnd, str;
//         if(kwLength >= 13){
//           return new Handlebars.SafeString(keywords.substr(0,13));
//         }
//         else if(obj.length <= 13){
//           return new Handlebars.SafeString(obj);
//         }
//         else{
//           var subStrNumber = 13 - kwLength;
//           var count = 0;
//           trimStart = startIndex;
//           trimEnd = endIndex;
//
//           while(count < subStrNumber){
//             //往前找開頭索引，最多找subStrNumber/2個
//             if((trimStart - 1) >= 0 && (count <= subStrNumber/2)){
//               trimStart--;
//             }
//             //往後找，最多找滿subStrNumber
//             else if((trimEnd + 1) <= objLength && (count <= subStrNumber)){
//               trimEnd++;
//             }
//             count++;
//           }
//           console.log("keywords: " + keywords);
//           console.log("keywords length: " + kwLength);
//           console.log("trimStart: "  + trimStart);
//           console.log("trimEnd: "  + trimEnd);
//           console.log("subStrNumber: " + subStrNumber);
//           console.log("objLength: " + objLength);
//
//           //輸出字串
//           if(trimStart == 0){
//             str = obj.substr(trimStart,13) + "...";
//           }
//           else if (trimEnd == objLength-1){
//             str = "..." + obj.substr(trimStart,13);
//           }
//           else{
//             str = "..." + obj.substr(trimStart,13); + "...";
//           }
//           return new Handlebars.SafeString(str);
//         }
//       });
//       Handlebars.registerHelper("checkData", function(depts, peo, objs){
//         if(depts.length == 0 && peo.length == 0 && objs.length == 0){
//           var str = '<li class="search-main-li search-prompt">查無此關鍵字!</li>';
//           return new Handlebars.SafeString(str);
//         }
//       })
//       Handlebars.registerHelper("formatPersonURL" ,function(url){
//         if(url != "/profile"){
//           url = url + "&season=" + GetSeason() + "&time=" + GetDateTime();
//         }else{
//           url = url + "/?season=" + GetSeason();
//         }
//         return new Handlebars.SafeString(url);
//       });
//       Handlebars.registerHelper("formatObjURL" ,function(url, objSea){
//         if(url != "/profile"){
//           url = url + "&season=" + objSea + "&time=" + GetDateTime();
//         }else{
//           url = url + "/?season=" + objSea;
//         }
//         return new Handlebars.SafeString(url);
//       });
//       var searchInfo = $("#search-template").html();
//       var template = Handlebars.compile(searchInfo);
//       var searchData = template(data);
//       $('#search-prompt').html(searchData);
//       $("#search-prompt").trigger("custom-querying");
//     },
//     error: function (jqXHR, textStatus, errorThrown){
//       //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
//       if (jqXHR.status == 403) {
//         alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
//         window.location.href = '/';
//       }
//     }
//   });
//
// }

//===========================These are data sending using ajax================//
//objID is JSON format e.g. {obj_ID: "123"}

//Send read notification to server
// function ajaxSendReadNoti(notiID){
//   var notiJSON = '{"noti_ID:" + ' + notiID + '}';
//   // console.log(notiJSON);
//   $.ajax({
//     url:url_notiRead,
//     type: 'GET',
//     dataType: 'json',
//     data: {test:notiJSON},
//     timeout: 5000,
//     success: function(respData, textStatus, jqXHR){
//
//     },
//     error: function (jqXHR, textStatus, errorThrown){
//       //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
//       if (jqXHR.status == 403) {
//         alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
//         window.location.href = '/';
//       }
//     }
//   });
// }
//Send like data to server
function ajaxSendLike(objID, time){
  var like = {
    "obj_ID": objID,
    "friendID":friID,
    "time":time
  }
  var likeData = JSON.stringify(like);
  console.log(likeData);

  $.ajax({
    url: url_like,
    type: 'GET',
    dataType: 'json',
    data: {test:likeData},
    timeout: 5000,
    success: function(respData, textStatus, jqXHR){
      // var data = JSON.parse(respData);
      // console.log(data);
    },
    error: function (jqXHR, textStatus, errorThrown){
      //console.log('jqXHR: ' + JSON.stringify(jqXHR) + ',\ntextStatus: ' + textStatus + '\nerrorThrown: ' + errorThrown);
      if (jqXHR.status == 403) {
        alert('#Error: 您的憑證已經預期 請重新登入. \n自動導向: Log-in page.');
        window.location.href = '/';
      }
    }

  });

}
//Send updated comment dat to server
function ajaxSendEditCmt(cmtID, cmtText){
  var cmt = {
    "cmt_text": cmtText,
    "cmt_ID": cmtID
  }
  var editCmt = JSON.stringify({cmt});
  $.ajax({
    url: url_editCmt,
    type: 'GET',
    dataType: 'json',
    data: {test: editCmt},
    timeout: 5000,
    success:function(cmt_JSON, textStatus, jqXHR) {
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
function ajaxSendAddCmt(objID, $cmtText, cmtTime, friID){
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
    data: {test: addCmt},
    timeout: 5000,
    success:function(cmt_JSON, textStatus, jqXHR) {
      var cmtData = JSON.parse(cmt_JSON);
      console.log("add cmt success!");
      console.log(cmtData);
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
