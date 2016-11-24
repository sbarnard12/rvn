$(function(){
	$('#reviews_nav').on('click', function(){window.location.replace("http://localhost:3000/user/reviews")});
	$('#taskHistory_nav').on('click', function(){window.location.replace("http://localhost:3000/user/taskhistory")});
	$('#currentTasks_nav').on('click',  function(){window.location.replace("http://localhost:3000/user/currenttasks")});
	$('#profile_nav').on('click',  function(){window.location.replace("http://localhost:3000/user/profile")});
})

var getPartial = function(){
	console.log("test");
	var tabString = this.id.split("_")[0];
	$.ajax({
		url: 'profile',
		type: 'POST',
		data: {tab: tabString},
		success: function(result){
			console.log(result);
		}
	})
}


var getReviews = function(){
	console.log("reviews");
	/* $.ajax({
		url: 'profile',
		type: 'POST',
		data: {tab: "reviews"},
		success: function(result){
			console.log(result);
		}
	}) */

}

var getTaskHistory = function(){
	console.log("taskhistory");
	/* $.ajax({
		url: 'profile',
		type: 'POST',
		data: {tab: "taskHistory"},
		success: function(result){
			console.log(result);
		}
	}) */
}

var getCurrentTasks = function(){
	console.log("currenttasks");
	/* $.ajax({
		url: 'profile',
		type: 'POST',
		data: {tab: "currentTasks"},
		success: function(result){
			console.log(result);
		}
	}) */
}

var getProfile = function(){
	console.log("profile");
	/* $.ajax({
		url: 'profile',
		type: 'POST',
		data: {tab: "profile"},
		success: function(result){
			console.log(result);
		}
	}) */
}


