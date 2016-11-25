$(function(){
	$('#submit_button').on('click', submit);
	$('#clearAll_button').on('click', clearAll);
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
				window.location.replace("http://localhost:3000/home");

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
				$('#createTask_form').trigger("reset")
			},
			Cancel: function(){
				$(this).dialog("close")
			}
		}
	})

})

var submit = function(){
	$.ajax({
		url: 'createtask',
		type: 'POST',
		data: $('#createTask_form').serialize(),
		success: function(result){
			//redirect to the task details page
			var redirect = "http://localhost:3000/taskdetails/" + result.task._id;
			window.location.replace(redirect);
		}
	})
}

var clearAll = function(){
	$('#clear_dialog').dialog("open");
}

var exit = function(){
	$('#exit_dialog').dialog("open");
}