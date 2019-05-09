$(document).ready(function(){ 
	$("#chat_section").hide();
	$("#launcher_img").on("click",function(){
	 	$("#launcher_img").hide();
		var voices = speech.voices;
		var a = new Array(); 
		for(i in voices){a[i]=(voices[i]["lang"]);}
		for(i in a){
			$(".languages").append($('<option>', { value: a[i],text : a[i]}));
		}
	});
	$(".minimize").on("click",function(){
	 	$("#launcher_img").show();
	});
	$(".cs").on("click",function(){
		closeForm();
	 	$("#launcher_img").show();
	});
    $("#button").on("click",function(){
        $(".splash").hide();
        $("#chat_section").show();
        console.log($(".languages").val());
        speech.setLang($(".languages").val());

        for(i in data['services']){
			var selected=(data['services'][i]).toString();
			$("#section").append("<button class='btn btn-default' onclick='selection(\""+selected+"\")'>"+selected+"</button>");
		}
		speak_out(`here are the list of services. please select one.`);
		$("#section").append("<hr>");
    });
    // var json;
    // $.ajax({
    //     'async': false,
    //     'global': false,
    //     'url': "https://gist.githubusercontent.com/AmulyaReddy99/ebef2819b5d05fcc89412cf9b54e1d69/raw/e4200690bac1d64c17fd27f8a4f6e9e2a0e4c403/insta.json",
    //     'dataType': "json",
    //     'success': function (data) {
    //         console.log(data['responseText']);
    //         // json = data;
    //     }
    // }).done(function(data){
    //     console.log("success"); 
    // }).fail(function(e){
    //     console.log(e);
    // });
    // console.log(json);
	$(document).on('keypress',function(e) {
	    if(e.which == 13) {
	        $("#get_message").click();
	    }
	});
	$("#get_message").on("click",textinputeval);
    $("#get_voice").on("click",voiceinputeval);
});