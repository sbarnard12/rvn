$(function(){
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
				window.location.replace("http://localhost:3000/login");

			},
			Cancel: function(){
				$(this).dialog("close")
			}
		}
	})
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

})

var submit = function(){
	$.ajax({
		url: 'signup',
		type: 'POST',
		data: $('#signUp_form').serialize(),
		success: function(result){
			goToThankyou();
		}
	})
}

var clearAll = function(){
	$('#clear_dialog').dialog("open");
}

var exit = function(){
	$('#exit_dialog').dialog("open");
}

var goToThankyou = function(){
	window.location.replace("http://localhost:3000/thankyou");
}
