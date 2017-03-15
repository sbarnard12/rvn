var General_Information = document.getElementById('General_Information');
var Work_and_Education = document.getElementById('Work_and_Education');
var Contact_Information = document.getElementById('Contact_Information');
var Interests = document.getElementById('Interests');

$(function(){
    $('#reviews_nav').on('click', getPartial);
    $('#taskHistory_nav').on('click', getPartial);
    $('#currentTasks_nav').on('click', getPartial);
    $('#profile_nav').on('click', getPartial);
    $('td:first-child').each(taskDetailLink);
    $('.complete_button').each(completeButton);

    //if my profile, do the color things
    if(window.location.href.split('/')[4] == "profile") {
        initializeColors();
        displayGeneralInformation();
    }
});

var initializeColors = function() {
		General_Information.setAttribute('class', 'visible');
		Work_and_Education.setAttribute('class', 'hidden');
		Contact_Information.setAttribute('class', 'hidden');
		Interests.setAttribute('class', 'hidden');
		setColor(0);
}

function displayGeneralInformation() {
        General_Information.setAttribute('class', 'visible');
        Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'hidden');
        setColor(0);
}

function displayWorkEducation() {
        General_Information.setAttribute('class', 'hidden');
        Work_and_Education.setAttribute('class', 'visible');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'hidden');
        setColor(1);
}

function displayContactInformation() {
        General_Information.setAttribute('class', 'hidden');
        Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'visible');
        Interests.setAttribute('class', 'hidden');
        setColor(2);
}

function displayInterests() {
        General_Information.setAttribute('class', 'hidden');
        Work_and_Education.setAttribute('class', 'hidden');
        Contact_Information.setAttribute('class', 'hidden');
        Interests.setAttribute('class', 'visible');
        setColor(3);
}


var getPartial = function(){
	console.log("test");
	var tabString = this.id.split("_")[0];
	var id = this.name;
	var url = 'profile/' + id;
	var redirect = "http://localhost:3000/user/" + tabString + "/" + id;

	window.location = (redirect);
};

var taskDetailLink = function(){
	$(this).parent().on('click', function(){
		var id = this.firstElementChild.innerText; 
		var redirect = "http://localhost:3000/taskDetails/" + id;
		window.location = (redirect);
	})
};

var completeButton = function(){
	$(this).on('click', function(){
		event.stopPropagation();
		var id = this.id;
		var url = "http://localhost:3000/taskreview/" + id;
		window.location = (url);
	})
};


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

}
