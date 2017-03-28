var host = "http://" +  window.location.host;
var General_Information = document.getElementById('General_Information');
var Work_and_Education = document.getElementById('Work_and_Education');
var Contact_Information = document.getElementById('Contact_Information');
var Interests = document.getElementById('Interests');

$(function(){
    setProfilePic();
    $('#reviews_nav').on('click', getPartial);
    $('#taskHistory_nav').on('click', getPartial);
    $('#currentTasks_nav').on('click', getPartial);
    $('#profile_nav').on('click', getPartial);
    $('.viewDetails').each(taskDetailLink);
    $('.complete_button').each(completeButton);

    //if my profile, do the color things
    if(window.location.href.split('/')[4] == "profile") {
        initializeColors();
        displayGeneralInformation();
    }
});

var initializeColors = function() {
		General_Information.setAttribute('class', 'visible');
		//Work_and_Education.setAttribute('class', 'hidden');
		Contact_Information.setAttribute('class', 'hidden');
		Interests.setAttribute('class', 'hidden');
		setColor(0);
}

function displayGeneralInformation() {
        General_Information.setAttribute('class', 'visible');
        //Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'hidden');
        setColor(0);
}

function displayWorkEducation() {
        General_Information.setAttribute('class', 'hidden');
        //Work_and_Education.setAttribute('class', 'visible');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'hidden');
        setColor(1);
}

function displayContactInformation() {
        General_Information.setAttribute('class', 'hidden');
        //Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'visible');
        Interests.setAttribute('class', 'hidden');
        setColor(2);
}

function displayInterests() {
        General_Information.setAttribute('class', 'hidden');
        //Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'visible');
        setColor(3);
}


var getPartial = function(){
	console.log("test");
	var tabString = this.id.split("_")[0];
	var id = this.name;
	var url = 'profile/' + id;
	var redirect = host + "/user/" + tabString + "/" + id;

	window.location = (redirect);
};

var taskDetailLink = function(){

	$(this).on('click', function(){
		var id = $(this).closest('.postTaskContent').children().first().text();
        var redirect = host + "/taskDetails/" + id;
		window.location = (redirect);
	})
};

var completeButton = function(){
	$(this).on('click', function(){
		event.stopPropagation();
		var id = this.id;
		var url = host + "/taskreview/" + id;
		window.location = (url);
	})
};

var setProfilePic = function(){
    var gender = $("#gender_hidden").text();

    switch (gender){
        case "0":
            gender = "Male";
            break;
        case "1":
            gender = "Female";
            break;
        case "2":
            gender = "prefernot";
            break;
        case "Prefer not to say.":
            gender = "prefernot";
            break;
        default:
            break;
    }

    $('#profilePicture').attr('src', genderUrlArray[gender]);
}

var setColor = function(pagenum) {
    var nav = [$('#navGeneralInformation'), $('#navWorkEducation'), $('#navContactInformation'), $('#navInterests')];
    var i = 0;
    for (i = 0; i < 4; i++) {
        if (i == pagenum) {
            nav[i].css('color', 'blue');
        } else {
            nav[i].css('color', 'grey');
        }
    }
};

var genderUrlArray = {
    Male: "https://image.shutterstock.com/z/stock-vector-man-silhouette-profile-picture-vector-151265393.jpg",
    Female: "https://image.shutterstock.com/z/stock-vector-woman-avatar-profile-picture-vector-151265954.jpg",
    prefernot: "https://image.shutterstock.com/z/stock-vector-male-avatar-profile-picture-vector-148661750.jpg"
}