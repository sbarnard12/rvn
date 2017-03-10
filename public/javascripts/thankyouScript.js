$(function(){
	var host = "https://" + window.location.host;
	$('#continue').on('click', goToLogin);
})

var goToLogin = function(){
	window.location = (host + "/login");
}