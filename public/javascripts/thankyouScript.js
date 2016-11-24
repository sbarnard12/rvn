$(function(){
	$('#continue').on('click', goToLogin);
})

var goToHome = function(){
	window.location.replace("http://localhost:3000/login");
}