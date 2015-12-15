// wait for DOM to load before running JS
$(function() {

  // base API route
  var baseUrl = '/api/events';

  // array to hold event data from API
  var allEvents = [];

  // element to display list of events
  var $eventsList = $('#events-list');

  // form to create new event
  var $createEvent = $('#create-event');

  // compile handlebars template
  var source = $('#events-template').html();
  var template = Handlebars.compile(source);

  // helper function to render all events to view
  // note: we empty and re-render the collection each time our event data changes
  var render = function() {
    // empty existing events from view
    $eventsList.empty();

    // pass `allEvents` into the template function
    var eventsHtml = template({ events: allEvents });

    // append html to the view
    $eventsList.append(eventsHtml);
  };

  // GET all events on page load
  $.get(baseUrl, function (data) {
    console.log(data);

    // set `allEvents` to event data from API
    allEvents = data.events;

    // render all events to view
    render();
  });

  // listen for submit even on form
  $createEvent.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    var newevent = $(this).serialize();

    // event request to create new event
    $.event(baseUrl, newevent, function (data) {
      console.log(data);

      // add new event to `allEvents`
      allEvents.push(data);

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
        url: baseUrl + '/' + eventId,
        data: updatedevent,
        success: function(data) {
          // replace event to update with newly updated version (data)
          allEvents.splice(allEvents.indexOf(eventToUpdate), 1, data);

          // render all events to view
          render();
        }
      });
    })
    
    // for delete: click event on `.delete-event` button
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
        url: baseUrl + '/' + eventId,
        success: function(data) {
          // remove deleted event from all events
          allEvents.splice(allEvents.indexOf(eventToDelete), 1);

          // render all events to view
          render();
        }
      });
    });

});