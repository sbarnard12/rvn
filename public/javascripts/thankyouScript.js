$(function(){
	$('#continue').on('click', goToLogin);
})

var goToLogin = function(){
	window.location.replace("http://localhost:3000/login");
}