'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostcardSchema = new mongoose.Schema({
	user: [{type: Schema.ObjectId, ref:'User'}],
	message: String,
	elector: [{type: Schema.ObjectId, ref:'Elector'}]
});

module.exports = mongoose.model('Postcard', PostcardSchema);