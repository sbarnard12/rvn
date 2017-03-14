$(function(){
    $('td:first-child').each(userProfileLink);
    $('td:last-child').each(setMatchedButton)
})

var userProfileLink = function(){
    $(this).parent().on('click', function(){
        var id = this.firstElementChild.innerText;
        var redirect = "http://localhost:3000/user/profile/" + id;
        window.location = (redirect);
    })
}

var setMatchedButton = function(){
    //not working under tr onclick
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
                if(result === "success"){
                    console.log("success");
                } else {
                    console.log("Fail");
                }
            }
        })
    })
}

/*$(function(){
    $('td:first-child').each(userProfileLink);
    $('td:last-child').each(setMatchedButton)
})

var userProfileLink = function(){
    $(this).parent().on('click', function(){
        var id = this.firstElementChild.innerText;
        var redirect = "http://localhost:3000/user/profile/" + id;
        window.location = (redirect);
    })
}

var setMatchedButton = function(){
    //not working under tr onclick
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
                if(result === "success"){
                    console.log("success");
                } else {
                    console.log("Fail");
                }
            }
        })
    })
}
var General_Information = document.getElementById('General_Information');
var Work_and_Education = document.getElementById('Work_and_Education');
var Contact_Information = document.getElementById('Contact_Information');
var Interests = document.getElementById('Interests');

$(function page_start() {
        General_Information.setAttribute('class', 'visible');
        Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'hidden');
})

function displayGeneralInformation() {
        General_Information.setAttribute('class', 'visible');
        Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'hidden');

}

function displayWorkEducation() {
        General_Information.setAttribute('class', 'hidden');
        Work_and_Education.setAttribute('class', 'visible');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'hidden');
}

function displayContactInformation() {
        General_Information.setAttribute('class', 'hidden');
        Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'visible');
        Interests.setAttribute('class', 'hidden');
}

function displayInterests() {
        General_Information.setAttribute('class', 'hidden');
        Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'visible');
}

$(function(){
    $('#reviews_nav').on('click', getPartial);
    $('#taskHistory_nav').on('click', getPartial);
    $('#currentTasks_nav').on('click', getPartial);
    $('#profile_nav').on('click', getPartial);
    $('td:first-child').each(taskDetailLink);
    $('.complete_button').each(completeButton);
})

var getPartial = function(){
    console.log("test");
    var tabString = this.id.split("_")[0];
    var id = this.name;
    var url = 'profile/' + id;
    var redirect = "http://localhost:3000/user/" + tabString + "/" + id;

    window.location = (redirect);
}

var taskDetailLink = function(){
    $(this).parent().on('click', function(){
        var id = this.firstElementChild.innerText; 
        var redirect = "http://localhost:3000/taskDetails/" + id;
        window.location = (redirect);
    })
}

var completeButton = function(){
    $(this).on('click', function(){
        event.stopPropagation();
        var id = this.id;
        var url = "http://localhost:3000/taskreview/" + id;
        window.location = (url);
    })
}










*/