'use strict';

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    zip: String,
    state: String,
    endorsing: [{type: Schema.ObjectId, ref:'Candidate'}]
});

// UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);