/* ------ 後端用 ------ */
var localhost_url = 'http://localhost:3000';
var GCP_url = 'http://35.196.96.33:3000';
var GCP_CMTest_URL = 'http://35.196.96.33:5000';
var Now_url = GCP_CMTest_URL;

var url_noti = Now_url + "/profile/get_requData_notification";
var url_random = Now_url + "/othersProfile/get_requData_viewOtherByRan";
var url_depts = Now_url + "/othersProfile/get_requData_viewOtherByDep";
var url_recent = Now_url + "/othersProfile/get_requData_viewOtherByRec";
var url_loadMore = Now_url + "/othersProfile/get_requData_viewOtherLoadMore";
var url_jumptoOthersProfile = Now_url + "/othersOKRs/get_requData_viewOtherOKRs";


/* ------ 前端用 ------ */
// var url_random = "https://api.myjson.com/bins/yhum3";
// var url_depts = "https://api.myjson.com/bins/g1euz";
// var url_recent = "https://api.myjson.com/bins/xazej";
// var url_loadMore = "https://api.myjson.com/bins/1hjpyz";
// var url_noti = "";
// var hoverMenu = "#8de9c2";
// var hoverDuration = 300;
// var fadeDuration = 500;

/* ------ 前端測試用empty JSON ------ */
// var url_recent = "https://api.myjson.com/bins/waiwj";
// var url_loadMore = "https://api.myjson.com/bins/waiwj";


// loadRandomOKRs >> loadDeptsOKRs >> loadRecentOKRs >> afterLoading
ajaxRequNotifications();
// loadRandomOKRs();

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
      headerAfterLoading();
      loadRandomOKRs();
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

/* ------ Load OKRs randomly ------ */
function loadRandomOKRs() {

  $.ajax({
    url: url_random,
    type: 'GET',
    dataType: 'JSON',
    timeout: 5000,

    success: function(responseData, textStatus, jqXHR) {
			/* ------ 後端用 ------ */
			var data = JSON.parse(responseData);

      Handlebars.registerHelper('formatDept', function(job) {
        var jobArr = job.split('/');
        var dept = jobArr[0];
        return new Handlebars.SafeString(dept);
      });

      Handlebars.registerHelper('formatPos', function(job) {
        var jobArr = job.split('/');
        var position = jobArr[1];
        return new Handlebars.SafeString(position);
      });

			var templateInfo = document.getElementById('random_template').innerHTML;
			var template = Handlebars.compile(templateInfo);
			var templateData = template(data);
			document.getElementById("tab_random").innerHTML += templateData;
			if (data.viewOthers_random20.length >= 20) {
				setLoadMoreBtn('append');
			}

			loadDeptsOKRs();


			/* ------ 前端用 ------ */
			// var templateInfo = document.getElementById('random_template').innerHTML;
			// var template = Handlebars.compile(templateInfo);
			// var templateData = template(responseData);
			// document.getElementById("tab_random").innerHTML += templateData;
			// if (responseData.viewOthers_random20.length >= 20) {
			// 	setLoadMoreBtn('append');
			// }
			// loadDeptsOKRs();
    },

    error: function(jqXHR, textStatus, errorThrown) {}

  });
}


/* ------ Load OKRs by depts ------ */
function loadDeptsOKRs() {

  $.ajax({
    url: url_depts,
    type: 'GET',
    dataType: 'JSON',
    timeout: 5000,

    success: function(responseData, textStatus, jqXHR) {
			/* ------ 後端用 ------ */
			var data = JSON.parse(responseData);
			var templateInfo = document.getElementById('depts_template').innerHTML;
			var template = Handlebars.compile(templateInfo);
			var templateData = template(data);
			document.getElementById("tab_depts").innerHTML += templateData;
			loadRecentOKRs();


			/* ------ 前端用 ------ */
      // var templateInfo = document.getElementById('depts_template').innerHTML;
      // var template = Handlebars.compile(templateInfo);
			// var testData = template(responseData);
      // document.getElementById("tab_depts").innerHTML += testData;
      // loadRecentOKRs();
    },

    error: function(jqXHR, textStatus, errorThrown) {}

  });
}


/* ------ Load recent OKRs ------ */
function loadRecentOKRs() {

  $.ajax({
    url: url_recent,
    type: 'GET',
    dataType: 'JSON',
    timeout: 5000,

    success: function(responseData, textStatus, jqXHR) {
			/* ------ 後端用 ------ */
			var data = JSON.parse(responseData);
			if (data.viewOthers_recent.length > 0) {
			  var templateInfo = document.getElementById('recent_template').innerHTML;
		    var template = Handlebars.compile(templateInfo);
				var templateData = template(data);
		    document.getElementById("tab_recent").innerHTML += templateData;

				$('#people_block_empty').hide();

			} else {
				$('#people_block_empty').show();
			}
			afterLoading();


      /* ------ 前端用 ------ */
			// if ($.isEmptyObject(responseData) != true) {
			// 	var templateInfo = document.getElementById('recent_template').innerHTML;
		  //   var template = Handlebars.compile(templateInfo);
			// 	var templateData = template(responseData);
		  //   document.getElementById("tab_recent").innerHTML += templateData;
			// 	// console.log(responseData);
			// 	// console.log(templateData);

			// 	$('#people_block_empty').removeClass('active').hide();
			// 	$('#people_block_recent').addClass('active');

			// } else {
			// 	$('#people_block_empty').addClass('active');
			// 	$('#people_block_recent').removeClass('active').hide();
			// }
			// afterLoading();
    },

    error: function(jqXHR, textStatus, errorThrown) {}

  });
}


/* ------ Load more OKRs when button pressed ------ */
function loadMoreOKRs() {

	$.ajax({
    url: url_loadMore,
    type: 'GET',
    dataType: 'JSON',
    timeout: 5000,

    success: function(responseData, textStatus, jqXHR) {
			/* ------ 後端用 ------ */
			setLoadMoreBtn('remove');

			var data = JSON.parse(responseData);
			if (data.viewOthers_loadMore.length > 0) {
		    var templateInfo = document.getElementById('loadMore_template').innerHTML;
        var template = Handlebars.compile(templateInfo);
				var templateData = template(data);
				document.getElementById("people_block_random").innerHTML += templateData;

				if (data.viewOthers_loadMore.length >= 20) {
					setLoadMoreBtn('append');
				}

				// activateProgressAnimation();
			}


			/* ------ 前端用 ------ */
			// setLoadMoreBtn('remove');

			// if ($.isEmptyObject(responseData) != true) {
	    //   var templateInfo = document.getElementById('loadMore_template').innerHTML;
	    //   var template = Handlebars.compile(templateInfo);
			// 	var templateData = template(responseData);
	    //   document.getElementById("people_block_random").innerHTML += templateData;

			// 	if (responseData.viewOthers_loadMore.length >= 20) {
			// 		setLoadMoreBtn('append');
			// 	}

			// 	activateProgressAnimation();
			// }

		},
		error: function(jqXHR, textStatus, errorThrown) {}

	});
}


/* ------ After loading OKRs... ------ */
function afterLoading() {
  // ajaxRequNotifications();
  setTab();
	setupEventListener();
  // headerAfterLoading();
	activateProgressAnimation();
}


/* ------ 設定載入更多OKRs的按鈕 ------ */
function setLoadMoreBtn(str) {
	if (str === 'append') {
		var html = '<div class="load-more-btn"><button id="load_more_btn">查看更多...</button></div>';
		document.getElementById('people_block_random').insertAdjacentHTML('beforeend', html);
	}
	if (str === 'remove') {
		$('.load-more-btn').remove();
	}
}


/* ------ 設定排序依據的分頁 ------ */
function setTab() {
	// 預設顯示第一個 Tab
	var _showTab = 0;

	$('.filter_tab').each(function() {
		// 目前的頁籤區塊
		var $tab = $(this);

		var $defaultLi = $('ul.tabs li', $tab).eq(_showTab).addClass('active');
		$($defaultLi.find('a').attr('href')).siblings().hide();
    $defaultLi.find('a').css('color', '#f28c8c');

    // 更換目前 hover 到的 li 頁籤的底框顏色
    $('ul.tabs li', $tab).mouseover(function() {
      $(this).css('borderBottom', '#f28c8c 2px solid');
    }).mouseout(function() {
      $(this).css('borderBottom', 'transparent');
    });

		// 當 li 頁籤被點擊時...
		// 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
		$('ul.tabs li', $tab).click(function() {
			// 找出 li 中的超連結 href(#id)

			var $this = $(this),
				  _clickTab = $this.find('a').attr('href');

      // 更換目前點擊到的 li 頁籤的文字顏色
      $this.find('a').css('color', '#f28c8c');
      $this.siblings('.active').find('a').css('color', '#000000');

			// 把目前點擊到的 li 頁籤加上 .active
			// 並把兄弟元素中有 .active 的都移除 class
			$this.addClass('active').siblings('.active').removeClass('active');
			// 淡入相對應的內容並隱藏兄弟元素
			$(_clickTab).stop(false, true).fadeIn().siblings().hide();

			// 切換頁面就做一次動畫
			// activateProgressAnimation();

			return false;

		}).find('a').focus(function() {
			this.blur();
		});

	});

}


/* ------ 卡片和按鈕監聽 ------ */
function setupEventListener() {
	// 監聽tab裡每張卡片
	var $blocks = $('.tab-container'),
      // 監聽載入更多的按鈕
      $loadMoreBtn = $('#load_more_btn');

	// 卡片點選後跳轉
	$blocks.delegate('.other-prof-btn', 'click', jumptoOtherPage);

	// 按鈕點選後載入
	$loadMoreBtn.click(loadMoreOKRs);
}


/* ------ 顯示進度動畫 ------ */
function activateProgressAnimation() {
	// 各圓的處理
	$('.progress-container').each(function() {
		var $chart = $(this).find('.chart'),
			//儲存「遮罩」，設定角度為0
			$circleLeft = $chart.find('.left .mask-inner')
				.css({ transform: 'rotate(0)' }),
			$circleRight = $chart.find('.right .mask-inner')
				.css({ transform: 'rotate(0)' }),
			// 取得百分比
			$percentNumber = $(this).find('.percent-num'),
			percentData = parseInt($percentNumber.text());
			if (percentData >= 100) {
      	percentData = 100;
    	}

		// 設定百分比
		$percentNumber.text(0);

		// 角度的動畫
		$({ percent: 0 }).delay(300).animate({
			percent: percentData
		}, {
			duration: 1000,
			progress: function() {
				var now = this.percent,
						deg = now * 360 / 100,
						degRight = Math.min(Math.max(deg, 0), 180),
						degLeft = Math.min(Math.max(deg - 180, 0), 180);
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


/* ------ 跳轉頁面 ------ */
function jumptoOtherPage() {
	// console.log('Jump to another profile.');

	// 取 user ID
	var $idClicked = $(this).attr('data-id');
	// console.log('idClicked= ' + $idClicked);
	// 取自己的 UUID
	var $personalUUID = $('#people_block_random').attr('data-id');
	// console.log('uuid= ' + $personalUUID);

	// 判斷如果點到自己
	if ($idClicked == $personalUUID) {
		// 導向自己的個人頁面
		window.location.href = '/profile';
	} else {
		// 取 season
		var seasonGot = GetSeason();
		// console.log(seasonGot);

		// 取 current time ex: "2017-10-18 16:12:4"
		var curTime = GetDateTime();
		// console.log(curTime);

		var dataReturned = {
			"user_ID": $idClicked,
			"season": seasonGot,
			"time": curTime
		}
		var data = JSON.stringify({dataReturned});
		// console.log(dataReturned);
		window.location.href = '/othersOKRs/get_requPage_viewOtherOKRs/?others_UUID=' + $idClicked + '&season=' + seasonGot + '&time=' + curTime;
	}

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

/* ------ 判斷物件或JSON是否為空的 ------ */
// function isEmptyObject(e) {
//     var t;
//     for (t in e)
//         return !1;
//     return !0
// }
