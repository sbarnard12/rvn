$(function(){
	$('#submit_search').on('click', search);
})


var search = function(){
	var searchterm = $('#searchterm').val();
	var redirect = "http://localhost:3000/tasklist/" + searchterm;
	window.location.replace(redirect);
}