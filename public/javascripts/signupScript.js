$(function(){
	var host = "https://" + window.location.host;
	$('#submit_button').on('click', submit);
	$('#clearall_button').on('click', clearAll);
	$('#exit_button').on('click', exit);
	$('#exit_dialog').dialog({
		resizable: false,
		height: "auto",
		width: "auto",
		modal: true,
		autoOpen: false,
		buttons: {
			"Exit": function(){
				$(this).dialog("close");
				window.location = (host + "/login");

			},
			Cancel: function(){
				$(this).dialog("close")
			}
		}
	});
	$('#clear_dialog').dialog({
		resizable: false,
		height: "auto",
		width: "auto",
		modal: true,
		autoOpen: false,
		buttons: {
			"Clear All": function(){
				$(this).dialog("close");
				$('#signUp_form').trigger("reset")
			},
			Cancel: function(){
				$(this).dialog("close")
			}
		}
	})

});

var submit = function(){
    if (noEmptyFields()){
        $.ajax({
            url: 'signup',
            type: 'POST',
            data: $('#signUp_form').serialize(),
            success: function(result){
                if(result == "User Already Exists"){
                    $('#email_error').text("This Email is Already in Use");
                } else if(result == "success") {
                    goToThankyou();
                }

            }
        })
    }
}

var clearAll = function(){
	$('#clear_dialog').dialog("open");
}

var exit = function(){
	$('#exit_dialog').dialog("open");
}

var goToThankyou = function(){
	window.location = (host + "/thankyou");
}

var noEmptyFields = function(){
    var required_fields = ["firstName", "lastName", "phoneNumber", "streetAddress", "city", "province", "postalCode", "email", "password", "passwordConfirm"];
    var i = 0;
    for (index in required_fields){
        if(!($("#" + required_fields[index]).val())){
            $("#" + required_fields[index] + "_error").text("This Field is Required");
            i++;
        } else {
            $("#" + required_fields[index] + "_error").text("");
        }

    }
    return (i == 0);
}


