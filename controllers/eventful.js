var exports = module.exports = {};
var eventful = require('eventful-node');
var client = new eventful.Client('BdCFq6HP79LPJq8B');

// Event class
var Event = function(id, title, desc, img, url, date, venue) {

    this.id = id;
    this.title = title;
    this.description = desc;
    this.img = img;
    this.url = url;
    this.date = date;
    this.venue = venue;
}

// Removes the duplicate events from the event list
var removeDuplicates = function(events) {

    var seen = new Set();
    var new_events = [];

    for(var i in events) {
        current_event = events[i];

        // Only add unique titles
        if (!seen.has(current_event.title)) {
            seen.add(current_event.title);
            new_events.push(current_event);
        }
    }

    return new_events;
}

// Searches eventful for 35 random events 
exports.search = function(where, callback) {

    client.searchEvents({page_size: 35, location: where}, function(err, data){

        if(err){
            console.log(err);
            callback(null);
        }

        events = [];

        console.log('Recieved ' + data.search.total_items + ' events');
          
        //print the title of each event 
        for(var i in data.search.events.event){

            var current_event = data.search.events.event[i];
            var id = current_event.$.id;
            var title = current_event.title;
            var desc = current_event.description;
            var img = current_event.image.url;
            var date = current_event.start_time;
            var venue = current_event.venue_name;
            var url = current_event.url;

            events.push(new Event(id, title, desc, img, url, date, venue));         
        }

        callback(removeDuplicates(events));
    });
}

exports.Event = Event;
exports.removeDuplicates = removeDuplicates;