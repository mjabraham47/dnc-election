'use strict';

var mongoose = require('mongoose');

var ElectorSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String,
	address: String,
	city: String,
	state: String
});

module.exports = mongoose.model('Elector', ElectorSchema);