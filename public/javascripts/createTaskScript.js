$(function(){
	$('#submit_button').on('click', submit);
	$('#clearAll_button').on('click', clearAll);
	$('#exit_button').on('click', exit);
	$('#upload-file').on('click', submit);
    //$('#upload-file').submit(uploadFile);

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
    var formData = new FormData($('#createTask_form'));
	$.ajax({
		url: 'createtask/photo',
		type: 'POST',
		data: formData,
        contentType: false,
        processData: false,
		success: function(result){
			//redirect to the task details page
            //upload the file
            console.log("test");
		}
	})
}

var uploadFile = function(){
    console.log("test");
    $(this).ajaxSubmit({
       error: function(xhr){
           status('Error: ' + xhr.status);
       },
        success: function(response){
            var redirect = "http://localhost:3000/taskdetails/";
            //window.location.replace(redirect);
        }
    });
    return false;
}

var clearAll = function(){
	$('#clear_dialog').dialog("open");
}

var exit = function(){
	$('#exit_dialog').dialog("open");
}