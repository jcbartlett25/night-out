//get events using Ajax API call to Josh's code
function getMyEvents(){//TODO
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
    feed_vue = new Vue({
      el: '#event-feed', 
      data: {
        events: ev
      }
    });
  }
  
getMyEvents();