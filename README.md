# Lan and Play
____________________________

![image](http://www.jaynekitsch.co.uk/wp-content/uploads/2015/07/tumblr_m5j41mJjph1rynh0bo1_400.gif)
_____________________________________________________
Purpose
--
___
This project is my first fullstack application and I created it out of my love for the sense of community I got out of lan partys early on as teenager. I felt the need to bring a sense of community together with further iterations of this web app. Wether it's playing mario kart 64 or counterstrike with a group of friends I created this for all gamers to find the event closest to them. If there is not an event close, no problem! Register and start creating your own events in your area.
_______________________________________________________

Languages / Libraries Used
==

Sever Side  |Front End    |Templating |Middleware
------------|-------------|-----------|-----------
Node.js     |Bootstrap    |Handlebars |Passport
Express     |Font Awesome | 		  |Body Parser
Mongoose    |jQuery		  |		      |Cookie Parser
MongoDB	    |Javascript	  |		      |

_____

Landing page
==
![image](http://i.imgur.com/hmEGkFX.png?1)

_____
This is how events are published
==
![image](http://i.imgur.com/Mh1pPuA.png?1)

___
Model Data
==
Model  | Datatype| name| usage
------------|-------------|-----------|-----------
Event     |String|title |Events title
Event     |String| description		   |Events description
Event    |String|	date	   |Events Date
Event	    |String	   |	time	   | The Events Time
Event     |String|location |Events Location
Event     |String| picture		   |Events Picture
Game    |String|	title	   |Games title
Game	    |String	   |	console	   | The console the Game is on
User    |String|	userName	   |Get the username
User	    |Array	   |	events	   | an array of Events the user created
User	    |Array	   |	games	   | an array of Games the user created


_____
You only are able to create events upon registration. So make sure you register!

Restful Routes
==

HTTP Verb |Path                      |Description
----------|--------------------------|-------------
GET       |/api/events               |Gets all events.
POST      |/api/events               |Allows User to Post Events.
PUT       |/api/events/:id           |Allows User to Edit Events.
POST      |/api/events/:eventId/games|Allows User to create an Event based off the Game ID.
DELETE    |/api/events/:id           |Allows for deletion of Event.
DELETE    |/api/profile/:eventID     |Allows User to Delete Event within their profile page.
GET       |/api/games                |Gets all Games.
POST      |/api/games                |Allows User to create a new Game.
GET       |/signup                   |Shows sign up view.
POST      |/signup                   |Allows User to register and hashes ands salts pw with the help of passport.
GET       |/login                    |Shows the login view.
POST      |/login                    |Allows User to login into their account.
GET       |/logout                   |Allows User to logout their account.
GET       |/profile                  |Allows User to go to thier profile page.


