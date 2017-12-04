// contains functions for handling the view/ creation of events on the main page of the app

var feed;
var body = document.getElementsByTagName("BODY")[0];
var selectedEvent;
var dummyEvent = {title: "Test", venue:"Earth", date:"December 1", description:"gonna be fun!"}


//get events using Ajax API call to Josh's code
function loadEvents(){
  $('#event-feed').hide();

  $.ajax({
    url: '/search',
    data: {
      where: 'New York'
    },
    success: function(response){
      $('#event-feed').show();
       renderFeed(response);
      },
   });
}
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
      console.log(response);
      console.log(selectedEvent);
      get_event_promise = new Promise(function(resolve, reject) {
        // do a thing, possibly async, then…
      
        if (selectedEvent != undefined) {
          resolve("Stuff worked!");
        }
        else {
          reject(Error("It broke"));
        }
      });
      }
   )
   return get_event_promise;
}

function getSelectedEvent(){
  //gets the currently selected event to display
  return selectedEvent;
}

//create view object for event feed
function renderFeed(ev){
  feed_vue = new Vue({
    el: '#event-feed', 
    data: {
      events: ev
    }
  });
}

//create vue object for event modal popup
function renderSelectedEvent(selectedEvent){
  event_vue = new Vue({
    el: '#event-popup',
    data: {
      e: selectedEvent
    }
  });
}

loadEvents();

//Event popup modal
var popup_modal = document.getElementById("event-popup");
var close_event = document.getElementById("close-event");
close_event.onclick = function(){popup_modal.style.display = "none";}
//given an event id, display a popup modal with relevant details
function showEvent(eventIdTag) {
  popup_modal.style.display = "block";
  console.log(eventIdTag);
  var id = eventIdTag.split('~')[2];
  console.log(id);
  var event = getEventById(id);
  event.then(function(result) {
    thisEvent = getSelectedEvent();
    console.log("this event: ");
    console.log(thisEvent);
    renderSelectedEvent(thisEvent);
  }, function(err) {
    console.log(err); // Error: "It broke"
  });
}

//CREATE-EVENT MODAL
var modal = document.getElementById('event-Modal');
var btn = document.getElementById("button");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }

    function success() {
      alert('Congrats, you have successfully make an event!');
  }  }


// EVENT FILTERING
function openDateFilter(){
  //TODO
}
function openTypeFilter(){
  //TODO
}

//FILTER EVENTS UI
// function myFunction() {
//   document.getElementById("dateDropdown").classList.toggle("show");
// }
// window.onclick = function(event) {
// if (!event.target.matches('.dropbtn')) {
//   var dropdowns = document.getElementsByClassName("dropdown-content");
//   var i;
//   for (i = 0; i < dropdowns.length; i++) {
//     var openDropdown = dropdowns[i];
//     console.log(openDropdown==null);
//     if (openDropdown.classList.contains('show')) {
//       openDropdown.classList.remove('show');
//     }
//   }
// }
// }