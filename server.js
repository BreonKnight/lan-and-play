/*
	Server-side Javascript
*/
var db = require('./models');

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

//including middlware
app.use(bodyParser.urlencoded({ extended: true}));

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
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

//servering static files from public folder directory
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//getting user
app.get('/', function (req, res) {
  res.render('index', { user: req.user });
});

//JSON API inputs
app.get('/api', function apiIndex(req, res) {
	res.json({
		message: 'Welcome to Lan And Plays API :) !',
		documentationUrl: 'https://github.com/breonknight/lan-and-play',
		baseUrl: 'http://lan-and-play.com',
		endpoints: [
			{method: 'GET', path: '/api', description: 'Describes avaliable endpoints'}
		]
	});
});
/*
		Routes for Lan And Play
*/

/*
Routes for Events
*/
app.get('/api/events', function eventsIndex(req, res) {
	console.log(db.Event);
	db.Event.find({}, function (err, events) {
		res.json(events);
	});
});

app.post('/api/events', function createEvent(req, res) {
	//get all games seperated by commas and remove the commas
	// var games = req.body.games.split(',').map(function (item) { return item.trim(); });
	// req.body.games = games;
	var newEvent =  new db.Event(req.body);
	newEvent.save(function (err, savedEvent) {
		if (err) {
			res.status(500).json({error : err.message});
		} else {
			req.user.events.push(savedEvent);
			req.user.save(function(err){
        // http://mongoosejs.com/docs/api.html#model_Model-save
        // Saving is asynchronous! We need to wait for confirmation before responding.
        if (err) {
          res.status(500).json({error : err.message});
        } else {
          res.json(savedEvent);
        }
      });
		}
	});
});


//Editing Event by ID
app.put('/api/events/:id', function editEvent(req, res) {
	//requesting the id within my html
	var eventId = req.params.id;

  // http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
	db.Event.findByIdAndUpdate(req.params.id, req.body, function (err, updatedEvent) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(updatedEvent);
		});
	});
});

//Adding new Game to Event based off of the event ID
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

	db.Event.findOneAndRemove({_id: req.params.id}, function (err) {
		if (err) {return console.log('error in deleting event', err); }
		console.log('Removal of event with the ID =' + req.params.id + 'was successful!');
		res.status(200).send();
	});
});

//Deleting ID by user inside profile page
app.delete('/api/profile/:eventID', function deletePostbyUser(req, res) {
	var profileId = req.params.userId;
	var eventId = req.params.id;
		db.User.findOne({_id: profileId}, function findTheUse(err, user) {
		if (err)	{console.log('my error', err); }

		var foundEvent = user.event.id(eventId);
		foundEvent.remove();

		user.save(function updatingUser(err, savedUser) {
			if (err) {console.log('updating user events err', err); }
			res.json(savedUser);
		});
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
Routes for User Login 
*/

// show signup view
app.get('/signup', function (req, res) {
  // if user is logged in, don't let them see signup view
  if (req.user) {
    res.redirect('/profile');
  } else {
    res.render('signup', { user: req.user });
  }
});

// sign up new user, then log them in
// hashes and salts password, saves new user to db
app.post('/signup', function (req, res) {
  // if user is logged in, don't let them sign up again
  if (req.user) {
    res.redirect('/profile');
  } else {
    db.User.register(new User({ username: req.body.username }), req.body.password,
      function (err, newUser) {
        passport.authenticate('local')(req, res, function () {
          res.redirect('/profile');
        });
      }
    );
  }
});

// show login view
app.get('/login', function (req, res) {
  // if user is logged in, don't let them see login view
  if (req.user) {
    res.redirect('/profile');
  } else {
    res.render('login', { user: req.user });
  }
});

// log in user
app.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/profile');
});

// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// show user profile page
app.get('/profile', function (req, res) {
  // only show profile if user is logged in
  if (req.user) {
    res.render('profile', { user: req.user });
  } else {
    res.redirect('/login');
  }
});

//localhost
app.listen(process.env.PORT || 3000, function () {
	console.log("You are currently running your server on http://localhost:3000/");
});