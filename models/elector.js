'use strict';

var mongoose = require('mongoose');

var ElectorSchema = new mongoose.Schema({
	name: String,
	membership: String,
	personal_email: String,
	title: String,
	phone: String,
	under_37_group: {type: Boolean, default: false },
	over_64_group: {type: Boolean, default: false },
	female_group: {type: Boolean, default: false },
	abroad_group: {type: Boolean, default: false },
	state: String
});

module.exports = mongoose.model('Elector', ElectorSchema);