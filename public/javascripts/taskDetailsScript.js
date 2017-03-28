var host = "http://" +  window.location.host;
$(function(){
    setPictureUrl();
	$('#posterName').on('click', goToProfile)
	$('#interested_button').on('click', interested_dialog)
	$('#backToHome_button').on('click', directToHome)
    $('#show_interested').on('click', showInterested)
    $('#interested_dialog').dialog({
        resizable: false,
        height: "auto",
        width: "auto",
        modal: true,
        autoOpen: false,
        buttons: {
            "Submit": function(){
                setInterested()
            },
            Cancel: function(){
                $(this).dialog("close")
            }
        }
    });

})

var goToProfile = function(){
	var id = $('#posterName').attr('name');
	var redirect = host + "/user/profile/" + id;
	window.location = (redirect);
}

var setInterested = function(){
	var id = $('#poster_id').attr('name');
	var url = host + "/taskDetails/" + id; 

	$.ajax({
		url: url,
		type: 'POST',
        data: $('#interested_form').serialize(),
		success: function(result){
			console.log("test");
            $('#interested_dialog').dialog("close");
			window.location = (host + "/match");
		}
	})
}

var directToHome = function(){
	window.location = (host + "/home")
}

var interested_dialog = function(){
    $('#interested_dialog').dialog("open");
}

var showInterested = function(){
    var id = $('#poster_id').attr('name');
    var url = host + "/interestedUsers/" + id;
    window.location = (url);
    /* $.ajax({
        url: url,
        type: 'GET',
        success: function(result){
            //render the interested users page/popup something
            console.log(result);
        }

    }) */
}
var setPictureUrl = function(){
    var category = $('#taskCategory').text();

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

