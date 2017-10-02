//geolocation

$(document).ready(function(){

    //HTML5 Geolocation ( https://www.w3schools.com/html/html5_geolocation.asp )
    //position.coords.heading does not seem to work... try this

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
           userMarkers[user.id].icon.rotation = heading;
           userMarkers[user.id].setIcon(userMarkers[user.id].icon);
       }
        
    }

});

/* Position Watching Options here *************************   */
posOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 500  //update every half second **I think**
};
function startGPS() {
	if(navigator.geolocation)	{
		navigator.geolocation.getCurrentPosition(setPos);
		navigator.geolocation.watchPosition(updatePos,errorPos,posOptions);
		console.log("App Enabled");
	}
	else	{
		alert("App Disabled. Please activate your location to use.");
		return;
    }
}
function errorPos(){}
function updatePos(args)	{
    if(user.lat== args.coords.latitude && user.lon== args.coords.longitude)
        return;
    user.lat=	args.coords.latitude;
    user.lon=	args.coords.longitude;
    user.timestamp=	args.timestamp;
    updateIconPosForUser(user);
}

function setPos(args)	{

    uuid=	localStorage.getItem("uuid") || (function()	{
        // Variables
        var	_uuid=	guuid();
        localStorage.setItem("uuid", _uuid);
        return _uuid;
    })();

    user=	{
        id:	uuid,
        lat:	args.coords.latitude,
        lon:	args.coords.longitude,
        timestamp:	args.timestamp
    };
    
    startupMap(user);  //in googleMaps.js
 
    // DATABASE Listeners these callbacks are in dbCalls.js
    roomRef=	database.ref("rooms/"+roomHash+"/users");
    roomRef.on("child_added", onChildAdded);
    roomRef.on("child_changed", onChildChanged);
    roomRef.on("child_removed", onChildRemoved);
    
    roomRef.child(uuid).set(user);
}

// Generate unique user id
function guuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4()+s4()+s4()+s4();// + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
