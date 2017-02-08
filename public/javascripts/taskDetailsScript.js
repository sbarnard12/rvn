$(function(){
	$('#posterName').on('click', goToProfile)
	$('#interested_button').on('click', interested_dialog)
	$('#backToHome_button').on('click', directToHome)
    $('#interested_dialog').dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        modal: true,
        autoOpen: false,
        buttons: {
            "Submit": function(){
                setInterested()
            },
            Cancel: function(){
                $(this).dialog("close")
            }
        }
    });
})

var goToProfile = function(){
	var id = $('#posterName').attr('name');
	var redirect = "http://localhost:3000/user/profile/" + id;
	window.location.replace(redirect);
}

var setInterested = function(){
	var id = $('#poster_id').attr('name');
	var url = "http://localhost:3000/taskDetails/" + id; 

	$.ajax({
		url: url,
		type: 'POST',
        data: $('#interested_form').serialize(),
		success: function(result){
			console.log("test");
            $('#interested_dialog').dialog("close");
			window.location.replace("http://localhost:3000/match");
		}
	})
}

var directToHome = function(){
	window.location.replace("http://localhost:3000/home")
}

var interested_dialog = function(){
    $('#interested_dialog').dialog("open");
}


