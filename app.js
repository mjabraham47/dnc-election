'use strict'
var express = require('express'),
mongoose = require('mongoose'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
app = express(),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
favicon = require('serve-favicon');

app.use(express.static('./client'));
// app.use(favicon('favicon.ico'));

mongoose.connect('mongodb://localhost/dnc-election');

app.use(passport.initialize());
app.use(passport.session());
var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())


app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());


var users = require('./routes/users');
var candidates = require('./routes/candidates');
var electors = require('./routes/electors');

app.use('/users', users);
app.use('/candidates', contracts);
app.use('/electors', electors);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port 3000!');
});

module.exports = app;
