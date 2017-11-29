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

    if (!req.query.where) {
        res.send('No location provided...');
    }
    else{
        eventful.search(req.query.where, function(events){ 
            res.send(events);
        });
    }   
});

app.get('/get', function(req, res){

    if (!req.query.id) {
        res.send('No id provided...');
    }
    else{
        eventful.get(req.query.id, function(details, err){
            if (err) {
                res.send('Failed...');
            }
            else{
                res.send(details);
            }
        });
    }
});

app.get('/settings', function(req, res) {
    res.sendFile(__dirname + '/public/views/settings.html');
});

// Hard coded the port for simplicity at the moment
http.listen(port, function(){
    console.log('listening on *:'+port);
});