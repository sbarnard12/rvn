$(function(){
	$('#submit_button').on('click', submit);

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
