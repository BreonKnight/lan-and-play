//Severside Javascript

//including express
var express = require('express');
var app = express();

//including body parser
var bodyParser = require('body-parser');


//including mongoose
var mongoose = require('mongoose');
var db = require('./models');

//including middlware
app.use(bodyParser.urlencoded({ extended: true}));

//servering static files from public folder directory 
app.use(express.static(__dirname + '/public'));

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//data samples.


//JSON API inputs
app.get('/api', function api_index(req, res) {
	res.json({
		message: "Welcome to Lan And Plays API :) !",
		documentation_url: "https://github.com/breonknight/lan-and-play",
		base_url: "http://lan-and-play.com",
		endpoints: [
			{method: "GET", path: "/api", description: "Describes avaliable endpoints"}
		]
	});
});

//routes











//localhost



app.listen(process.env.PORT || 3000, function () {
	console.log("You are currently running your server on http://localhost:3000/");
})

