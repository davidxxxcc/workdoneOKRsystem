/*
----TO-DO LIST----
    * Add event handler
    * Get input values
    * Compare the data
    * Print error message, if wrong
    * Clear input fields
    * Jump to next page
*/
var localhost_url = 'http://localhost:3000';
var GCP_url = 'http://35.196.96.33:3000';
var GCP_CMTest_URL = 'http://35.196.96.33:5000';
var Now_url = GCP_CMTest_URL;

var UIController = (function () {
  var DOMstrings = {
    inputId: 'id_input',
    inputPwd: 'pwd_input',
    errorContainer: 'input_error'
  };

  var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

  return {
    getDOMstrings: function () {
      return DOMstrings;
    },

    // Get input values
    getInput: function () {
      var idChecked = document.getElementById(DOMstrings.inputId).value.trim();
      var pwdChecked = document.getElementById(DOMstrings.inputPwd).value.trim();
      if ((idChecked !== "") && (pwdChecked !== "") && (idChecked.search(emailRule) != -1)) {
        return {
          "id": idChecked,
          "pwd": pwdChecked
        };
      } else {
        return "ERROR";
      }
    },

    // Print error message
    showErrorMessage: function () {
      element = DOMstrings.errorContainer;
      document.getElementById(element).style.visibility = "visible";
    },
    clearFields: function () {
      document.getElementById(DOMstrings.inputId).value = "";
      document.getElementById(DOMstrings.inputPwd).value = "";
      document.getElementById(DOMstrings.inputId).focus();
    }
  }
})();


var checkController = (function (UICtrl) {
  return {
    loginCheck: function (accountPkg) {
      console.log('Let\'s run loginCheck ajax.' + JSON.stringify(accountPkg));
      $.ajax({
        data: accountPkg,
        url: Now_url + '/login/pos_provData_loginCheck',
        type: 'post',
        dataType: 'json',
        timeout: 5000,
        success: function (resData, textStatus, jqXHR) {
          if (resData.jp_status == 200) {
            res_statusCode = resData.jp_status;
            res_msg = resData.jp_msg;
            console.log('status code => ' + res_statusCode + ' - ' + res_msg);
            window.location.href = '/profile';
          } else {
            res_statusCode = resData.jp_status;
            res_msg = resData.jp_msg;
            console.log('status code => ' + res_statusCode + ' - ' + res_msg);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          // res_statusCode = 404;
          // res_msg = 'Server connect error.';
          // console.log('status code => ' + res_statusCode + ' - ' + res_msg);
          if (jqXHR.status == 401) {
            // 401 - Data Dismatch
            console.log('XMLHttpRequest: ' + jqXHR.status);
            console.log('textStatus: ' + textStatus);
            // alert('#Error: Account or Password is Dismatch. Re-input plz.');
            UICtrl.showErrorMessage();
            UICtrl.clearFields();

          } else if (jqXHR.status == 503) {
            console.log('XMLHttpRequest: ' + jqXHR.status);
            console.log('textStatus: ' + textStatus);
            // alert('#Error: SQL Service Unavailable.');
          } else {
            console.log('XMLHttpRequest: ' + jqXHR.status);
            console.log('textStatus: ' + textStatus);
            // alert('#Error: UnExpected Error.');
          }
        }
      });
    }
  }
})(UIController);



var accountController = (function (UICtrl, checkCtrl) {
  var inputAccount, DOMstrings;

  DOMstrings = UICtrl.getDOMstrings();

  var compareAccount = function () {
    // 1. Get input data
    inputAccount = UICtrl.getInput();
    console.log('Data Get!');
    console.log(inputAccount);

    if (inputAccount === 'ERROR') { // match email input with regular expression
      // 2-1. Print error message if input is not regular expression
      UICtrl.showErrorMessage();
      // 3. Clear the input fields
      UICtrl.clearFields();
    } else {
      // 2-2. Compare the data
      checkCtrl.loginCheck(inputAccount);
      // 2-2-1. Print error message if input is wrong
    }
  };

  // Add event handler
  var setupEventListener = function () {
    document.getElementById('login_btn').addEventListener('click', function () {
      console.log('You clicked the login button.');
      compareAccount();
    });

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) { // 有些browser沒有keyCode，就可以用which property
        console.log('ENTER was pressed.');
        compareAccount();
      }
    });
  }

  return {
    init: function () {
      console.log('Application has started.');
      setupEventListener();
    }
  }
})(UIController, checkController);

accountController.init();
