$(function(){
	$('#reviews_nav').on('click', getPartial);
	$('#taskHistory_nav').on('click', getPartial);
	$('#currentTasks_nav').on('click', getPartial);
	$('#profile_nav').on('click', getPartial);
	$('td:first-child').each(taskDetailLink);
	$('.complete_button').each(completeButton);
    $('.delete_button').each(deleteButton);
});

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

var deleteButton = function(){
    $(this).on('click', function(){
        event.stopPropagation();

    })
};
