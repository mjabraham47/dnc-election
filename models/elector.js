'use strict';

var mongoose = require('mongoose');

var ElectorSchema = new mongoose.Schema({
	name: String,
	personal_email: String,
	phone: String,
	state: String
});

module.exports = mongoose.model('Elector', ElectorSchema);