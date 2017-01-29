'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StateSchema = new mongoose.Schema({
	state: String,
	name: String,
	street_address: String,
	city: String,
	zip: Number,
	website: String,
	email: String,
	phone: String
});

module.exports = mongoose.model('State', StateSchema);