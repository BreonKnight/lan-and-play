/*
Requirements for Database to run
*/
var db = require("./models");

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

// db.Game.create(fakeGame1, function (err, Game) {
// 	if(err) {console.log(err); }
// 	console.log(Game);
// });

// db.Game.create(fakeGame2, function (err, Game) {
// 	if(err) {console.log(err); }
// 	console.log(Game);
// });

// db.Game.create(fakeGame3, function (err, Game) {
// 	if(err) {console.log(err); }
// 	console.log(Game);
// 	process.exit();
// });

// db.Event.create(fakeEvent1, function (err, Event) {
// 	if(err) {console.log(err); }
// 	console.log(Event);
// 	process.exit();
// });

// db.User.create(fakeUser2, function (err, User){
// 	if (err)	{console.log(err); }
// 	console.log(User);

// });
