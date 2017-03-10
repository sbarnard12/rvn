var host = "https://" +  window.location.host;
$(function(){
	$('#continue').on('click', goToLogin);
})

var goToLogin = function(){
	window.location = (host + "/login");
}