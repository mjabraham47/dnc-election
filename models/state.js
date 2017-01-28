'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StateSchema = new mongoose.Schema({
	State: String,
	Name: String,
	Line1: String,
	Line2: String,
	Line3: String,
	Website: String,
	Email: String,
	Phone: String
});

module.exports = mongoose.model('State', StateSchema);