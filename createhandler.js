module.exports = (request, ddb) => {
  return new Promise(function(resolve, reject) {
    var bcrypt = require("bcrypt");
    var email = request.body.email;
    var password = request.body.password;
    var name = request.body.name;
    var date = request.body.date;
    console.log(name, email, date, password);

    if (validateEmail(email) === false) {
      console.log("Failed email check.");
      reject("1001");
    }

    bcrypt.hash(password, 10, function(err, hash) {
      if (err) {
        return console.log("Error hashing password, " + err);
      } else {
        var item = {
          email: { S: email },
          password: { S: password }
        };

        ddb.putItem(
          {
            TableName: "users",
            Item: item,
            Expected: { email: { Exists: false } }
          },
          function(err, data) {
            if (err && err.code !== "ConditionalCheckFailedException") {
              if (err.code === "ConditionalCheckFailedException") {
                console.log("Conditional check failed.  409");
              }

              console.log("DDB Error: " + err);
              resolve(err);
            } else {
              console.log("Successfully inserted");
              resolve(data);
            }
          }
        );
      }
    });

    function validateEmail(email) {
      var re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
      return re.test(email);
    }
  });
};
