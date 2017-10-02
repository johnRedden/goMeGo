// Google maps functionality
$(document).ready(function(){
    //Do DOM stuff here
	
});

//Google Maps Tutorial ( https://www.w3schools.com/graphics/google_maps_intro.asp )
//Make the map a global var
var map;
var defaultPostion;
var userMarkers;
var bounds;
function startupMap(_user)	{
	map.setCenter(new google.maps.LatLng(
		_user.lat, _user.lon
	));//Adjust bounding box 
	for(var i= 0; i< userMarkers.length; i++)	{
		bounds.extend(userMarkers[i].getPosition());
	}
	map.fitBounds(bounds);
}

function updateMap(_user)	{
	if(userMarkers[_user.id])
		userMarkers[_user.id].setMap(null);
	
	userMarkers[_user.id]=	new google.maps.Marker({
		position:	new google.maps.LatLng(_user.lat, _user.lon),
		icon: {
			//local user gets arrow and blue
			//helpful icon reference: https://developers.google.com/maps/documentation/javascript/3.exp/reference#Icon
			path: user.id===_user.id?google.maps.SymbolPath.FORWARD_CLOSED_ARROW:google.maps.SymbolPath.CIRCLE,
			scale: 6,
			rotation: heading,
			strokeColor: user.id===_user.id?'blue':'red',
			strokeWeight: 4
		}
		
		//user.id===_user.id?'images/pacman.png#pacman':'', //local user gets pacman otherwise default	
	});
	
	userMarkers[_user.id].setMap(map);
	if(user== _user)
    	roomRef.child(_user.id).set(_user);
	//console.log(userMarkers);
}

function updateIconPosForUser(_user){
	//just set the new position for the marker
	userMarkers[_user.id].setPosition(new google.maps.LatLng(_user.lat, _user.lon));

}

function deleteFromMap(_user)	{
	if(!userMarkers[_user.id])
		return;
	userMarkers[_user.id].setMap(null);
	userMarkers[_user.id]=	null;
	delete userMarkers[_user.id];
}

function createMap() {
    //cos default
	defaultPosition = new google.maps.LatLng(36.3251,-119.3150);
	userMarkers=	{};
	bounds=	new google.maps.LatLngBounds();
	//userMarker = new google.maps.Marker({position: defaultPosition});
	
	var mapProp = {
		center: defaultPosition,
		zoom:12,
	};
	
	bounds=	new google.maps.LatLngBounds();
	map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

	/* TODO: Add the marker dynamically */
	//userMarker.setMap(map);
}

