//GoMeGo Start
$(document).ready(function(){


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
