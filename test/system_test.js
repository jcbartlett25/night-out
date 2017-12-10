var assert = require('assert');
var superagent = require('superagent');
var server = require('../server');

describe('/search', function() {
  var app;

  before(function() {
    app = server.server(8080);
  });

  after(function() {
    app.close();
  });

  it('should start the server and retrieve results basic results', function(done) {

    superagent.get('http://localhost:8080/search?where=nyc').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      done();
    });
  });
});

describe('/searchByType', function() {
  var app;

  before(function() {
    app = server.server(8080);
  });

  after(function() {
    app.close();
  });

  it('should start the server and retrieve results only about music', function(done) {

    superagent.get('http://localhost:8080/searchByType?where=nyc&type=music').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      done();
    });
  });
});

describe('/searchByDate', function() {
  var app;

  before(function() {
    app = server.server(8080);
  });

  after(function() {
    app.close();
  });

  it('should start the server and retrieve results from today', function(done) {

    superagent.get('http://localhost:8080/searchByDate?where=nyc&time=today').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      ev = events[0];
      today = new Date();
      evDate = new Date(ev.date);
      assert.equal(today.date, evDate.date);
      done();
    });
  });
});

describe('/get', function() {
  var app;

  before(function() {
    app = server.server(8080);
  });

  after(function() {
    app.close();
  });

  it('should start the server and retrieve all information about a single event', function(done) {

    superagent.get('http://localhost:8080/get?id=E0-001-107549225-2').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      done();
    });
  });
});

describe('/myFriends', function() {
  var app;

  before(function() {
    app = server.server(8080);
  });

  after(function() {
    app.close();
  });

  it('should start the server and retrieve a users friend list', function(done) {

    superagent.get('http://localhost:8080/myFriends?id=34253255').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      done();
    });
  });
});

describe('/eventsAttending', function() {
  var app;

  before(function() {
    app = server.server(8080);
  });

  after(function() {
    app.close();
  });

  it('should start the server and retrieve a users list of events attending', function(done) {

    superagent.get('http://localhost:8080/eventsAttending?id=34253255').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      done();
    });
  });
});

describe('/attendEvent', function() {
  var app;

  before(function() {
    app = server.server(8080);
  });

  after(function() {
    app.close();
  });

  it('should start the server and tell us this user is already attending this event', function(done) {

    superagent.get('http://localhost:8080/attendEvent?userID=34253255&eventID=E0-001-107549225-2').end(function(err, res) {
      assert.ifError(err);
      assert.equal(res.status, status.OK);
      assert.equal(res.body, 'You are already attending this event!');
      done();
    });
  });
});