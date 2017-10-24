var express = require('express');
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var path = require('path');

var port = process.env.PORT || 8080;

// Creating static path
var __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Setting up the routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
});

// Hard coded the port for simplicity at the moment
http.listen(port, function(){
    console.log('listening on *:'+port);
});