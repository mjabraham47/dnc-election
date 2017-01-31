'use strict';

var express = require('express');
var config = require('../config.js');
var app = express();
var passport = require('passport');
var async = require('async');
var User = require('../models/user');
var Elector = require('../models/elector');
var zipcodes = require('zipcodes');
var Candidate = require('../models/candidate');
var request = require('request-promise');
var emailExistence = require('email-existence');


app.post('/endorse', function(req, res, next) {
    
    if (!req.body.recaptcha) throw new Error('Missing recaptcha response');

    var googleSecret = config.googleCaptchaKey;
    var remoteIp = req.connection.remoteAddress;
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + googleSecret + "&response=" + req.body.recaptcha + "&remoteip=" + remoteIp;
    var created = true;

    return request(verificationUrl)
    .then(function () {
        return request(verificationUrl);
    }).then(function(response){
        if (response['error-codes']) throw new Error('Captcha verification failed');

        return User.find({email: req.body.email});
    }).then(function (users) {
        if (!users.length) {
            return User.create(req.body);
        } else {
            created = false;
            return User.update(req.body)
            .then(function(res){
                return users[0];
            });
        }
    }).then(function(updatedUser){
        res.send({ created: created, user: updatedUser });
    });
});

app.get('/:userId/electors', function(req, res) {
    var userId = req.params.userId;

    return User.findById(userId)
    .then(function(user){
        if (!user) throw new Error('User not found');

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

app.get('/getInfo/:id', function(req, res) {
    User.findById({
            _id: req.params.id
        })
        .populate('endorsed')
        .exec(function(err, user) {
            if (err) {
                console.log(err);
            } else {
                res.json(user);
            }
        });
});


app.get('/:id/electors', function(req, res) {
    User.findOne({ _id: id }, function(err, user) {
        Elector.findAll({ state: user.state }, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    });
});


module.exports = app;
