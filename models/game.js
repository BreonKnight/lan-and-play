var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GameSchema = new Schema({
	title: String,
	console: String,
	maxPlayers: String,
	Picture: String,
	link: String
});

var Game = mongoose.model('Game', GameSchema);
module.exports = Game;