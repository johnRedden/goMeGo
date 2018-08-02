//geolocation

$(document).ready(function(){
    
    //HTML5 Geolocation ( https://www.w3schools.com/html/html5_geolocation.asp )
    //position.coords.heading does not seem to work... try this
    
/* Heading Stuff not working correctly... will delete
    //heading watching here currently not being used
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, true)
    }

    function deviceOrientationHandler(event) {

        if (event.webkitCompassHeading) {//mobile safari
            heading = event.webkitCompassHeading;
        } else {
            if (!event.alpha) 
                heading = 0;
            else
                heading = event.alpha*-1;
        }
        
       $("#info").html(heading);
       if(user){
           //set icon rotation in real time with heading
		   // Variables
		   var	dbgHeadingCorrection=	$("#dbg_heading").val();
		   
			if(dbgHeadingCorrection== "")
				dbgHeadingCorrection=	0;
			else
				dbgHeadingCorrection=	Number(dbgHeadingCorrection);
		   
           userMarkers[user.id].icon.rotation = (heading-dbgHeadingCorrection)%360;
           userMarkers[user.id].setIcon(userMarkers[user.id].icon);
       }
        
    }
*/
});


/* Position Watching Options here (choices to be made here) *************************   
https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions
*/
posOptions = {
  enableHighAccuracy: true, //less battery usage if false (default false)
  timeout: 5000,  //must return within 5 seconds (defalault 'Infinity' won't return until location avail)
  maximumAge: 0  //0 means do not use cached position
};
function startGPS() { //coming in from main.js only once with roomHash (room name) set
    if(navigator.geolocation)	{ 
        
        // This should generate a random color but with darkish tones to contrast the white, green, blue, and tan colors of the google map
        /*userColor=  localStorage.getItem("color") || (function()    {
            var _userColor= gucolor();
            localStorage.setItem("color", _userColor);
            return _userColor;
        })();*/
        uuid=	localStorage.getItem("uuid") || (function()	{
            var	_uuid=	guuid();
            localStorage.setItem("uuid", _uuid);
            return _uuid;
        })();  //Global unique user id (uuid) now set and in local storage
        
        //The get call generates user prompt for location here.
		navigator.geolocation.getCurrentPosition(setPos,showError); //uses default options
        navigator.geolocation.watchPosition(updatePos,errorPos,posOptions);
        
        console.log("App Enabled - uuid set");
        
	}
	else	{
		alert("App Disabled. Please activate your location to use.");
		return;
    }
}
function errorPos(err){ console.log(err) }
function updatePos(args)	{

    // null on pc ... so need to test on phone.
    console.log(args.coords.heading)
    $("#testHeading").html(args.coords.heading);

    //TODO: trace this calculation... if no location change do not update database
    if(
		Math.floor(100005*user.lat)== Math.floor(100005*args.coords.latitude) &&
		Math.floor(100005*user.lon)== Math.floor(100005*args.coords.longitude)
	)	{
        return;
    }

    user.lat=	args.coords.latitude;
    user.lon=	args.coords.longitude;
    user.timestamp=	args.timestamp;
    //user.color= userColor;

    //next call should fire child_changed event
    saveUserToDatabase();

}
function showError(error) {
    //TODO: alert user of the problem
    //TODO: allow user to easily change location sharing options
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log( "The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log( "An unknown error occurred.");
            break;
    }
}

function setPos(args){  // occurs once uuid set

    user=	{  //user global populated for first time here
        id:	uuid,
        //color:  userColor,
        lat:	args.coords.latitude,
        lon:	args.coords.longitude,
        timestamp:	args.timestamp
    };
    
    startupMap(user);  //in googleMaps.js
 
    // DATABASE Listeners these callbacks are in dbCalls.js
    roomRef=	database.ref("rooms/"+roomHash+"/users");
    roomRef.on("child_added", onChildAdded);  //generates an update map call
    roomRef.on("child_changed", onChildChanged);
    roomRef.on("child_removed", onChildRemoved);
    
    //Next call should fire child_added event
    saveUserToDatabase();
      
}

//hit the database
function saveUserToDatabase(){
    
    $("#settings").css("background-color","LightYellow");
    $("#statusMsg").html("Updating");
    $("#settingsIcon").addClass("fa-spin");

    //using global user object (will fire child_added or child_changed event)
    roomRef.child(user.id).set(user,function(error) {
        if (error) {
          // The write failed...
          console.log(error);
          $("#settings").css("background-color", "tomato");
          $("#statusMsg").html("Uh-oh!");
          $("#settingsIcon").removeClass("fa-spin");
        } else {
            // Data saved successfully!
            console.log('database save successful');
            $("#settings").css("background-color","LightGreen");
            $("#statusMsg").html("Settings");
            $("#settingsIcon").removeClass("fa-spin");
            //
        }
      }); 
}

// Generate unique user id
function guuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4()+s4()+s4()+s4();// + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
