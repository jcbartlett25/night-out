var feed;

function getEvents(){
  var result = [1,2,3];
  $('#event-feed').hide();

  $.ajax({
    url: '/search',
    data: {},
    success: function(response){
      $('#event-feed').show();
       render(response);
      },
   });
}

function render(ev){
  feed = new Vue({
    el: '#event-feed',
    data: {
      events: ev
    }
  });
}

getEvents();

// Get the modal
var modal = document.getElementById('event-Modal');

// Get the button that opens the modal
var btn = document.getElementById("button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
