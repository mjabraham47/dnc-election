'use strict';

var express = require('express');
var app = express();
var Postcard = require('../models/postcard');
var State = require('../models/state');
var request = require('request');
var config = require('../config');
var Lob = require('lob')('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': config.paypalEnv, //sandbox or live
    'client_id': config.paypalClientId,
    'client_secret': config.paypalClientSecret
});

app.post('/postcard', function(req, res) {
    Postcard.findOne({ payment_id: req.body.paymentId }, function(err, existing_postcard) {
        if (existing_postcard) {
            res.send('that postcard exists')
        } else {
            console.log(req.body.message);
            paypal.payment.get(req.body.paymentId, function(error, payment) {
                if (error) {
                    console.log(error);
                    throw error;
                } else if (payment.httpStatusCode === 200) {
                    console.log('payment', payment)
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
                                front: '<html style="margin: .5in; background-color: #fff; color:#2F4F84;"><img style="width: 100%" src="http://res.cloudinary.com/chels/image/upload/v1485882540/Screen_Shot_2017-01-31_at_12.07.21_PM_lmeshe.png"/>I endorse {{name}} for DNC chair. .</html>',
                                back: '<html style="background-color: #2F4F84; color: #fff; margin: .5in; font-size: 20;"><div style="width: 35%">{{message}}</div><img style="width: 55%;" src="http://res.cloudinary.com/chels/image/upload/v1485882540/Screen_Shot_2017-01-31_at_12.07.21_PM_lmeshe.png"/></html>',
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
                                        candidate: req.body.candidate._id,
                                        payment_id: req.body.paymentId

                                    }, function(err, postcard) {
                                        if (err) {
                                            console.log(err);
                                            throw err;
                                        } else {
                                            postcard.save();
                                            res.send(resp.thumbnails);
                                        }

                                    })
                                }
                            });

                        }

                    });
                } else {
                    res.send('pay for your postcard!')
                }
            });
        }
    })


});




module.exports = app;
