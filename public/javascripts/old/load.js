var localhost_url = 'http://localhost:3000';
// load profile page
loadNotifications();
loadProfile();
loadOkrs();

//load noficiations data
function loadNotifications() {
  var url = localhost_url + "/profile/req_Ajax_JSON_Notification";
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      //console.log(data);
      var notiInfo = document.getElementById("noti-template").innerHTML;
      var template = Handlebars.compile(notiInfo);
      var notiData = template(data);
      var notiNumber = data.notifications.length;
      document.getElementById("noti-menu").innerHTML += notiData;
      if (notiNumber > 0) {
        document.getElementById("noti-circle").innerHTML = notiNumber + "+";
      } else {
        $('#noti-circle').css('display', 'none');
      }
    }
  });
}

//load noficiations data
function loadProfile() {
  var url = localhost_url + "/profile/req_Ajax_JSON_ProfileData";
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      Handlebars.registerHelper("formatSeason", function (text) {
        var season = ["Q1", "Q2", "Q3", "Q4"];
        var qtr = text.toString().substr(4, 2);
        var year = text.toString().substr(0, 4);
        var str = year + " " + season[qtr - 1];
        return new Handlebars.SafeString(str);
      });
      var profileInfo = document.getElementById("profile-template").innerHTML;
      var template = Handlebars.compile(profileInfo);
      var profileData = template(data);
      $('.section-profile').html(profileData);
    }
  });
}

//Load okrs into and render into html format
function loadOkrs() {
  var url = localhost_url + "/profile/req_Ajax_JSON_OKRs";

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      Handlebars.registerHelper("formatDate", function (text) {
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
        var month = monthNames[parseInt(text.toString().substr(4, 2)) - 1];
        var day = text.toString().substr(6, 2);
        var str = day + " " + month;

        return new Handlebars.SafeString(str);
      });
      var okrInfo = document.getElementById("okr-template").innerHTML;
      var template = Handlebars.compile(okrInfo);
      var okrData = template(data);
      document.getElementById("section-okr").innerHTML += okrData;
    }
  });

}

// //Load user profile data
// function loadProfile(img, name, position, id) {
//   $('#user-img').attr("src", img);
//   $('#user-name').html(name);
//   $('#user-position').html(position);
//   $('#user').attr("data-user-id", id);
// }
// //Load user available season data
// function loadSeasons(seasons) {
//   var seasonMenu = $('#drop-down-season>ul');
//   var season,
//     year,
//     qtr,
//     seasonStr;
//   $.each(seasons, function(index, value) {
//     if (index == 0) {
//       $('#selected-season').attr('data-season', value);
//       season = value.match(/[0-9]{4}0[1-4]{1}/g);
//       year = value.substr(0, 4);
//       qtr = value.substr(5, 1);
//       seasonStr = year + "年 Q" + qtr;
//
//       $('#selected-season').html(seasonStr);
//     } else {
//       season = value.match(/[0-9]{4}0[1-4]{1}/g);
//       year = value.substr(0, 4);
//       qtr = value.substr(5, 1);
//       seasonStr = year + "年 Q" + qtr;
//       seasonMenu.append('<li ><a href="#" data-season="' + season + '">' + seasonStr + '</a></li>');
//     }
//
//   });
//
// }
// //Load use noficiation data
// function loadNotifications(notifications) {
//   var notiMenu = $('#noti-menu');
//   var userId,
//     userName,
//     userImg,
//     objId,
//     notiContent,
//     notiTime,
//     notiLink;
//   var notiStr;
//   var notiNumber = notifications.length;
//   $('#noti-circle').html("+" + notiNumber);
//   $.each(notifications, function(index, noti) {
//     userId = noti["noti-from"]["noti-user-id"];
//     userName = noti["noti-from"]["noti-user-name"];
//     userImg = noti["noti-from"]["noti-user-img"];
//     objId = noti["noti-obj-id"];
//     notiText = noti["noti-text"];
//     notiTime = noti["noti-time"];
//     notiLink = noti["noti-link"];
//     notiStr = notiModule(userId, userName, userImg, objId, notiText, notiTime, notiLink);
//     notiMenu.append(notiStr);
//   });
// }

// //Generate each nofitification message
// function notiModule(userId, userName, userImg, objId, notiText, Time, notiLink) {
//   var li = $('<li/>', {"data-o-id": objId});
//   var a = $('<a/>', {
//     // "href":notiLink
//   });
//   var notiUserImg = $('<div/>').addClass("noti-user-img");
//   var notiImg1 = $('<div/>').addClass("noti-img");
//   var notiImg2 = $('<img>', {
//     src: userImg,
//     alt: userName,
//     "data-user-id": userId,
//     "class": "user-img"
//   });
//   notiUserImg.prepend(notiImg1.prepend(notiImg2));
//
//   var notiContent = $('<div/>').addClass("noti-content");
//   var notiTexts = $('<div/>').addClass("noti-text");
//   var notiTextP = $('<p/>');
//   var notiName = $('<span/>').addClass("noti-name");
//   var notiTime = $('<div/>').addClass("noti-time");
//   notiName.html(userName);
//   notiTextP.html(notiText);
//   notiTextP.prepend(notiName);
//   notiTexts.prepend(notiTextP);
//   notiTime.prepend('<p>' + Time + '</p>');
//   notiContent.append(notiTexts);
//   notiContent.append(notiTime);
//   var notiCheck = $('<div/>').addClass("noti-check");
//   var notiCheckIcon = $('<i/>', {
//     "class": "fa fa-circle",
//     "aria-hidden": "true"
//   });
//   notiCheck.prepend(notiCheckIcon);
//
//   a.append(notiUserImg);
//   a.append(notiContent);
//   a.append(notiCheck);
//
//   li.append(a);
//   return li;
// }

// //Load user okrs data

// console.log("loadJason complete");


function updateKr() {
  var url = "test/okrs.json";
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',

  });


}
