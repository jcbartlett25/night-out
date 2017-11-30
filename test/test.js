var assert = require('assert');
var eventful = require('../controllers/eventful');


describe('Eventful', function() {
  describe('#search()', function(done) {
    it('should return 35 events in the specified location', function() {
      eventful.search('New York', function(events) {
        assert.equal(35, events.length);
        done();
      });
    });
    it('should return no events when specified location doesnt exist', function(){

      eventful.search('IssaVibe', function(events) {
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


});
