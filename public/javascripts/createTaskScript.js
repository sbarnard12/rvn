$(function(){
	$('#submit_button').on('click', submit);
	$('#clearAll_button').on('click', clearAll);
	$('#exit_button').on('click', exit);
	$('#submit_task').on('click', submit);
    //$('#upload-file').submit(uploadFile);

	$('#exit_dialog').dialog({
		resizable: false,
		height: "auto",
		width: "auto",
		modal: true,
		autoOpen: false,
		buttons: {
			"Exit": function(){
				$(this).dialog("close");
				window.location = ("http://localhost:3000/home");

			},
			Cancel: function(){
				$(this).dialog("close")
			}
		}
	});
	$('#clear_dialog').dialog({
		resizable: false,
		height: "auto",
		width: "auto",
		modal: true,
		autoOpen: false,
		buttons: {
			"Clear All": function(){
				$(this).dialog("close");
				$('#createTask_form').trigger("reset")
			},
			Cancel: function(){
				$(this).dialog("close")
			}
		}
	});
})

var TaskDetails = document.getElementById('TaskDetails');
var heading_TaskDetails = document.getElementById('headingTaskDetails');
var Location = document.getElementById('Location');
var heading_Location = document.getElementById('headingLocation');
var DateandDuration = document.getElementById('DateandDuration');
var heading_DateandDuration = document.getElementById('headingDateandDuration');
var PreviewAd = document.getElementById('PreviewAd');
var heading_PreviewAd = document.getElementById('headingPreviewAd');


$(function page_start() {
		TaskDetails.setAttribute('class', 'visible');
		heading_TaskDetails.setAttribute('class', 'visible');
		Location.setAttribute('class', 'hidden');
		heading_Location.setAttribute('class', 'hidden');
		DateandDuration.setAttribute('class', 'hidden');
		heading_DateandDuration.setAttribute('class', 'hidden');
		PreviewAd.setAttribute('class','hidden');
		heading_PreviewAd.setAttribute('class', 'hidden');
		setColor(0);
})

function displayTaskDetails() {
		TaskDetails.setAttribute('class', 'visible');
		heading_TaskDetails.setAttribute('class', 'visible');
		Location.setAttribute('class', 'hidden');
		heading_Location.setAttribute('class', 'hidden');
		DateandDuration.setAttribute('class', 'hidden');
		heading_DateandDuration.setAttribute('class', 'hidden');
		PreviewAd.setAttribute('class','hidden');
		heading_PreviewAd.setAttribute('class', 'hidden');
		setColor(0);
}

function displayLocation() {
		TaskDetails.setAttribute('class', 'hidden');
		heading_TaskDetails.setAttribute('class', 'hidden');
		Location.setAttribute('class', 'visible');
		heading_Location.setAttribute('class', 'visible');
		DateandDuration.setAttribute('class', 'hidden');
		heading_DateandDuration.setAttribute('class', 'hidden');
		PreviewAd.setAttribute('class','hidden');
		heading_PreviewAd.setAttribute('class', 'hidden');
		setColor(1);
}

function displayDateandDuration() {
		TaskDetails.setAttribute('class', 'hidden');
		heading_TaskDetails.setAttribute('class', 'hidden');
		Location.setAttribute('class', 'hidden');
		heading_Location.setAttribute('class', 'hidden');
		DateandDuration.setAttribute('class', 'visible');
		heading_DateandDuration.setAttribute('class', 'visible');
		PreviewAd.setAttribute('class','hidden');
		heading_PreviewAd.setAttribute('class', 'hidden');
		setColor(2);
}

function displayPreviewAd() {
		TaskDetails.setAttribute('class', 'hidden');
		heading_TaskDetails.setAttribute('class', 'hidden');
		Location.setAttribute('class', 'hidden');
		heading_Location.setAttribute('class', 'hidden');
		DateandDuration.setAttribute('class', 'hidden');
		heading_DateandDuration.setAttribute('class', 'hidden');
		PreviewAd.setAttribute('class','visible');
		heading_PreviewAd.setAttribute('class', 'visible');
		setColor(3);
}


var submit = function(){
   // var formData = new FormData($('#createTask_form'));
	$.ajax({
		url: 'createtask',
		type: 'POST',
		data: $('#createTask_form').serialize(),
		success: function(result){
            var redirect = "http://localhost:3000/taskdetails/" + result.task._id;
            window.location = (redirect);
		}
	})
}

var uploadFile = function(){
    console.log("test");
    $(this).ajaxSubmit({
       error: function(xhr){
           status('Error: ' + xhr.status);
       },
        success: function(response){
            var redirect = "http://localhost:3000/taskdetails/";
            //window.location.replace(redirect);
        }
    });
    return false;
}

var clearAll = function(){
	$('#clear_dialog').dialog("open");
}

var exit = function(){
	$('#exit_dialog').dialog("open");
}

var setColor = function(pagenum){
	var nav = [ $('#navTaskDetails'), $('#navLocation'), $('#navDateandDuration'), $('#navPreviewAd')] ;
	var i = 0;
	for (i=0; i < 4; i++){
		if(i == pagenum){
			nav[i].css('color', 'blue');
		}
		else {
			nav[i].css('color', 'grey');
		}
	}

}


function myMap() {
var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

//<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&callback=myMap"></script>

