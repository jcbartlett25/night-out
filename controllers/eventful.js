var exports = module.exports = {};
var eventful = require('eventful-node');
var client = new eventful.Client('BdCFq6HP79LPJq8B');
var xml = require('xml2js');
var request = require('request');

// Event class
var Event = function(id, title, desc, img, url, date, venue) {

    this.id = id;
    this.title = title;
    this.description = desc;
    this.img = img;
    this.url = url;
    this.date = date;
    this.venue = venue;
};  

exports.searchByType = function(where, type, callback) {

    client.searchEvents({page_size: 35, location: where, category: type}, function(err, data){

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

// Removes the duplicate events from the event list
// this file was changed and contributed to the demo
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
};

// Searches eventful for 35 random events 
exports.search = function(where, callback) {

    client.searchEvents({page_size: 35, location: where, date: 'today'}, function(err, data){

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
};

exports.get = function(id, callback) {

    api = 'https://api.eventful.com/rest/events/get?app_key=BdCFq6HP79LPJq8B&id=' + id;
    request(api, function(error, response, body){
        xml.parseString(body, function (err, result) {
            var temp = result;

            if (temp.event) {

                var title = temp.event.title[0];
                var desc = temp.event.description[0];
                var img = temp.event.images.image;
                var date = temp.event.start_time[0];
                var venue = temp.event.venue_name[0];
                var url = temp.event.url[0];

                callback(new Event(id, title, desc, img, url, date, venue));
            }
            else {
                callback(null, true);
            }
        });
    });
};

exports.Event = Event;
exports.removeDuplicates = removeDuplicates;
