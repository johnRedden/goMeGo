//GoMeGo Start Globals
var	user, uuid, roomHash;
var	database, roomRef;
var	isMobile;
var heading=0;
var	canUpdate=	true;
var	UpdateRates=	{
	immediately:	0,
	every15Seconds:	15000,
	every30Seconds:	30000,
	every45Seconds:	45000,
	everyMinute:	60000,
	everyXSeconds:	function(x)	{
		return 1000*x;
	}
};
var	updateRate=	UpdateRates.immediately;
var	updateTimeout=	null;
var	isSettingsOpen=	false;

$(document).ready(function(){

	var URL = window.location.href;
	var hashTag = window.location.hash;
	
	$("#updateRate").change(function(args)	{
		console.log(args);
		console.log($("#updateRate").find(":selected").attr("data"));
		switch(Number($("#updateRate").find(":selected").attr("data")))	{
			case 0:
				updateRate=	UpdateRates.immediately;
				clearTimeout(updateTimeout);
				canUpdate=	true;
				break;
			case 1:	updateRate=	UpdateRates.every15Seconds;	break;
			case 2:	updateRate=	UpdateRates.every30Seconds;	break;
			case 3:	updateRate=	UpdateRates.every45Seconds;	break;
			case 4:	updateRate=	UpdateRates.everyMinute;	break;
		}
	});
	
	$("#settingsIcon").click(function(args)	{
		if(isSettingsOpen)
			$("#settingsContainer").css("display", "none");
		else
			$("#settingsContainer").css("display", "block");
		isSettingsOpen=	!isSettingsOpen;
	});
	
	$("#exitSettings").click(function(args)	{
		isSettingsOpen=	false;
		$("#settingsContainer").css("display", "none");
	});
	
	isMobile=	(/(android|ipad|iphone|ipod)/i).test(navigator.userAgent);
	
	if(isMobile)	{
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
		//location.hash=	roomHash;
		$("#copyTarget").val(window.location.href);
		$("#userHashTag").val("#"+roomHash);

		//listen for copy click
		$("#copyButton").click(function(){

			database=	firebase.database(); 

			try{
				location.hash=	$("#userHashTag").val();
				roomHash=	window.location.hash.substring(1);
				
				$("#copyTarget").val(window.location.href);
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

			$("#copyTarget").val(location.href);

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
