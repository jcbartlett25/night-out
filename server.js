var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var eventful = require('./controllers/eventful');
var mysql = require('mysql');
var db = mysql.createConnection({
  host     : '35.196.187.235',
  user     : 'root',
  password : 'night',
  database : 'first-release'
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

var port = process.env.PORT || 8080;

// Creating static path
var __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Homepage
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
});
// Homepage
app.get('/my-events', function(req, res){
    res.sendFile(__dirname + '/public/views/my-events.html');
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

app.get('/searchByType', function(req, res){
    if (!req.query.where || !req.query.type) {
        res.send('Check your query...');
    }
    else{
        eventful.searchByType(req.query.where, req.query.type, function(events){
            res.send(events);
        });
    }
});

app.get('/searchByDate', function(req, res){
    if (!req.query.where || !req.query.time) {
        res.send('Check your query...');
    }
    else{
        eventful.searchByDate(req.query.where, req.query.time, function(events){
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
                db.query('INSERT INTO Events(id, title) VALUES ("'+details.id+'", "'+details.title+'")', function(err, rows, fields){
                   
                    //db.query('SELECT * FROM Attendance WHERE userID = "'+req.query.userID'" AND eventID = "+eventID+"');
                    res.send(details);
                });
            }
        });
    }
});

app.get('/attendEvent', function(req, res){

    if (!req.query.eventID && !req.query.userID && !req.query.userID) {
        res.send('Needs eventID AND userID AND title');
    }
    else{
        db.query('INSERT INTO Attendance(userID, eventID, title) VALUES ("'+req.query.userID+'", "'+req.query.eventID+'", "'+req.query.title+'");', function(err, rows, fields){
            if (err){
                if (err.errno == 1062)
                    res.send('You are already attending this event!');
                else
                    res.send('Error in marking you for this event, try again...')
            }
            else{
                res.send('Congrats! You are now attending this event!');
            }
        });
    }
});

app.get('/eventsAttending', function(req, res){
    if (!req.query.id) {
        res.send('Need a userID...');
    }
    else{
        db.query('SELECT * FROM Attendance WHERE userID = "'+req.query.id+'"', function(err, rows, fields){
            res.send(rows);
        });
    }
});

app.get('/myFriends', function(req, res){
    if (!req.query.id) {
        res.send('Need a userID...');
    }
    else{
        db.query('SELECT * FROM Friends WHERE userID = "'+req.query.id+'"', function(err, rows, fields){
            res.send(rows);
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