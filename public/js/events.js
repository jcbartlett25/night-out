var selectedEvent;
var dummyEvent = {title: "Event", venue:"Earth", date:"December 1", description:"gonna be fun!"}
var event_vue = new Vue({
  
    el: '#event-popup',
    data: {
      e: dummyEvent
    }
  });

function getEventById(id){
    //returns a resolved promise once the requested event has been assigned to selectedEvent
    var get_event_promise = $.ajax({
      url: '/get',
      data: {
        id : id
      }
     }).done(
      function(response){
        selectedEvent = response;
        console.log("selected event", selectedEvent);
        get_event_promise = new Promise(function(resolve, reject) {
           if (selectedEvent != undefined) {
             resolve("Stuff worked!");
           }
           else {
             reject(Error("It broke"));
           }
        });
        }
     );
     return get_event_promise;
}
  
function getSelectedEvent(){
return selectedEvent;
}

//Event popup modal
var popup_modal = document.getElementById("event-popup");
var close_event = document.getElementById("close-event");
function closeEvent(){$('#event-popup').toggle()}
popup_modal.onclick = function() {
      popup_modal.style.display = "none";
} 

//given an event id, display a popup modal with relevant details
function showEvent(eventIdTag) {
    var id = eventIdTag.split('~')[2];
    console.log("id: ", id);
    var event = getEventById(id); //get event promise
    event.then(function(result) {
      thisEvent = getSelectedEvent();
      console.log("this event: ");
      console.log(thisEvent.id);
      renderSelectedEvent(thisEvent);
    }, function(err) {
      console.log(err); // Error: "It broke"
    });
    renderSelectedEvent(selectedEvent);
    $('#event-popup').show();
  }

//create vue object for event modal popup
function renderSelectedEvent(selectedEvent){
    console.log(event_vue.data);
    event_vue.e = selectedEvent;
  }
  