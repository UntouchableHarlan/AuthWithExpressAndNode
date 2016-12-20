'use strict'

var express = require('express');
var app = express();
var engine = require('ejs-mate');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index.js');

// mongodb connection
mongoose.connect("mongodb://localhost:27017/bookworm");
var db = mongoose.connection;

// mongo error
db.on('error', console.error.bind(console, 'connection error'))

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
