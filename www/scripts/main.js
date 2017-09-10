//GoMeGo Start
// Room and user id
var	uuid;
var	roomHash;

var	database;
var	room;

$(document).ready(function(){
	database=	firebase.database();
	// Create user uuid
	function guuid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
	uuid=	localStorage.getItem('uuid');
	if(!uuid)	{
		uuid=	guuid();
		localStorage.setItem("uuid", uuid);
	}
	createRoom(gurid());

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
