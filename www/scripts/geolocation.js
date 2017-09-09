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

        //google Maps work here *************************************
        userPosition = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

        //to remove a marker setMap(null) ??
        userMarker.setMap(null);
        userMarker = new google.maps.Marker({position: userPosition});
        userMarker.setMap(map);
        // ************************************************************ 

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