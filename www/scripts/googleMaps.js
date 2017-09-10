// Google maps functionality
$(document).ready(function(){
    //Do DOM stuff here
	
});

//Google Maps Tutorial ( https://www.w3schools.com/graphics/google_maps_intro.asp )
//Make the map a global var
var map;
var defaultPostion;
var userMarkers;

function startupMap(_user)	{
	map.setCenter(new google.maps.LatLng(
		_user.lat, _user.lon
	));
}

function updateMap(_user)	{
	if(userMarkers[_user.id])
		userMarkers[_user.id].setMap(null);
	userMarkers[_user.id]=	new google.maps.Marker({
		position:	new google.maps.LatLng(_user.lat, _user.lon)
	});
	userMarkers[_user.id].setMap(map);
	console.log(userMarkers);
}

function deleteFromMap(_user)	{
	if(!userMarkers[_user.id])
		return;
	userMarkers[_user.id].setMap(null);
	userMarkers[_user.id]=	null;
	delete userMarkers[_user.id];
}

function myMap() {
    //cos default
	defaultPosition = new google.maps.LatLng(36.3251,-119.3150);
	userMarkers=	{};
	//userMarker = new google.maps.Marker({position: defaultPosition});
	
	var mapProp = {
		center: defaultPosition,
		zoom:12,
	};
		
	map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

	/* TODO: Add the marker dynamically */
	//userMarker.setMap(map);
}