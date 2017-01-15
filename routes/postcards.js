'use strict';

var express = require('express');
var app = express();
var Postcard = require('../models/postcard');
var State = require('../models/state');
var Lob = require('lob')('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

app.post('/postcard', function(req, res) {
    console.log(req.body);
    State.findOne({ state: req.body.state },
            function(err, state) {
                if (err) {
                    console.log(err);
                } else {
                    res.send(state);
                };
            });
    // Lob.postcards.create({
    //     description: 'Demo Postcard job',
    //     to: {
    //         name: 'Joe Smith',
    //         address_line1: '123 Main Street',
    //         address_city: 'Mountain View',
    //         address_state: 'CA',
    //         address_zip: '94041'
    //     },
    //     front: '<html style="padding: 1in; font-size: 50;">Front HTML for {{name}}</html>',
    //     back: '<html style="padding: 1in; font-size: 20;">Back HTML for {{name}}</html>',
    //     data: {
    //         name: 'Harry'
    //     }
    // }, function(err, res) {
    //     console.log(err, res);
    // });

});




module.exports = app;
