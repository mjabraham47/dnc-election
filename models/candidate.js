'use strict';

var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
	name: String,
	description: String,
	endorsements: {type: Number, default: 0}
});

module.exports = mongoose.model('Candidate', CandidateSchema);