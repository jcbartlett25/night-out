var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var path = require('path');
var eventful = require('./controllers/eventful');
//var client = new eventful.Client('BdCFq6HP79LPJq8B');

var port = process.env.PORT || 8080;

// Creating static path
var __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Homepage
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
});

// Basic eventful search, returns 35 future events in new york
app.get('/search', function(req, res){

    eventful.search('New York', function(events){ 
        res.send(events);
    });
});

// Hard coded the port for simplicity at the moment
http.listen(port, function(){
    console.log('listening on *:'+port);
});