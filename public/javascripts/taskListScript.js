$(function(){
    $(".viewDetails").on('click', taskDetailLink);
    $('.poster_link').each(setPosterLink)
})

var taskDetailLink = function(){
		var id = $(this).closest('.row3').children().first().text();
		var redirect = "http://localhost:3000/taskDetails/" + id;
		window.location = (redirect);
};
var setPosterLink = function(){
    $(this).on('click', function(){
        var poster_id = $(this).closest('.row3').children().eq(1).text();
        var redirect = 'http://localhost:3000/user/profile/' + poster_id;
        window.location = (redirect);
    })
}