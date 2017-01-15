'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StateSchema = new mongoose.Schema({
	state: String,
	name: String,
	line_1: String,
	line_2: String,
	line_3: String
});

module.exports = mongoose.model('State', StateSchema);