$(function(){
	$('#login_button').on('click',login);
	$('#createNewAccount').on('click', signup);
})

var login = function(){

	$.ajax({
		url: 'login',
		type: 'POST',
		data: $('#login').serialize(),
		success: function(result){
			if(result === "success"){
				window.location.replace("http://localhost:3000/home");
			} else {
				$('#login_Error').text("Invalid Username or Password");
			}
		}
	})	
}

var signup = function(){
	window.location.replace("http://localhost:3000/signup");
}