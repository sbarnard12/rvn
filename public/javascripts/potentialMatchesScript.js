$(function(){
    $('.profile_page').each(userProfileLink);
    $('.match_me').each(setMatchedButton);
    $('#matched_dialog').dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        modal: true,
        autoOpen: false,
        buttons: {
            "OK": function(){
                $(this).dialog("close");
                window.location = (host + "user/currentTasks");
            }
        }
    });
});

var userProfileLink = function(){
    $(this).on('click', function(){
        var id = $(this).closest('.container').children().first().text();
        var redirect = host + "/user/profile/" + id;
        window.location = (redirect);
    })
};

var setMatchedButton = function(){
    $(this).on('click', function(ev){
        ev.stopPropagation();
        var user_id = $(this).closest('.container').children().first().text();
        var task_id = window.location.href.split("/")[4];

         $.ajax({
            url: host + '/interestedUsers',
            type: 'POST',
            data: {task_id: task_id, user_id: user_id},
            success: function(result){
                if(result.status === "success"){
                    //Take back to profile maybe?
                    //popup saying thanks for matching
                    $('#matched_dialog').dialog('open');
                    console.log("success");
                } else {
                    console.log("Fail");
                }
            }
        })
    })
}



