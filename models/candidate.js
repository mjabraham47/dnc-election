'use strict';

var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	twitter: String,
	website: String,
	photo: String,
	short_description: String,
	long_description: String,
	endorsements: {type: Number, default: 0}
});

module.exports = mongoose.model('Candidate', CandidateSchema);