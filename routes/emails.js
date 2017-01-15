'use strict';

var express = require('express');
var app = express();
var Email = require('../models/email');

app.post('/email', function(req, res) {
    console.log(req.body);
});



module.exports = app;