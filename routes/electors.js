var express = require('express');
var app = express();
var Elector = require('../models/elector');
var User = require('../models/user');
var zipcodes = require('zipcodes');


app.post('/getAllElectors', function(req, res) {
    'use strict';
    if (!req.body.email) throw new Error('No email provided');

    return User.find({email: req.body.email})
    .then(function(users){
        if (!users.length) throw new Error('User not found');

        var user = users[0];
        var state = user.zip ? zipcodes.lookup(user.zip).state : null;
        var age = user.age || '';
        var gender = user.gender || '';
        var abroad = user.abroad;

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

    
    
});


module.exports = app;
