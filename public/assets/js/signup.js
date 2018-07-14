function validateForm() {
  event.preventDefault();

  // age = document.getElementById('age').value;
  let first = $("#firstname").val();
  let last = $("#lastname").val();
  let email = $("#email").val();
  let date = $("#date").val();
  let p1 = $("#password1").val();
  let p2 = $("#password2").val();
  // if (isNaN(age) || age < 18) {
  //     alert('Must be 18 or older.');
  //     event.preventDefault();
  //     return false;
  // }
  if (p1 !== p2) {
    $("#status").html(
      "<strong style='color:red'>Passwords do not match</strong>"
    );
    return false;
  }
  if (p1.length < 8) {
    $("#status").html(
      "<strong style='color:red'>Password must be at least 8 characters long.</strong>"
    );
    return false;
  }

  var params = {
    first: first,
    last: last,
    email: email,
    date: date,
    password: p1
  };

  signup(params);
}

function signup(params) {
  $.post("/signup", params, function(result) {
    if (result && result.success) {
      $("#status").html(
        "<strong style='color:green'>Successfully logged in.</strong>"
      );
      window.location = "/";
    } else if (result.error === "email") {
      $("#status").html(
        "<strong style='color:red'>That email is already taken.</strong>"
      );
    } else {
      $("#status").html(
        "<strong style='color:red'>Sorry, something went wrong.</strong>"
      );
    }
  }).fail(() => {
    $("#status").html(
      "<strong style='color:red'>Sorry, something went wrong.  Please refresh and try again.</strong>"
    );
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
