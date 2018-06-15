function validateForm() {
  event.preventDefault();

  let email = $("#email").val();
  let p1 = $("#password").val();
  if (email.search("@") === -1 || email.search(".") === -1) {
    $("#status").html("<strong style='color:red'>Not a valid email.</strong>");
    return false;
  }
  if (p1.length > 30) {
    $("#status").html(
      "<strong style='color:red'>Passwordis too long.</strong>"
    );
    return false;
  }

  var params = {
    email: email,
    password: p1
  };

  login(params);
}

function login(params) {
  $.post("/login", params, function(result) {
    if (result && result.success) {
      $("#status").text("Successfully logged in.");
      window.location = "/profile";
    } else {
      $("#status").html(
        "<strong style='color:red'>Incorrect username/password</strong>"
      );
    }
  });
}

function logout() {
  $.post("/logout", function(result) {
    if (result && result.success) {
      window.location = "./login";
    } else {
      alert("Error logging out.");
    }
  });
}
