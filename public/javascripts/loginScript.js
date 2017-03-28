var host = "http://" +  window.location.host;
$(function(){
	$('#login_button').on('click',login);
	$('#createNewAccount').on('click', signup);
    $('#password').on('keyup', function(e){
        if(e.keyCode == 13){
            login();
        }
    });
    $('#userName').on('keyup', function(e){
        if(e.keyCode == 13){
            login();
        }
    });
})

var login = function(){

	$.ajax({
		url: 'login',
		type: 'POST',
		data: $('#login').serialize(),
		success: function(result){
			if(result === "success"){
				window.location = (host + "/home");
			} else {
				$('#login_Error').text("Invalid Username or Password");
			}
		}
	})	
}

var signup = function(){
	window.location = (host + "/signup");
}