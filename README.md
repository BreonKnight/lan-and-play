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

Challenges
==
I ran into a couple of walls during this project and it was mostly because of how I had my entire application dependent upon having a user based system to create data. Looking at alot of examples helped me alot instead of struggling through this project blind. Passport was the answer to what I needed partically because it offered safe password storage.

Code snippit im really proud of in this project is

        {{#if user}}
        <!-- new event form-->
          <h1 class="text-center h1isWhite cvent">Create An Event</h1>

            <form class="form-group formWrap" id="create-event">
              <div class="form-group">
                <input type="text" name="title" class="form-control" placeholder="Title" autofocus>
              </div>
              <div class="form-group">
                <input type="text" name="description" class="form-control" placeholder="Description">
              </div>
              <div class="form-group">
                <input type="text" name="date" class="form-control" placeholder="Date: mon/day/year" autofocus>
              </div>
              <div class="form-group">
                <input type="text" name="time" class="form-control" placeholder="Time: example 10:00 pm" autofocus>
              </div>
              <div class="form-group">
                <input type="text" name="location" class="form-control" placeholder="location" autofocus>
              </div>
              <div class="form-group">
                <input type="text" name="picture" class="form-control" placeholder="insert pic URL" autofocus>
              </div>
              <div class="form-group">
                <input type="submit" class="btn btn-default" value="Add event">
              </div>
            </form>
          <br>

Basically I used handlebars to toggle the form to be viewed only when the user was logged in. It was so simple but I was SUPPPPER pumped about this! I'm so excited to learn more


