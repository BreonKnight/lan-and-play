//Severside Javascript

//including express
var express = require('express');
var app = express();

//including mongoose
var mongoose = require('mongoose');
var db = require('./models');

//including middlware
app.use(bodyParser.urlencoded({ extended: true}));

//servering static files from public folder directory 
app.use(express.static(__dirname + '/public'));


//data samples.




//routes











//localhost



app.listen(process.env.PORT || 3000, function () {
	console.log("You are currently running your server on http://localhost:3000/");
})

