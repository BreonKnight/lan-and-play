var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Game = require('./game');
var Event = require('./event');

var UserSchema = new Schema({
	userName: String,
	firstName: String,
	lastName: String,
	events: [Event.schema],
	game: [Game.schema],
	profilePic: String,
	isAttending: Boolean
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;