$(function(){
    var host = "https://" + window.location.host;
	$('#posterName').on('click', goToProfile)
	$('#interested_button').on('click', interested_dialog)
	$('#backToHome_button').on('click', directToHome)
    $('#show_interested').on('click', showInterested)
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
	var redirect = host + "/user/profile/" + id;
	window.location = (redirect);
}

var setInterested = function(){
	var id = $('#poster_id').attr('name');
	var url = host + "/taskDetails/" + id; 

	$.ajax({
		url: url,
		type: 'POST',
        data: $('#interested_form').serialize(),
		success: function(result){
			console.log("test");
            $('#interested_dialog').dialog("close");
			window.location = (host + "/match");
		}
	})
}

var directToHome = function(){
	window.location = (host + "/home")
}

var interested_dialog = function(){
    $('#interested_dialog').dialog("open");
}

var showInterested = function(){
    var id = $('#poster_id').attr('name');
    var url = host + "/interestedUsers/" + id;
    window.location = (url);
    /* $.ajax({
        url: url,
        type: 'GET',
        success: function(result){
            //render the interested users page/popup something
            console.log(result);
        }

    }) */
}


