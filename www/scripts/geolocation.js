//geolocation

$(document).ready(function(){

    //HTML5 Geolocation ( https://www.w3schools.com/html/html5_geolocation.asp )
    //position.coords.heading does not seem to work... try this

    //heading currently not being used
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, true)
    }

    function deviceOrientationHandler(event) {

        if (event.webkitCompassHeading) {
            //mobile safari
            //headingHTML = "<br>Device Orientation Heading WebKit: " + event.webkitCompassHeading ;
            heading = event.webkitCompassHeading;
            
        } else {
            if (!event.alpha) 
                heading = 0;
                //headingHTML = "<br>No Device Orientation: ";
            else
                heading = event.alpha;
                //headingHTML = "<br>Device Orientation Heading: " + event.alpha ;
        }

       $("#info").html(heading);
    }



});

function startGPS() {
	if(navigator.geolocation)	{
		navigator.geolocation.getCurrentPosition(setPos);
		navigator.geolocation.watchPosition(updatePos);
		console.log("App Enabled");
	}
	else	{
		alert("App Disabled. Please activate your location to use.");
		return;
    }
}
function updatePos(args)	{
    if(user.lat== args.coords.latitude && user.lon== args.coords.longitude)
        return;
    user.lat=	args.coords.latitude;
    user.lon=	args.coords.longitude;
    user.timestamp=	args.timestamp;
    updateMap(user);
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
