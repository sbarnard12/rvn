$(function(){
	$('td:first-child').not(':first').each(taskDetailLink)
})

var taskDetailLink = function(){
	$(this).parent().on('click', function(){
		var id = this.firstElementChild.innerText; 
		var redirect = "http://localhost:3000/taskDetails/" + id;
		window.location.replace(redirect);
	})
}