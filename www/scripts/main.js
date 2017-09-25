//GoMeGo Start Globals
var	user, uuid, roomHash;
var	database, roomRef;
var	isMobile;

$(document).ready(function(){

	var URL = window.location.href;
	var hashTag = window.location.hash;
	var	currAdOrientation=	localStorage.getItem("adOrientation") || "left"; // Creates a new or gets the previous orientation of the ad
	
	// Switches the orientation around
	// If the orientation is left, swap it to right. If it's right then swap it to left
	currAdOrientation=	((currAdOrientation=== "left") ? "right" : "left");
	// Sets it for the next time
	localStorage.setItem("adOrientation", currAdOrientation);
	
	// Floats the objects to appear on the left or the right
	$("#skipAdSpot").css("float", currAdOrientation);
	$("#smallAdSpot").css("float", currAdOrientation);
	
	isMobile=	(/(android|ipad|iphone|ipod)/i).test(navigator.userAgent);
	
	$("#skipAd").click(function()	{
		$("#mapContainer").show();
		$("#adContainer").hide();
		createMap();
		startGPS();
	});
	
	if(isMobile)	{
		alert("You are Mobile!");
		window.addEventListener("beforeunload", function()	{
			roomRef.child(uuid).remove();
		});
	}
	else	{
		window.addEventListener("beforeunload", function()	{
			roomRef.child(uuid).remove();
			return ("You are leaving the room!");
		});
	}
	if(hashTag)	{ //coming in with room hash
		database=	firebase.database(); 
		roomHash=	window.location.hash.substring(1);
		console.log("why???????");
		$("#initContainer").hide();
		openAdSpace();

	}else{ //coming in without room hash
		//show auto generated link
		roomHash=	gurid();
		//location.hash=	roomHash;
		$("#copyTarget").val(window.location.href);
		$("#userHashTag").val("#"+roomHash);

		//listen for copy click
		$("#copyButton").click(function(){

			database=	firebase.database(); 

			try{
				location.hash=	$("#userHashTag").val();
				roomHash=	window.location.hash.substring(1);
				
				$("#copyTarget").select();
				document.execCommand('copy', true);
				
				$("#initContainer").hide();
				startGPS();
			}catch(e){
				alert(e);
			}

		});

		// build URL
		$("#userHashTag").keyup(function(){

			roomHash = $(this).val().substring(1);
			//window.location.hash=	roomHash;

			$("#copyTarget").val(window.location.href);

		});

	}

});

function openAdSpace(startGPSEvent)	{
	$("#adContainer").show();
	$("#mapContainer").hide();
}

// Generate unique room id
function gurid()	{
    function s4() {
        return Math.floor((1 + Math.random()) * 0x100000).toString(36);
    }
    return s4() + s4();
}
