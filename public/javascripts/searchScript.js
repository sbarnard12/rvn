$(function(){
	$('#submit_search').on('click', search);
	$('#createNewTask').on('click', newTask);
})


var search = function(){
	var searchterm = $('#searchterm').val();
	var redirect = "http://localhost:3000/tasklist/" + searchterm;
	window.location.replace(redirect);
}

var newTask = function(){
	var redirect = "http://localhost:3000/createtask"
	window.location.replace(redirect);
}
