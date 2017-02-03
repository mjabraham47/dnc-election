'use strict';

var express = require('express');
var app = express();
var State = require('../models/state');


app.get('/:state', function() {
	return State.findOne({state: req.params.state})
	.then(function(state){
		res.send(state);
	});
});


module.exports = app;