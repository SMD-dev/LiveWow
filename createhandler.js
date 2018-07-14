module.exports = (request, ddb) => {
  return new Promise(function(resolve, reject) {
    var bcrypt = require("bcrypt");
    var email = request.body.email;
    var password = request.body.password;
    var first = request.body.first;
    var last = request.body.last;
    var date = request.body.date;
    console.log(first, last, email, date, password);
    console.log(JSON.stringify(request.body));

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
          first: { S: first },
          last: { S: last },
          birthday: { S: date },
          password: { S: hash }
        };

        ddb.putItem(
          {
            TableName: "user",
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
              request.session.email = email;
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
