
function onChildAdded(snapshot, prevChildKey)	{
	console.log(snapshot, prevChildKey);
	updateMap(user);
	updateMap(snapshot.toJSON());
}

function onChildChanged(snapshot)	{
	console.log(snapshot);
}

function onChildRemoved(snapshot)	{
	console.log(snapshot);
}