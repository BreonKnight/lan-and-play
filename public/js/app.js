
$(function() {


  var apiUrl = '/api/events';

  // array to hold events
  var allEvents = [];

  // element to display list of events
  var $eventsList = $('#events-list');

  // form to create new event
  var $createEvent = $('#create-event');

  // compile handlebars template
  var source = $('#events-template').html();
  var template = Handlebars.compile(source);

  var render = function() {

    $eventsList.empty();

    // pass all the events into the template function
    var eventsHtml = template({ events: allEvents });

    // prepend html to the view
    $eventsList.prepend(eventsHtml);
  };

  // GET all events on page load
  $.get(apiUrl, function (data) {
    console.log(data);

    // set `allEvents` to event data from API
    allEvents = data;

    // render all events to view
    render();
  });

  // listen for submit even on form
  $createEvent.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    var newevent = $(this).serialize();
    console.log("This is the new event", newevent);

    // event request to create new event
    $.post(apiUrl, newevent, function (data) {
      console.log(data);

      // add new event to `allEvents`
      allEvents.push({data});

      // render all events to view
      render();
    });

    // reset the form
    $createEvent[0].reset();
    $createEvent.find('input').first().focus();
  });

  // add event-handlers to events for updating/deleting
  $eventsList

    // for update: submit event on `.update-event` form
    .on('submit', '.update-event', function (event) {
      event.preventDefault();
      
      // find the event's id (stored in HTML as `data-id`)
      var eventId = $(this).closest('.event').attr('data-id');

      // find the event to update by its id
      var eventToUpdate = allEvents.filter(function (event) {
        return event._id == eventId;
      })[0];

      // serialze form data
      var updatedevent = $(this).serialize();

      // PUT request to update event
      $.ajax({
        type: 'PUT',
        url: apiUrl + '/' + eventId,
        data: updatedevent,
        success: function(data) {
          // replace event to update with newly updated version (data)
          allEvents.splice(allEvents.indexOf(eventToUpdate), 1, data);

          // render all events to view
          render();
        }
      });
    })
    
    .on('click', '.delete-event', function (event) {
      event.preventDefault();

      // find the event's id (stored in HTML as `data-id`)
      var eventId = $(this).closest('.event').attr('data-id');

      // find the event to delete by its id
      var eventToDelete = allEvents.filter(function (event) {
        return event._id == eventId;
      })[0];

      // DELETE request to delete event
      $.ajax({
        type: 'DELETE',
        url: apiUrl + '/' + eventId,
        success: function(data) {
          // remove deleted event from all events
          allEvents.splice(allEvents.indexOf(eventToDelete), 1);

          // render all events to view
          render();
        }
      });
    });

});