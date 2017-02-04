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
var Bluebird = require('bluebird')
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
        response = JSON.parse(response);
        if (response['error-codes']) {
            res.status(500).send({ error: 'Captcha verification failed!' });
        }

        return User.findOne({email: req.body.email});
    }).then(function(user){
        if (!user._id) {
            var checkEmail = Bluebird.promisify(emailExistence.check);
            return checkEmail(req.body.email)
            .then(function(response){
                if (!response) res.status(500).send({error: 'Email verification failed!'});
                return User.create(req.body);
            })
            .catch(function(err){
                res.status(500).send({error: 'Email verification failed!'});
            })
            .then(function(user){
                return Candidate.findOneAndUpdate({_id: req.body.endorsed}, { $inc: {endorsements: 1}});
            })
            .then(function(candidate){
                return candidate.save();
            });
        } else {
            created = false;
            
            return User.update({_id: user._id}, req.body)
            .then(function(res){
                console.log('res', res)
                return Candidate.findOneAndUpdate({_id: user.endorsed}, { $inc: {endorsements: -1}});
            }).then(function(candidate){
                return candidate.save();
            }).then(function(){
                return Candidate.findOneAndUpdate({_id: req.body.endorsed}, { $inc: {endorsements: 1}});
            }).then(function(candidate){
                return candidate.save();
            });
        }
    }).then(function(){
        return User.findOne({email: req.body.email});
    }).then(function(user){
        user.isNew = false;
        res.send({ created: created, user: user});
    }).catch(function(err) {
        console.error('err', err)
        res.status(500).send({error: 'There was an error processing your request'});
    })
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


module.exports = app;
