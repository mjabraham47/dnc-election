'use strict';

var express = require('express');
var app = express();
var Postcard = require('../models/postcard');
var Lob = require('lob')('test_0dc8d51e0acffcb1880e0f19c79b2f5b0cc');

app.post('/postcard', function(req, res) {
    Lob.postcards.create({
        description: 'Demo Postcard job',
        metadata: { campaign: "NEWYORK2015" },
        to: 'adr_78c304d54912c502',
        from: 'adr_61a0865c8c573139',
        front: '<html style="margin: 130px; font-size: 50;">Front HTML for {{name}}</html>',
        back: '<html style="margin: 130px; font-size: 50;">Back HTML</html>',
        data: {
            name: 'Harry'
        }
    }, function(err, res) {
        console.log(err, res);
    });
});




module.exports = app;
