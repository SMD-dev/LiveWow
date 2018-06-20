module.exports = (request, ddb) => {
  return new Promise(function(resolve, reject) {
    var bcrypt = require("bcrypt");
    // const saltRounds = 10;
    var email = request.body.email;
    var password = request.body.password;
    var hash;
    console.log(email, password);

    request.session.email = email;

    ddb.getItem(
      {
        AttributesToGet: ["password"],
        TableName: "user",
        Key: {
          email: {
            S: email
          }
        }
      },
      function(err, data) {
        if (err) {
          var returnStatus = 500;

          console.log("return status " + returnStatus);
          console.log("DDB Error: " + err);
        } else {
          console.log("data ", JSON.stringify(data));
          console.log("password retrieved: ", data.Item.password);
          hash = data.Item.password.S;
        }
      }
    );

    console.log(hash);
    bcrypt.compare(password, hash, function(err, res) {
      if (err) {
        request.session.online = false;
        console.log("Error comparing database passwords, " + err);
        resolve(err);
      } else {
        console.log("Correct hash? : " + res);
        console.log(hash);
        request.session.online = res;
        resolve(res);
      }
    });
  });
};
