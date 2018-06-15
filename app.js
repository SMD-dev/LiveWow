// Include the cluster module
var cluster = require("cluster");

// Code to run if we're in the master process
if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require("os").cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for terminating workers
  cluster.on("exit", function(worker) {
    // Replace the terminated workers
    console.log("Worker " + worker.id + " died :(");
    cluster.fork();
  });

  // Code to run if we're in a worker process
} else {
  var AWS = require("aws-sdk");
  var express = require("express");
  var bodyParser = require("body-parser");
  var path = require("path");

  AWS.config.region = process.env.REGION;

  var sns = new AWS.SNS();
  var ddb = new AWS.DynamoDB();

  var ddbTable = "user";
  var snsTopic = process.env.NEW_SIGNUP_TOPIC;
  var app = express();

  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "/public")));
  app.set("views", __dirname + "/views");
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/services", function(req, res) {
    res.render("services");
  });
  app.get("/gaurdians", function(req, res) {
    res.render("gaurdians");
  });
  app.get("/wow", function(req, res) {
    res.render("wow");
  });
  app.get("/store", function(req, res) {
    res.render("store");
  });
  app.get("/careers", function(req, res) {
    res.render("careers");
  });
  app.get("/about", function(req, res) {
    res.render("about");
  });
  app.get("/contact", function(req, res) {
    res.render("about.ejs#contact");
  });
  app.get("/login", function(req, res) {
    res.render("login");
  });
  app.get("/signup", function(req, res) {
    res.render("signup");
  });
  app.get("/profile", function(req, res) {
    res.render("profile");
  });

  app.post("/login", function(req, res) {
    ddb.getItem(
      {
        AttributesToGet: ["password"],
        TableName: "user",
        Key: {
          email: {
            S: req.body.email
          }
        }
      },
      function(err, data) {
        if (err) {
          var returnStatus = 500;

          console.log("return status " + returnStatus);
          console.log("DDB Error: " + err);
          res.json({ success: false }).end();
        } else {
          console.log("data ", JSON.stringify(data));
          res.json({ success: true }).end();
        }
      }
    );
  });

  app.post("/signup", function(req, res) {
    var item = {
      email: { S: req.body.email },
      password: { S: req.body.password },
      ConditionExpression: "attribute_not_exists(email)"
    };

    ddb.putItem(
      {
        TableName: ddbTable,
        Item: item,
        Expected: { email: { Exists: false } }
      },
      function(err, data) {
        if (err && err.code !== "ConditionalCheckFailedException") {
          var returnStatus = 500;

          console.log("return status " + returnStatus);
          console.log("DDB Error: " + err);
          res.json({ success: false }).end();
        } else {
          // sns.publish(
          //   {
          //     Message:
          //       "Name: " + req.body.name + "\r\nEmail: " + req.body.email,
          //     Subject: "New user sign up!",
          //     TopicArn: snsTopic
          //   },
          //   function(err, data) {
          //     if (err) {
          //       res.status(500).end();
          //       console.log("SNS Error: " + err);
          //     } else {
          //       console.log("201 status");
          //       res.status(201).end();
          //     }
          //   }
          // );
          returnStatus = 201;
          console.log("201 baby");
        }

        if (err.code === "ConditionalCheckFailedException") {
          console.log("Conditional check failed.  409");
        }

        res.status(returnStatus);
        res.json({ success: true }).end();
      }
    );
  });

  var port = process.env.PORT || 3000;

  var server = app.listen(port, function() {
    console.log("Server running at http://127.0.0.1:" + port + "/");
  });
}
