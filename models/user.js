'use strict';

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    zip: String,
    endorsing: [{type: Schema.ObjectId, ref:'Contract'}]
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', UserSchema);