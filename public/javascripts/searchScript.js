$(function(){
	$('#submit_search').on('click', search);
	$('#createNewTask').on('click', newTask);
    $('#searchTerm').on('keyup', function(e){
        if(e.keyCode == 13){
            search();
        }
    });
})


var search = function(){
	var searchterm = $('#searchTerm').val();
	var redirect = "http://localhost:3000/tasklist/" + searchterm;
	window.location = (redirect);
}

var newTask = function(){
	var redirect = "http://localhost:3000/createtask"
	window.location = (redirect);
}
