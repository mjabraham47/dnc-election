'use strict';

var mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Candidate', CandidateSchema);