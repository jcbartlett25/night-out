var userID;

window.fbAsyncInit = function() {
  FB.init({
    appId      : '368952293539014',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.10'
  });
    
  FB.AppEvents.logPageView();
  FB.getLoginStatus(function(response) {
      if (response.status == "connected") {
        userID = response.authResponse.userID;
        console.log(response);
        getMyEvents();
      }
  }); 
    
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function getMyEvents(){//TODO
    $.ajax({
      url: '/eventsAttending',
      data: {
        id: userID
      },
      success: function(response){
         renderMyEvents(response);
        },
     });
  }

//create view object for event feed
function renderMyEvents(ev){
    my_events_vue = new Vue({
      el: '#my-events-list', 
      data: {
        events: ev
      }
    });

    console.log(ev);
  }