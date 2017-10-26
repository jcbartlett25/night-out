var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var path = require('path');
var eventful = require('eventful-node');
var client = new eventful.Client('BdCFq6HP79LPJq8B');

var port = process.env.PORT || 8080;

function Event(id, title, desc, img, url, date, venue) {

    this.id = id;
    this.title = title;
    this.description = desc;
    this.img = img;
    this.url = url;
    this.date = date;
    this.venue = venue;
}

// Creating static path
var __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Setting up the routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/search', function(req, res){

    client.searchEvents({page_size: 35, location: 'New York'}, function(err, data){

        if(err){
            console.log(err);
            return null;
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

        res.send(events);
    });
});

// Hard coded the port for simplicity at the moment
http.listen(port, function(){
    console.log('listening on *:'+port);
});