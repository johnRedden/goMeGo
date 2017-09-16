//GoMeGo Start

$(document).ready(function(){

    //Start tracking only if user click the button
    $("#getLocationBtn").click(getLocation);


    //HTML5 Geolocation ( https://www.w3schools.com/html/html5_geolocation.asp )
    function getLocation() {
        if (navigator.geolocation) {
            //navigator.geolocation.getCurrentPosition(showPosition, showError);
            $("#getLocationBtn").prop("disabled",true);
            navigator.geolocation.watchPosition(showPosition, showError);
            
        } else { 
            $("#currentLocation").html("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(pos) {
        var posHTML = "Latitude: " + pos.coords.latitude + 
        "<br>Longitude: " + pos.coords.longitude +
        "<br>Heading: " + pos.coords.heading +
        "<br>TimeStamp: " + pos.timestamp;
        $("#currentLocation").html(posHTML);
		
		console.log(map);

        //google Maps work here *************************************
        userPosition = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

        //to remove a marker setMap(null) ??
        userMarker.setMap(null);
        userMarker = new google.maps.Marker({position: userPosition});
        userMarker.setMap(map);
        // ************************************************************
		console.log(userMarker);
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                $("#currentLocation").html("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                $("#currentLocation").html("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                $("#currentLocation").html("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                $("#currentLocation").html("An unknown error occurred.");
                break;
        }
    }


    //position.coords.heading does not seem to work... try this
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', deviceOrientationHandler, true)
    }

    function deviceOrientationHandler(event) {

        if (event.webkitCompassHeading) {
            //mobile safari
            headingHTML = "<br>Device Orientation Heading WebKit: " + event.webkitCompassHeading ;
            
        } else {
            if (!event.alpha) 
                headingHTML = "<br>No Device Orientation: ";
            else
                headingHTML = "<br>Device Orientation Heading: " + event.alpha ;
        }

        $("#currentHeading").html(headingHTML);
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
    
    startupMap(user);
    
    if(location.hash)	{
        roomHash=	location.hash.substring(1);
    }
    else	{
        roomHash=	gurid();
        location.hash=	roomHash;
    }
    // DATABASE_CALL: Adds the user to the room
    roomRef=	database.ref("rooms/"+roomHash+"/users");
    
    // DATABASE_CALL: Update on child_added
    roomRef.on("child_added", onChildAdded);
    // DATABASE_CALL: Update on child_changed
    roomRef.on("child_changed", onChildChanged);
    // DATABASE_CALL: Update on child_removed
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
// Generate unique room id
function gurid()	{
    function s4() {
        return Math.floor((1 + Math.random()) * 0x100000).toString(36);
    }
    return s4() + s4();
}