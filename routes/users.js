'use strict';

var express = require('express');
var app = express();
var passport = require('passport');
var async = require('async');
var User = require('../models/user');
var Elector = require('../models/elector');
var zipcodes = require('zipcodes');
var Candidate = require('../models/candidate');
var emailExistence = require('email-existence');


app.post('/create', function(req, res) {
    emailExistence.check(req.body.email, function(err, response) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            console.log('res: ' + response);
            if (response === true) {
                //var state = zipcodes.lookup(req.body.zip).state;
                User.create({
                    first_name: req.body.first_name,
                    last_name: req.body.first_name,
                    email: req.body.email,
                    endorsed: req.body.endorsed
                }, function(err, user) {
                    if (err) {
                        console.log(err);
                        throw err;
                    } else {
                        Candidate.findByIdAndUpdate({ _id: req.body.endorsed }, { $inc: { endorsements: 1 } },
                            function(err, candidate) {
                                if (err) throw err;
                                user.save();
                                candidate.save();
                                res.send(user);
                            });
                    }
                });
            } else {
                throw new Error('There was an error creating a new user account');
            }
        }
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
