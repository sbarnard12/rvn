$(function(){
	$('#submit_search').on('click', search);
	$('#createNewTask').on('click', newTask);
    $('#searchTerm').on('keyup', function(e){
        if(e.keyCode == 13){
            search();
        }
    });
    $('#reviews_nav').on('click', getPartial);
    $('#taskHistory_nav').on('click', getPartial);
    $('#currentTasks_nav').on('click', getPartial);
    $('#profile_nav').on('click', getPartial);
})


var search = function(){
	var searchterm = $('#searchTerm').val();
	var redirect = "http://localhost:3000/tasklist/" + searchterm;
	window.location = (redirect);
}

var newTask = function(){
	var redirect = "http://localhost:3000/createtask"
	window.location = (redirect);
};

var getPartial = function(){
    console.log("test");
    var tabString = this.id.split("_")[0];
    var id = this.name;
    var url = 'profile/' + id;
    var redirect = "http://localhost:3000/user/" + tabString + "/" + id;

    window.location = (redirect);
};
