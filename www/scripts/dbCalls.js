
function onChildAdded(snapshot, prevChildKey)	{
	//updateMap(user);
	updateMap(snapshot.toJSON());

	//Adjust bounding box 
	userMarkers.forEach(function (Marker) {
      bounds.extend(Marker.getPosition());
    });
    
    map.fitBounds(bounds);
}

function onChildChanged(snapshot)	{
	updateIconPosForUser(snapshot.toJSON())
	//updateMap(snapshot.toJSON());
	//console.log(snapshot.toJSON().id+" changed");
}

function onChildRemoved(snapshot)	{
	deleteFromMap(snapshot.toJSON());
}