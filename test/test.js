var assert = require('assert');
var eventful = require('../controllers/eventful');


describe('Eventful', function() {
  describe('#search()', function() {
    
    it('should return at least 30 events in the specified location', function(done) {
      this.timeout(50000);
      eventful.search('New York', function(events) {
        assert.equal(true, (events.length > 30));
        done();
      });
    });
    it('should return no events when specified location doesnt exist', function(done){
      this.timeout(50000);
      eventful.search('IssdfaaVibefdj', function(events) {
        assert.equal(0, events.length);
        done();
      });
    });
  });


  describe('#removeEvents()', function() {
    
    it('should remove all duplicate titles from a list of events', function() {
      var event1 = new eventful.Event(null, "title");
      var event2 = new eventful.Event(null, "other title");
      var event3 = new eventful.Event(null, "title");
      var events = [event1, event2, event3];
      events = eventful.removeDuplicates(events);
      assert.equal(2, events.length);
    });
    it('should remove all duplicate titles from an empty list of events', function() {
      var events = [];
      events = eventful.removeDuplicates(events);
      assert.equal(0, events.length);
    });
    it('should remove all duplicate titles from a list of 1 event', function() {
      var event1 = new eventful.Event(null, "title");
      var events = [event1];
      events = eventful.removeDuplicates(events);
      assert.equal(1, events.length);
    });
  });

  describe('#get()', function(){
    
    it('should get the all of the data for an event with the specified id', function(done){
      this.timeout(50000);
      eventful.get('E0-001-107549225-2', function(details) {
        assert.equal(details.title, 'Robin Trower');
        assert.equal(details.id, 'E0-001-107549225-2');
        done();
      });
    });
    it('should return null on an invalid event id', function(done){
      eventful.get('not-a-real-id', function(details) {
        assert.equal(details, null);
        done();
      });
    });
  });

  describe('#searchByDate()', function(){

    it('should only return events for tomorrow', function(done){
      this.timeout(50000);
      eventful.searchByDate('New York', 'today', function(events) {
        ev = events[0];
        today = new Date();
        evDate = new Date(ev.date);
        assert.equal(today.date, evDate.date);
        done();
      });
    });
  });

  describe('#searchByType()', function(){

    it('should only return relevant results about the type', function(done){
      this.timeout(50000);
      eventful.searchByType('New York', 'Music', function(events) {
        assert.equal(true, (events.length > 20));
        done();
      });
    });
  });
});
