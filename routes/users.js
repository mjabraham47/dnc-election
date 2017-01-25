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


app.post('/', function(req, res, next) {
    console.log('req', req)
    return User.create({
        first_name: req.body.first_name,
        last_name: req.body.first_name,
        email: req.body.email,
        endorsed: req.body.endorsed,
        zip: req.body.zip || null,
        abroad: req.body.abroad || false,
        gender: req.body.gender || null,
        age: req.body.age || null
    }).then(function(user){
        res.send(user);
    }).catch(function(err){
        next(err);
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
