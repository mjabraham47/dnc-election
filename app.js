'use strict'
require('dotenv').config();
var express = require('express'),
mongoose = require('mongoose'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
app = express(),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
favicon = require('serve-favicon'),
config = require('./config'),
cors = require('cors'),
seed = require('./seed');

app.use(cors())
app.use(express.static('./client'));
// // app.use(favicon('favicon.ico'));

mongoose.connect(config.database);

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());



var users = require('./routes/users');
var candidates = require('./routes/candidates');
var electors = require('./routes/electors');
var texts = require('./routes/texts');
var emails = require('./routes/emails');
var postcards = require('./routes/postcards');
var states = require('./routes/states');

app.use('/users', users);
app.use('/candidates', candidates);
app.use('/electors', electors);
app.use('/emails', emails);
app.use('/postcards', postcards);
app.use('/texts', electors);
app.use('/states', states);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port 3000!');
});

module.exports = app;
