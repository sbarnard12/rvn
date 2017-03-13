$(function(){
	var socket = io.connect();
	var $messageForm = $('#messageForm');
	var $message = $('#message');
	var $chat = $('#chat');
    $('#userListTable td:first-child').each(setLink);
	var user1_id = $('#current_id').text();
	var user1_name = $('#current_name').text();


	$messageForm.submit(function(e){
		e.preventDefault();
		//set data
        var user2_id = $("#target_id").text();
        var user2_name = $("#target_name").text();
		var data = {
            user1_id: user1_id,//"587d9d62b6f2a503b8f1afda",
        	user1_name: user1_name, //"sam sam",
        	user2_id: user2_id, //"589a0ac70d632013d0b694ea",
        	user2_name: user2_name, //"brad bradson",
        	msg: $message.val()
		};
		socket.emit('send message', data);
		$message.val('');
	});

	socket.on('new message', function(data){
		$chat.append(data.msg + "<br/>");
	})
});

var setLink = function(){
	$(this).on('click', function(){
        //clear chat box
        $('#chat').text('');
		//get chat history
		var user_id =  $(this).parent().children()[2].innerHTML;
		var url = "http://localhost:3000/messenger/" + user_id;
        $.ajax({
            url: url,
            type: 'GET',
            success: function(result){
            	console.log('now need to populate the chat box');
                displayChat(result);
            }
        })
		//set user2 variables
        $("#target_id").text(user_id);
        $("#target_name").text($(this).text());

	})

};

var displayChat = function(messageArray){
    var chat = "";

    messageArray.forEach(function(item){
        var line = item.user1.name + ": " + item.message + "</br>";
        chat = chat + line;
    });

    $('#chat').append(chat);
}