$(function(){
	$('#reviews_nav').on('click', getPartial);
	$('#taskHistory_nav').on('click', getPartial);
	$('#currentTasks_nav').on('click', getPartial);
	$('#profile_nav').on('click', getPartial);
})

var getPartial = function(){
	console.log("test");
	var tabString = this.id.split("_")[0];
	var id = this.name;
	var url = 'profile/' + id;
	var redirect = "http://localhost:3000/user/" + tabString + "/" + id;

	window.location.replace(redirect);
}

