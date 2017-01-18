$(function(){
	$('#submit_button').on('click', submit);
	$('#clearAll_button').on('click', clearAll);
	$('#exit_button').on('click', exit);
//	$('#upload-file').on('click', uploadFile);	
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
				$('#createTask_form').trigger("reset")
			},
			Cancel: function(){
				$(this).dialog("close")
			}
		}
	});
})

var submit = function(){

	var files = $('#upload_file').get(0).files;
	if (files.length > 0){
		// create a FormData object which will be sent as the data payload in the
		// AJAX request
		var formData = new FormData();

		// loop through all the selected files and add them to the formData object
		for (var i = 0; i < files.length; i++) {
			var file = files[i];

			// add the files to formData object for the data payload
			formData.append('uploads[]', file, file.name);
		}
	}



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

var uploadFile = function(){
	var files = $(this).get(0).files; //this will get file info
}

var clearAll = function(){
	$('#clear_dialog').dialog("open");
}

var exit = function(){
	$('#exit_dialog').dialog("open");
}