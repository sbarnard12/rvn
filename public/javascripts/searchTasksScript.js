$(function(){
	$("#search_button").on('click', search);
})

var search = function(){

	$.ajax({
		url: 'search',
		type: 'POST',
		data: $('#search_bar').serialize(),
		success: function(result){
			console.log("test");
		}
	})	
}
