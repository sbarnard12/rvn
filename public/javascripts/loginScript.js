$(function(){
	$('#submit_button').on('click',login);
})

var login = function(){
	var userName = $('#userName').text();
	var password = $('#password').text();

	$.ajax({
		url: 'login',
		type: 'POST',
		data: $('#login_form').serialize(),
		success: function(result){
			console.log("test");
		}
	})	
}