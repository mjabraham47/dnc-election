'use strict';

var express = require('express');
var app = express();
var passport = require('passport');
var User = require('../models/user');
var async = require('async');

app.post('/create', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (!user) {
            async.waterfall([
                    function(callback) {
                        User.register(new User({
                                username: req.body.username,
                                email: req.body.email
                            }),
                            req.body.password,
                            function(err, person) {
                                if (err) {
                                    res.sendStatus(400);
                                }
                                callback(null, person);

                            });
                    },
                    function(guy, callback) {
                        passport.authenticate('local')(req, res, function() {
                            callback(null, guy);

                        });
                    },

                ],
                function(err, results) {
                    if (err) {
                        console.log('err', err)
                    }
                    res.send(results);
                });
        } else {
            res.send('already exists');
        }
    });
});

app.post('/login', passport.authenticate('local'), function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) {
            res.send('does not exist');
        }
        res.json(user);
    });
});

app.get('/getInfo/:id', function(req, res) {
    User.findById({
        _id: req.params.id
    })
    .populate('contracts')
    .exec(function(err, user) {
        res.json(user);
    });
});


//change password doesn't work

// app.post('/changePassword', function(req, res) {
//     console.log(req.body)
//     User.findById({
//     _id: req.body.id
//     }, function(err, user) {
//         console.log('USER', user)
//         user.setPassword(req.body.password, function(new_user) {
//         console.log(new_user);
//         res.send(new_user)
//         }); 
//     });
// });

app.get('/logout', function(req, res) {
  req.logout();
  res.send('loggedOut');
});

module.exports = app;