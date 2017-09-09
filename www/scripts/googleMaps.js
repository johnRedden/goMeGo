// Google maps functionality
$(document).ready(function(){

    //Do DOM stuff here



});

//Google Maps Tutorial ( https://www.w3schools.com/graphics/google_maps_intro.asp )
//Make the map a global var
var map;
var defaultPostion, defaultMarker;
var userPosition, userMarker;

function myMap() {
    //cos default
    defaultPosition = new google.maps.LatLng(36.3251,-119.3150);
    defaultMarker = new google.maps.Marker({position: defaultPosition});
    userMarker = defaultMarker;

    var mapProp = {
        center: defaultPosition,
        zoom:12,
    };
        
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

    /* TODO: Add the marker dynamically */
    defaultMarker.setMap(map);

}