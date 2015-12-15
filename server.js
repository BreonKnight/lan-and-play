/*
	Server-side Javascript
*/

var db = require('./models');
var User = require('./models/user');
var express = require('express'),
	app = express(),

//including body parser
	bodyParser = require('body-parser'),
//including mongoose
	mongoose = require('mongoose'),
	hbs = require('hbs'),
//including Login Dependencies 
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

/*
	Middleware
*/

// middleware for authorizing logins
app.use(cookieParser());
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//including middlware
app.use(bodyParser.urlencoded({ extended: true}));

//servering static files from public folder directory 
app.use(express.static(__dirname + '/public'));

//Getting Homepage in views folder
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//JSON API inputs
app.get('/api', function api_index(req, res) {
	res.json({
		message: 'Welcome to Lan And Plays API :) !',
		documentationUrl: 'https://github.com/breonknight/lan-and-play',
		baseUrl: 'http://lan-and-play.com',
		endpoints: [
			{method: 'GET', path: '/api', description: 'Describes avaliable endpoints'}
		]
	});
});
//routes
/*

Routes for Events

*/
app.get('/api/events', function eventsIndex(req, res) {
	db.Event.find({}, function (err, events) {
		res.json(events);
	});
});

app.post('api/events', function createEvent(req, res) {
	console.log('this event', req.body);

	//get all games seperated by commas and remove the commas
	var games = req.body.games.split(',').map(function (item) { return item.trim(); });
	req.body.games = games;

	db.Event.create(req.body, function creatingEvent(err, eventz) {
		if (err) {console.log('creating event error', err); }
		console.log(eventz);
		res.json(eventz);
	});
});

app.get('/api/events/:id', function eventShow(req, res) {
	console.log('this albums id is =', req.params.id);
	db.Event.findOne({_id: req.params.id}, function getEventId(err, eventz) {
		res.json(eventz);
	});
});

//Adding new Game to Event
app.post('/api/events/:eventId/games', function gamesCreate(req, res) {
	console.log('req this', req.body);
	db.Event.findOne({_id: req.params.eventId}, function createEventGame(err, eventz) {
		if (err) { console.log('error in game', err); }

		var game = new db.Game(req.body);
		eventz.game.push(game);
		eventz.save(function (err, savedEvent) {
			if (err) {console.log('error in saving game: ', err); }
			console.log(savedEvent, 'Event has a new game');
			res.json(game);
		});
	});
});

//deleting an Event

app.delete('/api/events/:id', function deleteEvent(req, res) {
	console.log('Requested event for deletion is ' + req.params.id);
	db.Event.remove({_id: req.params.id}, function (err) {
		if (err) {return console.log('error in deleting event', err); }
		console.log('Removal of event with the ID =' + req.params.id + 'was successful!');
		res.status(200).send();
	});
});

/*

Routes for Games

*/
app.get('/api/games', function gamesIndex(req, res) {
	db.Game.find({}, function (err, games) {
		res.json(games);
	});
});

app.post('/api/games', function createGames(req, res) {
	db.Game.create(req.body, function gameCreate(err, games) {
		if (err) {console.log('This game was not created', err); }
		console.log(games);
		res.json(games);
	});
});

/*
Routes for User
*/


/*
Routes for User Login 
*/

app.get('/signup', function (req, res) {
  res.render('signup');
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db

app.post('/signup', function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        // res.send('signed up!!!');
        res.redirect('/profile')
      });
    }
  );
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  // res.send('logged in!!!');
  res.redirect('/profile')
});

//how to logout
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


//localhost
app.listen(process.env.PORT || 3000, function () {
	console.log("You are currently running your server on http://localhost:3000/");
});