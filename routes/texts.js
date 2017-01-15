'use strict';

var express = require('express');
var app = express();
var Text = require('../models/text');
var accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; 
var authToken = 'your_auth_token'; 
var client = require('twilio')(accountSid, authToken); 

app.post('/text', function(req, res) {
	client.messages.create({ 
	    to: req.body.to_number, 
	    from: req.body.from_number, 
	    body: req.body.message, 
	    mediaUrl: "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",  
	}, function(err, message) { 
	    console.log(message.sid); 
	});
});



module.exports = app;