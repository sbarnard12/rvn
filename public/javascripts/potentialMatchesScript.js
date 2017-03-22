$(function(){
    $('#reviews_nav').on('click', getPartial);
    $('#taskHistory_nav').on('click', getPartial);
    $('#currentTasks_nav').on('click', getPartial);
    $('#profile_nav').on('click', getPartial);
    $('.profile_page').each(userProfileLink);
    $('.match_me').each(confirmMatch);

    $('#confirmMatch_dialog').dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        modal: true,
        autoOpen: false,
        buttons: {
            "Yes": function(){
                $(this).dialog("close");
                setMatched($(this).data('button'));

            },
            Cancel: function(){
                $(this).dialog("close")
            }
        }
    });
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

var confirmMatch = function(){
    $(this).on('click', function(){
        $('#confirmMatch_dialog').data('button', this).dialog("open");
    })

}
var userProfileLink = function(){
    $(this).on('click', function(){
        var id = $(this).closest('.container').children().first().text();
        var redirect = "http://localhost:3000/user/profile/" + id;
        window.location = (redirect);
    })
};

var setMatched = function(button){
        var user_id = $(button).closest('.container').children().first().text();
        var task_id = window.location.href.split("/")[4];

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
};

var getPartial = function(){
    console.log("test");
    var tabString = this.id.split("_")[0];
    var id = this.name;
    var url = 'profile/' + id;
    var redirect = "http://localhost:3000/user/" + tabString + "/" + id;

    window.location = (redirect);
};



