'use strict';

var express = require('express');
var app = express();
var Candidate = require('../models/candidate');
var User = require('../models/user');

app.get('/', function(req, res){
	return Candidate.find()
	.then(function(candidates){
		res.send(candidates);
	});
});

module.exports = app;