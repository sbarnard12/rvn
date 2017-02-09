$(function(){
    $('td:first-child').each(userProfileLink)
})

var userProfileLink = function(){
    $(this).parent().on('click', function(){
        var id = this.firstElementChild.innerText;
        var redirect = "http://localhost:3000/user/profile/" + id;
        window.location.replace(redirect);
    })
}