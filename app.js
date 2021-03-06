'use strict'

var express = require('express');
var app = express();
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index.js');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var pg = require('pg');
var pgSession = require('connect-pg-simple')(session);

// mongodb connection
mongoose.connect("mongodb://localhost:27017/bookworm");
var db = mongoose.connection;

// mongo error
db.on('error', console.error.bind(console, 'connection error'))

//use sessions for tracking logins
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//make user id available in templates
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
})

// for ejs boilerplate
app.engine('ejs', engine);

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// for images and css
app.use('/static', express.static(__dirname + '/src/public'));

// for url routes
app.use('/', routes)

// view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/templates');

// running the server
app.listen(3000, function() {
  console.log("server running on 3000");
})
