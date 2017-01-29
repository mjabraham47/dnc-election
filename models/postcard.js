'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostcardSchema = new mongoose.Schema({
	user: [{type: Schema.ObjectId, ref:'User'}],
	message: String,
	state: [{type: Schema.ObjectId, ref:'State'}],
	price: Number,
	from: {
            name: String,
            address_line1: String,
            address_city: String,
            address_state: String,
            address_zip: Number
            },
});

module.exports = mongoose.model('Postcard', PostcardSchema);