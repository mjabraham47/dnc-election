'use strict';

var express = require('express');
var app = express();
var Elector = require('../models/elector');
var zipcodes = require('zipcodes');


app.get('/getStateElectors/:zip', function(req,res) {
    var state = zipcodes.lookup(req.body.zip).state;
    Elector.findAll({state: user.state}, function(err, electors) {
        if (err) {
            console.log(err);
        } else {
            res.send(electors);
        };
    });    
});


module.exports = app;