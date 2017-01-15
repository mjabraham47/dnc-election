'use strict';

var express = require('express');
var app = express();
var Candidate = require('../models/candidate');
var User = require('../models/user')

app.get('/', function(req, res) {
    Candidate.find(function(err, candidates) {
        if (err) {
            console.log(err);
        } else {
            res.send(candidates);
        }
    });
});

// app.post('/endorse', function(req, res) {
//     var candidate_id = req.body.candidate_id;
//     var user_id = req.body.user_id;
//     Candidate.findByIdAndUpdate({_id : candidate_id}, {$inc: { fieldToIncrement: 1 }}, function(err, candidate) {
//         if (err) { 
//             console.log(err);
//         } else {
//             User.findByIdAndUpdate({_id : user_id}, {$set: {endorsing : candidate_id}}, function(err, user) {
//                 if (err) {
//                     console.log(err)
//                 }
//                 else {
//                     candidate.save();
//                     user.save();
//                 }
//             })
//         }
//     });
// });

module.exports = app;