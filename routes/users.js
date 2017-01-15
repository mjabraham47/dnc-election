'use strict';

var express = require('express');
var app = express();
var passport = require('passport');
var async = require('async');
var User = require('../models/user');
var Elector = require('../models/elector');
var zipcodes = require('zipcodes');


app.post('/create', function(req, res) {
    var state = zipcodes.lookup(req.body.zip).state;
    User.create({
            email: req.body.username,
            zip: req.body.zip,
            age: req.body.age
        }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
            user.save();
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
        Elector.findAll({state: user.state}, function(err, electors) {
            if (err) {
                console.log(err);
            } else {
                res.send(electors);
            };
        });
    });
});


module.exports = app;
