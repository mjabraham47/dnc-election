'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    email: String,
    first_name: String,
    last_name: String,
    gender: String,
    age: String,
    zip: String,
    state: String,
    abroad: Boolean,
    endorsing: {type: Schema.ObjectId, ref:'Candidate'}
});


module.exports = mongoose.model('User', UserSchema);