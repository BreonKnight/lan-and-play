var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Game = require('./game');

var EventSchema = new Schema({
		title: String,
		description: String,
		date: String,
		games: [Game.schema],
		time: String,
		location: String
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;