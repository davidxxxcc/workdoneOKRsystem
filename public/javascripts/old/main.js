//Change content of add-okr button with when resizing window
$(function() {
  $windowWidth = $(window).width();
  $okrBTN = $('#add-okr>a');
  //Current window size
  if ($windowWidth <= 800) {
    $okrBTN.html("+");
  } else {
    $okrBTN.html("+新增您的OKR");
  }

  //detect window resize
  $(window).resize(function() {
    $windowWidth = $(window).width();
    // console.log($windowWidth);
    if ($windowWidth <= 800) {
      $okrBTN.html("+");
    } else {
      $okrBTN.html("+新增您的OKR");
    }
  });

});
//Hover for add-okr button
$(function() {
  var duration = 300;
  $('#add-okr').on('mouseover', function() {
    $(this).stop(true).animate({
      backgroundColor: '#f7786b'
    }, duration,);
  }).on('mouseout', function() {
    $(this).stop(true).animate({
      backgroundColor: '#f28c8c'
    }, duration);
  });
});
//Hover for add-kr button
$(function() {
  var duration = 300;
  $('.kr-add-icon').on('mouseover', function() {
    $(this).stop(true).animate({
      backgroundColor: '#f7786b'
    }, duration,);
  }).on('mouseout', function() {
    $(this).stop(true).animate({
      backgroundColor: '#f28c8c'
    }, duration);
  });
});
//objective progress chart animation
$(function() {
  activate();
});
function activate() {
  var $charts = $('.chart');
  // $('.circle').each(function(index, el) {
  //   var num = $(this).find('span').text() * 3.6;
  //   if (num <= 180) {
  //     $(this).find('.right').css('transform', "rotate(" + num + "deg)");
  //   } else {
  //     $(this).find('.right').css('transform', "rotate(180deg)");
  //     $(this).find('.left').css('transform', "rotate(" + (
  //     num - 180) + "deg)");
  //   };
  // });

  $charts.each(function() {
    var $chart = $(this),
      //Store mask and set to 0 deg
      $circleLeft = $chart.find('.left .circle-mask-inner').css({transform: 'rotate(0)'}),
      $circleRight = $chart.find('.right .circle-mask-inner').css({transform: 'rotate(0)'}),
      //get current percentage
      $percentNumber = $chart.find('.percent-number'),
      percentData = $percentNumber.text();
    if (percentData >= 100) {
      percentData = 100;
    }
    //set current percentage to 0
    $percentNumber.text(0);

    $({percent: 0}).delay(1000).animate({
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
//Show objective drop down menu
$(function() {
  var duration = 500;
  $('.more-option').on('click', function() {
    var objId = $(this).attr("data-obj-id");
    var $moreMenu = $(".drop-down-obj[data-obj-id='" + objId + "']");

    if ($moreMenu.css('display') == 'none') {
      $moreMenu.stop(true).fadeIn(duration);
    } else {
      $moreMenu.stop(true).fadeOut(duration);
    }
  });

  $('.obj-menu-li').on('mouseover', function() {
    $(this).stop(true).animate({
      'background-color': '#54c8cf'
    }, duration / 2);
  }).on('mouseout', function() {
    $(this).stop(true).animate({
      'background-color': '#f2f2f2'
    }, duration / 2);
  });

});
//Show season drop down menu {
$(function() {
  var duration = 500;
  var $seasonIcon = $('#fa-drop-down');
  var $seasonMenu = $('#drop-down-season');

  $seasonIcon.on('click', function() {
    if ($seasonMenu.css('display') == 'none') {
      $seasonMenu.stop(true).fadeIn(duration);
      $(this).stop(true).css('transform', 'rotate(180deg)');
    } else {
      $seasonMenu.stop(true).fadeOut(duration);
      $(this).stop(true).css('transform', 'rotate(0deg)');
    }
  });

  // $season.find('#Q1, #Q2, #Q3').on('mouseover', function() {
  //   $(this).css('background-color', '#f28c8c');
  // }).on('mouseout', function() {
  //   $(this).css('background-color', 'rgba(204, 204, 204, 0.4)');
  // });

});
//Show options drop down menu {
$(function() {
  var $notiIcon = $('#options-fa-bell');
  var $notiMenu = $('#drop-down-options-notification');
  var $moreIcon = $('#options-fa-more, #options-fa-more-mobile');
  var $moreMenu = $('#drop-down-options-more');
  var duration = 500;
  //more options menu
  $moreIcon.on('click', function() {
    $notiMenu.fadeOut(duration / 2);
    //console.log($moreMenu);

    if ($moreMenu.css('display') == 'none') {
      $moreMenu.fadeIn(duration);
    } else {
      $moreMenu.fadeOut(duration);
    }

    $moreMenu.find('li').on('mouseover', function() {
      $(this).stop(true).animate({
        'background-color': '#54c8cf',
        'border-left-width': '10px',
        'border-left-color': '#2FEE85'
      }, duration / 2);

    }).on('mouseout', function() {
      $(this).stop(true).animate({
        'background-color': '#f2f2f2',
        'border-left-width': '0px'
      }, duration / 2);
    });
  });

  //notification menu
  $notiIcon.on('click', function() {
    $('#noti-menu li').on('click', function() {
      console.log($(this));
      $(this).css('backgroundColor', '#f2f2f2');
      $(this).find('.fa-circle').fadeOut(duration);
    });
    //console.log($notiIcon);
    $moreMenu.fadeOut(duration / 2);
    //Show and hide notiMenu
    $('#noti-circle').fadeOut(duration, function() {

      if ($notiMenu.css('display') == 'none') {
        $notiMenu.fadeIn(duration);
      } else {
        $notiMenu.fadeOut(duration);
      }
    });
  });

});
//Show cmt more drop down menu {
$(function() {
  var $cmtIcon = $('.cmt-more-icon');
  //console.log($cmtIcon);
  var $cmtMenu;
  var cmtId;
  var duration = 500;
  //more options menu
  $cmtIcon.on('click', function() {
    cmtId = $(this).attr("data-cmt-id");
    $cmtMenu = $(".drop-down-cmt[data-cmt-id='" + cmtId + "']");
    console.log(cmtId);
    //$progressBar = $(".progress-bar[data-kr-id='" + id + "']");
    if ($cmtMenu.css('display') == 'none') {
      $cmtMenu.fadeIn(duration);
    } else {
      $cmtMenu.fadeOut(duration);
    }

    $cmtMenu.find('li').on('mouseover', function() {
      $(this).stop(true).animate({
        'background-color': '#54c8cf'
      }, duration / 2);

    }).on('mouseout', function() {
      $(this).stop(true).animate({
        'background-color': '#f2f2f2'
      }, duration / 2);
    });
  });
});
//Change profile image
$(function() {
  var duration = 300;
  $images = $('#profile-img');
  $images.on('mouseover', function() {
    $(this).find('strong, span').stop(true).animate({
      opacity: 1
    }, duration);
  }).on('mouseout', function() {
    $(this).find('strong, span').stop(true).animate({
      opacity: 0
    }, duration);
  });
});
//key result edit function
$(function() {
  var duration = 500;
  var curVal;
  $krButton = $('.fa-refresh');
  $krButton.on('click', function() {
    var id = $(this).attr("data-kr-id");
    curVal = $(".numerator[data-kr-id='" + id + "']").val();
    $(this).fadeOut(duration, function() {
      $(".numerator[data-kr-id='" + id + "']").attr('readonly', false);
      $(".kr-cancel[data-kr-id='" + id + "'],.kr-confirm[data-kr-id='" + id + "']").css({'opacity': '1', 'display': 'inline-block'});
      //$(this).siblings('.kr-number').find('input').attr('readonly', false);
      //$(this).siblings('button').css({'opacity': '1', 'display': 'inline-block'});
    });
  });

  $(".kr-cancel, .kr-confirm").on('click', function() {
    var id = $(this).attr("data-kr-id");
    if ($(this).hasClass("kr-confirm")) {
      updateProgressbar(id);
      var objId = $(this).attr("data-obj-id");
      console.log(objId);
      updateProgressChart(objId);
    } else {
      $(".numerator[data-kr-id='" + id + "']").val(curVal);
    }

    $("button[data-kr-id='" + id + "']").fadeOut(duration, function() {
      $(".numerator[data-kr-id='" + id + "']").attr('readonly', true);
      $(".fa-refresh[data-kr-id='" + id + "']").css({'opacity': '1', 'display': 'inline-block'});
      // $(this).siblings('.kr-number').find('input').attr('readonly', true);
      // $(this).siblings('.fa-refresh').css({'opacity': '1', 'display': 'block'});
    }).animate({opacity: 0});
  });

});
//Update progressbar function
function updateProgressbar(id) {
  $progressBar = $(".progress-bar[data-kr-id='" + id + "']");
  $progressLabel = $(".kr-progress-number[data-kr-id='" + id + "']");
  var denominator = $(".denominator[data-kr-id='" + id + "']").html();
  var numerator = $(".numerator[data-kr-id='" + id + "']").val();
  var width = (numerator / denominator) * 100;
  width = width.toFixed(0); //Set no decimal progress value shown on web
  $progressLabel.html(width);
  $progressBar.css("width", width + "%"); //Set progrssBar image
  $progressBar.attr('aria-valuenow', numerator).attr('style', "width:" + width + '%');
  // console.log("id: " + id);
  // console.log("progressBar: " + $progressBar);
  // console.log("denominator: " + denominator);
  // console.log("numerator: " + numerator);
  // console.log("width: " + width);
}
//Update progress chart
function updateProgressChart(objId) {
  //console.log(objId);
  $krNumber = $(".kr-progress-number[data-obj-id='" + objId + "']");
  var $objNumber = $(".percent-number[data-obj-id='" + objId + "']");
  console.log($objNumber.html());
  var sum = 0,
    avg = 0;
  $krNumber.each(function(index) {
    if (parseInt($(this).html()) >= 100) {
      sum += 100;
    } else {
      sum += parseInt($(this).html());
    }

  });
  avg = (sum / $krNumber.length).toFixed(0);
  $objNumber.html(avg);
  activate(); //rerender progress chart

}
//Slide history menu
$(function() {
  var duration = 300;
  var $buttonId;
  $aside = $('.history-slide');
  $button = $('.obj-history');
  $buttonExit = $('.hisBtn');

  $button.on('click', function() {
    $buttonId = $(this).attr('data-obj-id');
    //console.log($aside.offset().top);
    $aside = $(".history-slide[data-obj-id='" + $buttonId + "']");
    $aside.stop(true).animate({
      right: '0px',
      top: '80px'

    }, duration).css({display: 'block'});
    // $aside.offset({ top: 10, left: 30 });
    // var bodyRect = document.body.getBoundingClientRect();
    //var elemRect = $('.obj-history').getBoundingClientRect();
    //var offset   = elemRect.top - bodyRect.top;
    // console.log(bodyRect.top);
    // var rect = $aside.getBoundingClientRect();
    // console.log(rect.top, rect.right, rect.bottom, rect.left);

    //console.log($aside.offset().top);
  });

  $buttonExit.on('click', function() {
    $buttonId = $(this).attr('data-obj-id');
    $aside = $(".history-slide[data-obj-id='" + $buttonId + "']");
    $aside.stop(true).animate({
      right: '-720px'
    }, duration).fadeOut(duration);
  });

  var curDate = "";
  var prevDate = "";

  $('.history-li').each(function(i) {
    prevDate = curDate;
    curDate = $(this).attr('data-history-date');

    if (prevDate == curDate) {
      $(this).find('.solid-dot').css('display', 'display');
      $(this).find('.hollow-dot').css('display', 'none');
      //console.log( "solid"+ $(this) + i);
    } else {
      $(this).find('.solid-dot').css('display', 'none');
      $(this).find('.hollow-dot').css('display', 'display');
      //console.log("hollow" + $(this) + i);

    }

  });

});
//Get current dynamic scroll data
// $(function(){
//   const height = $(window).height();
//
//   const scrollTop = $(window).scrollTop();
// });
