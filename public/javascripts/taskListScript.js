var host = "https://" +  window.location.host;
$(function(){
	$('td:first-child').each(taskDetailLink)
})

var taskDetailLink = function(){
	$(this).parent().on('click', function(){
		var id = this.firstElementChild.innerText; 
		var redirect = host + "/taskDetails/" + id;
		window.location = (redirect);
	})
}