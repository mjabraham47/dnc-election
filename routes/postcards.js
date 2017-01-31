'use strict';

var express = require('express');
var app = express();
var Postcard = require('../models/postcard');
var State = require('../models/state');
var request = require('request');
var config = require('../config');
var Lob = require('lob')('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

app.post('/postcard', function(req, res) {
    request.post('https://api-3t.sandbox.paypal.com/USER=' + config.paypalUsername + '&PWD=' + config.paypalPassword + '&METHOD=GetTransactionDetails&TRANSACTIONID=' + req.body.paymentId + '&VERSION=204',
        function(error, response, body) {
            console.log('ERR', error);
            console.log('body', body);
            console.log('resp', response);
            if (!error && response.statusCode == 200) {
                console.log(body) // Show the HTML for the Google homepage.

                State.findOne({ state: req.body.state }, function(err, party) {
                    if (err) console.log(err);
                    else {
                        Lob.postcards.create({
                            description: 'Postcard to Power',
                            to: {
                                name: party.name,
                                address_line1: party.street_address,
                                address_city: party.city,
                                address_state: party.state,
                                address_zip: party.zip
                            },
                            from: {
                                name: req.body.name,
                                address_line1: req.body.street_address,
                                address_city: req.body.city,
                                address_state: req.body.state,
                                address_zip: req.body.zip
                            },
                            front: '<html style="padding: 1in; font-size: 50;">Front HTML for {{name}}.  Message is {{message}}.</html>',
                            back: '<html style="padding: 1in; font-size: 20;">Back HTML for {{name}}</html>',
                            data: {
                                name: req.body.candidate.first_name + ' ' + req.body.candidate.last_name,
                                message: req.body.message
                            }
                        }, function(err, resp) {
                            console.log(err, resp);
                            if (err) {
                                console.log(err);
                                throw err;
                            } else {
                                Postcard.create({
                                    from: {
                                        name: req.body.name,
                                        street_address: req.body.street_address,
                                        city: req.body.city,
                                        state: req.body.state,
                                        zip: req.body.zip
                                    },
                                    message: req.body.message,
                                    price: req.body.price,
                                    state: party._id,
                                    user: req.body.user_id,
                                    candidate: req.body.candidate._id
                                }, function(err, postcard) {
                                    if (err) {
                                        console.log(err);
                                        throw err;
                                    } else {
                                        postcard.save();
                                        res.send('postcard sent');
                                    }

                                })
                            }
                        });

                    }

                });
            }
        });
});




module.exports = app;
