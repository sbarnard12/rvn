$(function(){
	$('#continue').on('click', goToLogin);
})

var goToLogin = function(){
	window.location = ("http://localhost:3000/login");
}