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
  var session = require("express-session");
  var createhandler = require("./createhandler.js");
  var loginHandler = require("./loginHandler.js");

  AWS.config.region = process.env.REGION;

  var ddb = new AWS.DynamoDB();

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
  app.get("/guardians", function(req, res) {
    res.render("guardians");
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
  app.get("/webcam", function(req, res) {
    res.render("webcam");
  });

  app.post("/login", function(req, res) {
    loginHandler(req, ddb).then(result => {
      email = request.session.email;
      online = request.session.online;

      if (online) {
        response.json({ success: "true" });
        console.log("success");
      } else {
        response.json("error");
        console.log("error");
      }
    });
  });

  app.post("/signup", function(req, res) {
    createhandler(request).then(result => {
      email = request.session.email;

      if (email) {
        response.render("pages/confirmation", { email: email });
        console.log("success");
      } else {
        response.json("Error creating account.");
        console.log("error");
      }
    });
  });

  var port = process.env.PORT || 3000;

  var server = app.listen(port, function() {
    console.log("Server running at http://127.0.0.1:" + port + "/");
  });
}
