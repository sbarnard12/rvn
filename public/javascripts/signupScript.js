var host = "https://" +  window.location.host;
$(function(){
	$('#submit_button').on('click', submit);
	$('#clearall_button').on('click', clearAll);
	$('#exit_button').on('click', exit);
	$('#exit_dialog').dialog({
		resizable: false,
		height: "auto",
		width: "auto",
		modal: true,
		autoOpen: false,
		buttons: {
			"Exit": function(){
				$(this).dialog("close");
				window.location = (host + "/login");

			},
			Cancel: function(){
				$(this).dialog("close")
			}
		}
	});
	$('#clear_dialog').dialog({
		resizable: false,
		height: "auto",
		width: "auto",
		modal: true,
		autoOpen: false,
		buttons: {
			"Clear All": function(){
				$(this).dialog("close");
				$('#signUp_form').trigger("reset")
			},
			Cancel: function(){
				$(this).dialog("close")
			}
		}
	})
	$("#cbMusicHobby").on("change", function()
	{
    	if($('#cbMusicHobby').is(":checked"))   
        	$("#tbMusicHobby").show();
    	else
        	$("#tbMusicHobby").hide();
	})
	$("#cbOtherHobby").on("change", function()
	{
    	if($('#cbOtherHobby').is(":checked"))   
        	$("#tbOtherHobby").show();
    	else
        	$("#tbOtherHobby").hide();
	})
	$("#cbMusicInterest").on("change", function()
	{
    	if($('#cbMusicInterest').is(":checked"))   
        	$("#tbMusicInterest").show();
    	else
        	$("#tbMusicInterest").hide();
	})
	$("#cbOtherInterest").on("change", function()
	{
    	if($('#cbOtherInterest').is(":checked"))   
        	$("#tbOtherInterest").show();
    	else
        	$("#tbOtherInterest").hide();
	})
	$("#tbMusicHobby").hide();
	$("#tbMusicInterest").hide();
	$("#tbOtherInterest").hide();
	$("#tbOtherHobby").hide();
});

var submit = function(){
    if (noEmptyFields()){
        var data = $('#signUp_form').serialize();
        var Hobbies = checkHobby();
        var Interests = checkInterest();
        data = data + "&Hobbies=" + Hobbies + "&Interests=" + Interests;
        $.ajax({
            url: 'signup',
            type: 'POST',
            data: data,
            success: function(result){
                if(result == "User Already Exists"){
                    $('#email_error').text("This Email is Already in Use");
                    $('#error_message').text("There is an error");
                } else if(result == "success") {
                    setTimeout(loginFirstTime(), 1000);
                }

            }
        })
    }
}

var clearAll = function(){
	$('#clear_dialog').dialog("open");
}

var exit = function(){
	$('#exit_dialog').dialog("open");
}

var goToThankyou = function(){
	window.location = (host + "/thankyou");
}

var noEmptyFields = function(){
    var required_fields = ["firstName", "lastName", "phoneNumber", "streetAddress", "city", "province", "postalCode", "email", "password", "passwordConfirm"];
    var i = 0;
    for (index in required_fields){
        if(!($("#" + required_fields[index]).val())){
            $("#" + required_fields[index] + "_error").text("This Field is Required");
            i++;
        } else {
            $("#" + required_fields[index] + "_error").text("");
        }
    }
    return (i == 0);
};

var  checkHobby = function(){
    var HobbyArray = [];
    $("input[name='Hobbies']").each(function(index,item) {
            if(item.checked){
                HobbyArray.push(item.value);
            }
    });
    if($('#cbMusicHobby').is(':checked')){
        HobbyArray.push($('#tbMusicHobby').val());
    }
     if($('#cbSportsHobby').is(':checked')){
        HobbyArray.push($('#tbSportsHobby').val());
    }
    
     if($('#cbDanceHobby').is(':checked')){
        HobbyArray.push($('#tbDanceHobby').val());
    }
    if($('#cbOtherHobby').is(':checked')){
        HobbyArray.push($('#tbOtherHobby').val());
    }
    
    return(JSON.stringify(HobbyArray));
}


var  checkInterest = function(){
    var InterestArray = [];
    $("input[name='Interests']").each(function(index,item) {
        if(item.checked){
            InterestArray.push(item.value);
        }
    });
    if($('#cbMusicInterest').is(':checked')){
        InterestArray.push($('#tbMusicInterest').val());
    }
    if($('#cbSportsInterest').is(':checked')){
        InterestArray.push($('#tbSportsInterest').val());
    }
    if($('#cbDanceInterest').is(':checked')){
        InterestArray.push($('#tbDanceInterest').val());
    }
    if($('#cbOtherInterest').is(':checked')){
        InterestArray.push($('#tbOtherInterest').val());
    }
   return(JSON.stringify(InterestArray));
};

var loginFirstTime = function(){
    var data = getLoginInfo();
    $.ajax({
        url: 'login',
        type: 'POST',
        data: data,
        success: function(){
            window.location = (host + "/user/profile");
        }
    })
}

var getLoginInfo = function(){
    var email = $('#email').val();
    var login = $('#password').val();

    return "userName=" + email + "&password=" + login;
}