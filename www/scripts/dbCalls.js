
function gurid()	{
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(32).substring(1);
	}
	return s4() + s4();
}

function createRoom(urid)	{
	database.ref("rooms/"+urid).set({
		users:	[
			createUser()
		]
	});
}

function createUser()	{
	return {
		id:	uuid,
		lat:	0,
		lon:	0,
		name:	""
	}
}