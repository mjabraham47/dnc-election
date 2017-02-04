'use strict';

var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	bio: String,
	twitter: String,
	website: String,
	photo: String,
	vision: String,
	platform: String,
	facebook: String,
	endorsements: {type: Number, default: 0}
});

module.exports = mongoose.model('Candidate', CandidateSchema);