$(function(){
	$('#posterName').on('click', goToProfile)
	$('#interested_button').on('click', setInterested)
	$('#backToHome_button').on('click', directToHome)
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
		success: function(result){
			console.log("test");
			window.location.replace("http://localhost:3000/match");
		}
	})
}

var directToHome = function(){
	window.location.replace("http://localhost:3000/home")
}

