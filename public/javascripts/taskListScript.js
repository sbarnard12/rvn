var host = "http://" +  window.location.host;
$(function(){
    $(".viewDetails").on('click', taskDetailLink);
    $('.poster_link').each(setPosterLink)
})

var taskDetailLink = function(){
		var id = $(this).closest('.row3').children().first().text();
        var redirect = host + "/taskDetails/" + id;
		window.location = (redirect);
};
var setPosterLink = function(){
    $(this).on('click', function(){
        var poster_id = $(this).closest('.row3').children().eq(1).text();
        var redirect = host + '/user/profile/' + poster_id;
        window.location = (redirect);
    })
}