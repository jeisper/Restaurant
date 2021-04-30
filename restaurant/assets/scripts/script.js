let isLoggedIn = true;

const Users = [];

$(document).ready(function () {
  runJS();
});

function runJS() {
  $(".dashboard").hide();
  updateViews();

  $("#login_form").submit(function (e) {
    e.preventDefault();

    if (validatePassword($("#pass").val())) {
      isLoggedIn = true;
    }
    updateViews();
  });

  function updateViews() {
    if (isLoggedIn) {
      $(".dashboard").show();
      $(".login").hide();
      for (let i = 0; i < 5; i++) {
        fatchAPI();
      }
    } else {
      $(".dashboard").hide();
      $(".login").show();
    }
  }
  function fatchAPI() {
    $.ajax({
      url: "https://randomuser.me/api/",
      dataType: "json",
      success: function (data) {
        Users.push(data.results[0]);
        updateUsers();
      },
    });
  }

  function updateUsers() {
    let text = "";
    for (let i = 0; i < Users.length; i++) {
      let user = Users[i];
      let name = user.name + user.surname;
    }
    $(".customer").text(text);
  }
  function validatePassword(password) {
    let strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!strongRegex.test(password)) {
      $(".errorMsg").text(
        "Password must contain: At least eight characters, One number, One special character, One lower and upper case letter!!"
      );
      return false;
    } else {
      $(".errorMsg").text("");
      return true;
    }
  }
}
