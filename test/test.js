var assert = require('assert');
var eventful = require('../controllers/eventful');

describe('Array', function() {

  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });

  describe('#indexOf()', function() {
    it('should return the correct index of the value in the array', function() {
        assert.equal(1, [1,2,3].indexOf(2));
    });
  });

});

describe('Eventful', function() {

  describe('#search()', function(done) {
    it('should return 35 events in the specified location', function() {
      eventful.search('New York', function(events) {
        assert.equal(35, events.length);
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
  });

});