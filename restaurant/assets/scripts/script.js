let isLoggedIn = false;

$(document).ready(function () {
  runJS();
});

function runJS() {
  $(".dashboard").hide();

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
    } else {
      $(".dashboard").hide();
      $(".login").show();
    }
  }

  function validatePassword(password) {
    //

    $(".errorMsg").text(password);

    return false;
  }
}
