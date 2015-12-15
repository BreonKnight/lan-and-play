/*

Requirements for Database to run

*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lanandplaytest');

var Event = require('./models/event.js');
var Game = require('./models/game.js');
var User = require('./models/user.js');
var User2 = require('./models/user.js');

var fakeGame1 = {title: 'Super Smash Bros. Melee', console:
'GameCube', maxPlayer: '4'};

var fakeGame2 = {title: 'Mario Kart', console:
'N64', maxPlayer: '4'};

var fakeGame3 = {title: 'Thief', console:
'PC', maxPlayer: '1'};

var fakeEvent1 = {title: "Super Smash Bros. Melee",
description: "For glory", date: new Date(2012, 7, 14),
games: [fakeGame1, fakeGame2, fakeGame3]};

// var fakeUser1 = {userName: 'dannyBoy', password: 'rockstar',
// events: [fakeEvent1], games: [fakeGame3]};

var fakeUser2 = {userName: 'key', password: 'op',
events: [fakeEvent1], games: [fakeGame2]};



// Game.create(fakeGame1, function (err, Game) {
// 	if(err) {console.log(err); }
// 	console.log(Game);
// });

// Game.create(fakeGame2, function (err, Game) {
// 	if(err) {console.log(err); }
// 	console.log(Game);
// });

// Game.create(fakeGame3, function (err, Game) {
// 	if(err) {console.log(err); }
// 	console.log(Game);
// 	process.exit();
// });

// Event.create(fakeEvent1, function (err, Event) {
// 	if(err) {console.log(err); }
// 	console.log(Event);
// 	process.exit();
// });

// User2.create(fakeUser2, function (err, User){
// 	if (err)	{console.log(err); }
// 	console.log(User);

// });

