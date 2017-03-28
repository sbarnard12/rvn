var host = "http://" +  window.location.host;
$(function(){
	$('#submit_task').on('click', submit);
    //$('#upload-file').submit(uploadFile);
	$('#confirmPost_button').on('click', confirm);


	$('#confirm_dialog').dialog({
		resizable: false,
		height: "auto",
		width: "auto",
		modal: true,
		autoOpen: false,
		buttons: {
			"Confirm": function(){
				$(this).dialog("close");
				submit();

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
        setPreviewFields()
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
            var redirect = host + "/taskdetails/" + result.task._id;
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
            var redirect = host + "/taskdetails/";
            //window.location.replace(redirect);
        }
    });
    return false;
}

var confirm = function(){
	$('#confirm_dialog').dialog("open");
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

var setPreviewFields = function(){
    if($('#offering_radial').is(':checked')){
        $('#offerRequestPreview').text('I am offering the following opportunity');
    }
    if($('#requesting_radial').is(':checked')){
        $('#offerRequestPreview').text('I am requesting the following opportunity');
    }
    $('#titlePreview').text($('#tbtaskTitle').val());
    $('#description_preview').text($('#taskDescription').val());
    var dateNow = new Date(Date.now());
    dateNow = dateNow.toString().split(" ").slice(0,4).join(" ");
    $('#datePostedPreview').text(dateNow);
    $('#locationPreview').text($('#location_input').val());
    var duration = $('#DaysRequestingService').val();
    var DateTo = new Date(Date.now() + duration*86400000);
    DateTo = DateTo.toString().split(" ").slice(0,4).join(" ");
    $('#availableUntilPreview').text(DateTo);
    setPictureUrl();
    //var dateFrom = parseDate($('#fromDate').val());
    //$('#fromDatePreview').text(dateFrom);
    //var dateTo = parseDate($('#toDate').val());
    //$('#toDatePreview').text(dateTo);


};

function myMap() {
var mapProp= {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
};
var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

var parseDate = function(date){
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var dateSplit = date.split('-');
    var month = monthNames[parseInt(dateSplit[1])-1];
    month = month.slice(0,3);
    return month + " " + dateSplit[2] + " " + dateSplit[0];

};

var setPictureUrl = function(){
    var category = $("#category").val();

    var pictureUrl = urlArray[category];
    $("#taskImg").attr('src',pictureUrl);
};

var urlArray = {
    technical: "http://leverhawk.com/wp-content/uploads/2013/04/row-of-personal-computers-iStock_000018237896Medium.jpg",
    basicLabor: "http://c7.alamy.com/comp/CR6F2Y/young-men-doing-a-carpentry-apprenticeship-vocational-training-center-CR6F2Y.jpg",
    mechanical: "https://previews.123rf.com/images/ikonoklast/ikonoklast1303/ikonoklast130300094/18691775-Mechanic-repairing-the-motor-or-electric-parts-of-a-car-in-a-garage-Stock-Photo.jpg",
    academic: "https://thumb9.shutterstock.com/display_pic_with_logo/1860644/398919886/stock-photo-academic-398919886.jpg",
    artistic: "https://thumb9.shutterstock.com/display_pic_with_logo/201175/389834032/stock-photo-artistic-paintbrushes-on-artist-canvas-covered-with-oil-paints-389834032.jpg",
    other: "http://www.giaging.org/images/uploads/images/sstock_441648310_mentor_aa_knit.jpg"
}



//<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&callback=myMap"></script>
