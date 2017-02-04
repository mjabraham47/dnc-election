'use strict';

var express = require('express');
var app = express();
var Postcard = require('../models/postcard');
var State = require('../models/state');
var request = require('request');
var config = require('../config');
var Lob = require('lob')('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var paypal = require('paypal-rest-sdk');
var postcardTemplates = require('../postcardTemplates/postcardTemplates');

paypal.configure({
    'mode': config.paypalEnv, //sandbox or live
    'client_id': config.paypalClientId,
    'client_secret': config.paypalClientSecret
});

app.post('/postcard', function(req, res) {
    var createPostcard = {
            checkExistingPostcard: function(body) {
                var that = this;
                Postcard.findOne({ payment_id: body.paymentId }, function(err, existing_postcard) {
                    if (existing_postcard) {
                        res.send('that postcard exists');
                    } else if (err) {
                        throw error;
                    } else {
                        that.confirmPayment(body);
                    }

                });
            },
            confirmPayment: function(body) {
                var that = this;
                paypal.payment.get(body.paymentId, function(error, payment) {
                    if (error) {
                        throw error;
                    } else if (payment.httpStatusCode === 200) {
                        that.findStateParty(body);
                    } else {
                        res.send('pay for your postcard!')
                    }
                });
            },
            findStateParty: function(body) {
                var that = this;
                State.findOne({ state: body.state }, function(err, party) {
                    if (err) {
                        throw err;
                    } else {
                        that.createPostcard(body, party);
                    }
                });
            },
            createPostcard: function(body, party) {
                console.log(req.body)
                var that = this;
                Lob.postcards.create({
                    description: 'DNC Election',
                    to: {
                        name: party.name,
                        address_line1: party.street_address,
                        address_city: party.city,
                        address_state: party.state,
                        address_zip: party.zip
                    },
                    from: {
                        name: body.name,
                        address_line1: body.street_address,
                        address_city: body.city,
                        address_state: body.state,
                        address_zip: body.zip
                    },
                    front: postcardTemplates.front(),
                    back: postcardTemplates.back(body.candidate.first_name + ' ' + body.candidate.last_name, body.name, body.message)
                }, function(err, resp) {
                    console.log(resp);
                    if (err) {
                        throw err;
                    } else {
                        that.savePostcard(body, party, resp);
                    }
                });

            },
            savePostcard: function(body, party, resp) {
                Postcard.create({
                    from: {
                        name: body.name,
                        street_address: body.street_address,
                        city: body.city,
                        state: body.state,
                        zip: body.zip
                    },
                    message: body.message,
                    price: body.price,
                    state: party._id,
                    user: body.user_id,
                    candidate: body.candidate._id,
                    payment_id: body.paymentId

                }, function(err, postcard) {
                    if (err) {
                        throw err;
                    } else {
                        postcard.save();
                        return res.send(resp.thumbnails);
                    }

                });
            }
        };
        createPostcard.checkExistingPostcard(req.body);
});




module.exports = app;
