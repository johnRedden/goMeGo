//GoMeGo Start
// Room and user id
var	uuid;
var	roomHash;

var	database;
var	roomRef;
var	user;

window.onbeforeunload=	function()	{
	roomRef.child(uuid).remove();
};

window.unload=	function()	{
	roomRef.child(uuid).remove();
};

$(document).ready(function(){
	

	/*
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
	*/

    // Copy URL functionality
    //Populate URL
    

    var URL = window.location.href;
	var hashTag = window.location.hash; //how cool is that?
	
	if(hashTag)	{
		database=	firebase.database(); // TODO: Place somewhere? (debatable)
		console.log("ASDA");
		$("#initContainer").hide();
		startGPS();
	}

    $("#copyTarget").val(URL);
    $("#userHashTag").val(hashTag);

    //listen for copy click
    $("#copyButton").click(function(){
		database=	firebase.database(); // TODO: Place somewhere? (debatable)
        try{
            $("#userHashTag").select();
			document.execCommand('copy', true);
			
			$("#initContainer").hide();
			console.log($("#userHashTag").val());
			location.hash=	$("#userHashTag").val();
			console.log(location.hash);
			startGPS();
        }catch(e){
            alert(e);
        }

    });

    // build URL
    $("#userHashTag").keyup(function(){

        $("#copyTarget").val(URL + $(this).val() );

    });
	


});
