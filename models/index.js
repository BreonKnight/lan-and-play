var mongoose = require("mongoose");
	mongoose.connect( process.env.MONGOLAB_URI ||
					  process.env.MONGOHQ_URL || 
					   "mongodb://localhost/lanandplaytest");
var Event = require('./event');
var Game = require('./game');
var User = require('./user');

module.exports.Event = Event;
module.exports.Game = Game;
module.exports.User = User;