//GoMeGo Start
// Room and user id
var	uuid;
var	roomHash;

var	database;
var	roomRef;
var	user;

$(document).ready(function(){
	
	if(navigator.geolocation)	{
		database=	firebase.database();
		navigator.geolocation.getCurrentPosition(setPos);
		navigator.geolocation.watchPosition(updatePos);
		console.log("App Enabled");
	}
	else	{
		alert("App Disabled. Please activate your location to use.");
		return;
	}
	
	function updatePos(args)	{
		user.lat=	args.coords.latitude;
		user.lon=	args.coords.longitude;
		user.timestamp=	args.timestamp;
		updateMap(user);
	}
	
	function setPos(args)	{
		uuid=	localStorage.getItem("uuid") || (function()	{
			// Variables
			var	_uuid=	guuid();
			localStorage.setItem("uuid", _uuid);
			return _uuid;
		})();
		user=	{
			id:	uuid,
			lat:	args.coords.latitude,
			lon:	args.coords.longitude,
			timestamp:	args.timestamp
		};
		
		startupMap(user);
		
		if(location.hash)	{
			roomHash=	location.hash.substring(1);
		}
		else	{
			roomHash=	gurid();
			location.hash=	roomHash;
		}
		// DATABASE_CALL: Adds the user to the room
		roomRef=	database.ref("rooms/"+roomHash+"/users");
		
		// DATABASE_CALL: Update on child_added
		roomRef.on("child_added", onChildAdded);
		// DATABASE_CALL: Update on child_changed
		roomRef.on("child_changed", onChildChanged);
		// DATABASE_CALL: Update on child_removed
		roomRef.on("child_removed", onChildRemoved);
		
		roomRef.child(uuid).set(user);
	}
	// Generate unique user id
	function guuid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4()+s4()+s4()+s4();// + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
	// Generate unique room id
	function gurid()	{
		function s4() {
			return Math.floor((1 + Math.random()) * 0x100000).toString(36);
		}
		return s4() + s4();
	}

    // Copy URL functionality
    //Populate URL
    

    var URL = window.location.href;
    var hashTag = window.location.hash; //how cool is that?

    $("#copyTarget").val(URL);
    $("#userHashTag").val(hashTag);

    //listen for copy click
    $("#copyButton").click(function(){
        try{
            $("#copyTarget").select();
            document.execCommand('copy');
        }catch(e){
            alert(e);
        }

    });

    // build URL
    $("#userHashTag").keyup(function(){

        $("#copyTarget").val(URL + $(this).val() );

    });
	


});
