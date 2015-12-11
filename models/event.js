var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Game = require('/game');

var EventSchema = new Schema({
		title: String,
		description: String,
		data: Date,
		fourtwenty: Boolean,
		booze: Boolean,
		food: Boolean,
		games: [games],
		location: String
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;