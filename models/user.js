var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Game = require('./game');
var Event = require('./event');

var UserSchema = new Schema({
	userName: String,
	firstName: String,
	lastName: String,
	event: [event.schema],
	game: [game.schema],
	profilePic: String,
	isAttending: Boolean
});

var User = mongoose.model('User', UserSchema);

model.exports = User;