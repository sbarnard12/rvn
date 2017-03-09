$(function(){
    $('td:first-child').each(userProfileLink);
    $('td:last-child').each(setMatchedButton);
    $('#matched_dialog').dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        modal: true,
        autoOpen: false,
        buttons: {
            "OK": function(){
                $(this).dialog("close");
                window.location = ("http://localhost:3000/user/currentTasks");

            }
        }
    });
});

var userProfileLink = function(){
    $(this).parent().on('click', function(){
        var id = this.firstElementChild.innerText;
        var redirect = "http://localhost:3000/user/profile/" + id;
        window.location = (redirect);
    })
};

var setMatchedButton = function(){
    $(this).children().on('click', function(ev){
        ev.stopPropagation();
        var user_id = this.closest('tr').firstElementChild.innerText
        var split = window.location.href.split("/");
        var task_id = split[4];

         $.ajax({
            url: 'http://localhost:3000/interestedUsers',
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
};










