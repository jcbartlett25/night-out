var eventful = require('eventful-node');
var client = new eventful.Client('BdCFq6HP79LPJq8B');

function Event(title, desc, img, url, date, venue) {

    this.id = id;
    this.title = title;
    this.description = desc;
    this.img = img;
    this.url = url;
    this.date = date;
    this.venue = venue;
}

function search(where, callback) {

    client.searchEvents({page_size: 100, location: where}, function(err, data){

        if(err){
            console.log(err);
            return null;
        }

        console.log('Recieved ' + data.search.total_items + ' events');
        console.log('Event listings: ');
          
        //print the title of each event 
        for(var i in data.search.events.event){
          
            console.log(data.search.events.event[i].title);
          
        }
    });
}
module.exports = Event;