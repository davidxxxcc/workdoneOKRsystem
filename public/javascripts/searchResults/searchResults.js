// Global variables
var localhost_url = 'http://localhost:3000';
var GCP_url = 'http://35.196.96.33:3000';
var GCP_CMTest_URL = 'http://35.196.96.33:5000';
var Now_url = GCP_CMTest_URL;

var url_searchResults = Now_url + "/search/get_requData_searchResult";
// var url_searchResults = "https://api.myjson.com/bins/1etep3";
// var url_searchResults = "https://api.myjson.com/bins/1dmjhj"; // empty
var hoverMenu = "#8de9c2";
var hoverDuration = 300;
var fadeDuration = 500;


function loadSearchResults(kw, depOnly) {
  $.ajax({
    data: {keywords: kw, depOnly: depOnly},
    url: url_searchResults,
    type: 'GET',
    dataType: 'JSON',
    timeout: 5000,

    success: function(responseData, textStatus, jqXHR) {
      // 前端用
      // if (responseData.isEmpty != true) {
      //   Handlebars.registerHelper("formatSeason", function(text) {
      //     var season = ["Q1", "Q2", "Q3", "Q4"];
      //     var qtr = text.toString().substr(4, 2);
      //     var year = text.toString().substr(0, 4);
      //     var str = year + " " + season[qtr - 1];
      //     return new Handlebars.SafeString(str);
      //   });
      //
      //   var templateInfo = document.getElementById('searchResults_template').innerHTML;
  		// 	var template = Handlebars.compile(templateInfo);
      //   // console.log(responseData);
  		// 	var templateData = template(responseData);
      //   // console.log(templateData);
  		// 	document.getElementById("searchResults_block").innerHTML += templateData;
      //
      //   $('#empty_mes').css('display', 'none');
      //
      //   afterLoading();
      // } else {
      //   var templateInfo = document.getElementById('searchResults_template').innerHTML;
  		// 	var template = Handlebars.compile(templateInfo);
      //   // console.log(responseData);
  		// 	var templateData = template(responseData);
      //   // console.log(templateData);
  		// 	document.getElementById("searchResults_block").innerHTML += templateData;
      //
      //   $('.staff-block').css('display', 'none');
      //   $('.obj-block').css('display', 'none');
      //
      //   afterLoading();
      // }

      // 後端用
      var data = JSON.parse(responseData);
      console.log(data);
      // if (data.departments.length != 0 || data.people.length != 0 || data.objectives.length != 0) {
      if (data.isEmpty == false) {
        console.log('here');
        Handlebars.registerHelper("formatURL", function(url) {
          if (url != '/profile') {
            var seasonGot = GetSeason();
            console.log(seasonGot);
            var curTime = GetDateTime();
            console.log(curTime);
            url += '&season=' + seasonGot + '&time=' + curTime;
          }else{
            var seasonGot = GetSeason();
            url += '/?season=' + seasonGot;
          }
          return new Handlebars.SafeString(url);
        });

        Handlebars.registerHelper("formatObjURL", function(url, objSeason) {
          if (url != '/profile') {
            var curTime = GetDateTime();
            url += '&season=' + objSeason + '&time=' + curTime;
          }else{
            url += '/?season=' + objSeason;
          }
          return new Handlebars.SafeString(url);
        });

        Handlebars.registerHelper("formatSeason", function(text) {
          var season = ["Q1", "Q2", "Q3", "Q4"];
          var qtr = text.toString().substr(4, 2);
          var year = text.toString().substr(0, 4);
          var str = year + "年" + season[qtr - 1];
          return new Handlebars.SafeString(str);
        });

        var templateInfo = document.getElementById('searchResults_template').innerHTML;
  			var template = Handlebars.compile(templateInfo);
        var templateData = template(data);
        document.getElementById("searchResults_block").innerHTML += templateData;

        $('#empty_mes').css('display', 'none');
        $('.hr:last-child').remove();

        afterLoading();
      } else {
        var templateInfo = document.getElementById('searchResults_template').innerHTML;
  			var template = Handlebars.compile(templateInfo);
  			var templateData = template(data);
  			document.getElementById("searchResults_block").innerHTML += templateData;

        $('.hr:last-child').remove();

        afterLoading();
      }
    },

    error: function(jqXHR, textStatus, errorThrown) {}
  });
}


/* ------ After loading... ------ */
function afterLoading() {
  headerAfterLoading();
  activateProgressAnimation();
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
	var dateTime = year + '-' + month + '-' + day + '%' + hour + ':' + minute + ':' + second;
	return dateTime;
}
