var host = "http://" +  window.location.host;
$(function(){
	$('#continue').on('click', goToLogin);
})

var goToLogin = function(){
	window.location = (host + "/login");
}