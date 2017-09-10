
function onChildAdded(snapshot, prevChildKey)	{
	updateMap(user);
	updateMap(snapshot.toJSON());
}

function onChildChanged(snapshot)	{
	updateMap(snapshot.toJSON());
}

function onChildRemoved(snapshot)	{
	deleteFromMap(snapshot.toJSON());
}