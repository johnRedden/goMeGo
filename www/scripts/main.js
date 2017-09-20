//GoMeGo Start Globals
var	user, uuid, roomHash;
var	database, roomRef;
var	isMobile;

$(document).ready(function(){

	var URL = window.location.href;
	var hashTag = window.location.hash;
	
	isMobile=	(/(android|ipad|iphone|ipod)/i).test(navigator.userAgent);
	
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
		$("#initContainer").hide();
		startGPS();

	}else{ //coming in without room hash
		//show auto generated link
		roomHash=	gurid();
		location.hash=	roomHash;
		$("#copyTarget").val(window.location.href);
		$("#userHashTag").val("#"+roomHash);

		//listen for copy click
		$("#copyButton").click(function(){

			database=	firebase.database(); 

			try{
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
			window.location.hash=	roomHash;

			$("#copyTarget").val(window.location.href);

		});

	}

});

// Generate unique room id
function gurid()	{
    function s4() {
        return Math.floor((1 + Math.random()) * 0x100000).toString(36);
    }
    return s4() + s4();
}
