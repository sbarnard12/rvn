$(function(){
	var host = "https://" + window.location.host;
	$('#submit_review').on('click', submitReview);
	$('#submit_dialog').dialog({
		resizable: false,
		height: "auto",
		width: "auto",
		modal: true,
		autoOpen: false,
		buttons: {
			"OK": function(){
				$(this).dialog("close");
				window.location = (host + "/user/profile");
			},
		}
	})
})


var submitReview = function(){
	var id = $('#task_id').attr('name');
	var url = host + "/taskreview/" + id; 
	var data = $('#review_form').serialize() + "&userID=" + $('#other_user').attr('name');
	$('#review_form').serialize() + "&userID=5837db472c258119e8b0857c"

	$.ajax({
		url: url,
		type: 'POST',
		data: data,
		success: function(result){
			console.log("function");
			$('#submit_dialog').dialog('open');
		}
	})
}





