$(function(){
	$('#posterName').on('click', goToProfile)
})

var goToProfile = function(){
	var id = $('#posterName').attr('name');
	var redirect = "http://localhost:3000/user/profile/" + id;
	window.location.replace(redirect);
}

