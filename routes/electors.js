var express = require('express');
var app = express();
var Elector = require('../models/elector');
var zipcodes = require('zipcodes');


app.post('/getAllElectors', function(req, res) {
    'use strict';

    var state = req.body.zip ? zipcodes.lookup(req.body.zip).state : null;
    var age = req.body.age || '';
    var gender = req.body.gender || '';
    var abroad = req.body.abroad;

    var query = {
        $or: []
    };

    if (gender === "female") {
        query['$or'].push({"sex_female": true});
    }

    if (age < 37) {
        query['$or'].push({"under_37" : true});
    }

    if (age > 64) {
        query['$or'].push({"over_64" : true});
    }

    if (abroad === true) {
       query['$or'].push({"lives_abroad" : true});
    } else {
        query['$or'].push({"state" : state});
    }

    return Elector.find(query)
    .then(function(electors){
        res.send(electors);
    });
    
});


module.exports = app;
