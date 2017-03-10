var host = "https://" +  window.location.host;
$(function(){
	$('#submit_search').on('click', search);
	$('#createNewTask').on('click', newTask);
    $('#searchterm').on('keyup', function(e){
        if(e.keyCode == 13){
            search();
        }
    });
})


var search = function(){
	var searchterm = $('#searchterm').val();
	var redirect = host + "/tasklist/" + searchterm;
	window.location = (redirect);
}

var newTask = function(){
	var redirect = host + "/createtask"
	window.location = (redirect);
}
