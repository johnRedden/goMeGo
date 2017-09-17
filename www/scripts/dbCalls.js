
function onChildAdded(snapshot, prevChildKey)	{
	//updateMap(user);
	updateMap(snapshot.toJSON());
}

function onChildChanged(snapshot)	{
	updateMap(snapshot.toJSON());
	//console.log(snapshot.toJSON().id+" changed");
}

function onChildRemoved(snapshot)	{
	deleteFromMap(snapshot.toJSON());
}