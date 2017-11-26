var feed;
var body = document.getElementsByTagName("BODY")[0];

//get events using Ajax API call to Josh's code
function getEvents(){
  var result = [1,2,3];
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
//create view object for event feed
function renderFeed(ev){
  feed = new Vue({
    el: '#event-feed',
    data: {
      events: ev
    }
  });
}
getEvents();


//given an event id, display a popup modal with relevant details
function showEvent(eventIdTag) {
  var popup_modal = document.getElementsByClassName("event-popup")[0];
  popup_modal.style.display = "block";
  window.onclick = function(event) {
    if (event.target == popup_modal) {
        popup_modal.style.display = "none";
    }
  }

  id = eventIdTag.split('-')[2];
  details = getEventDetails(id);
  alert(eventIdTag);
  renderEventPage(details);
}

//given an event id, return appropriate details for the event
function getEventDetails(eventId){
  //TODO
}

function renderEventPage(eventDetails){
  //TODO
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
}