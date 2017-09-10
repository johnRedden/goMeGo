// Google maps functionality
$(document).ready(function(){
    //Do DOM stuff here
	
});

//Google Maps Tutorial ( https://www.w3schools.com/graphics/google_maps_intro.asp )
//Make the map a global var
var map;
var defaultPostion;
var userMarker;

function startupMap(_user)	{
	map.setCenter(new google.maps.LatLng(
		user.lat, user.lon
	));
}

function updateMap(_user)	{
	userMarker.setMap(null);
	userMarker=	new google.maps.Marker({
		position:	new google.maps.LatLng(_user.lat, _user.lon)
	});
	userMarker.setMap(map);
}

function myMap() {
    //cos default
	defaultPosition = new google.maps.LatLng(36.3251,-119.3150);
	userMarker = new google.maps.Marker({position: defaultPosition});
	
	var mapProp = {
		center: defaultPosition,
		zoom:12,
	};
		
	map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

	/* TODO: Add the marker dynamically */
	userMarker.setMap(map);
}