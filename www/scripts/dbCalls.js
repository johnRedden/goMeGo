
function onChildAdded(snapshot, prevChildKey)	{
	//updateMap(user);
	updateMap(snapshot.toJSON());

	//Adjust bounding box somewhere

}

function onChildChanged(snapshot)	{
	updateIconPosForUser(snapshot.toJSON())
	//updateMap(snapshot.toJSON());
	//console.log(snapshot.toJSON().id+" changed");
}

function onChildRemoved(snapshot)	{
	deleteFromMap(snapshot.toJSON());
}