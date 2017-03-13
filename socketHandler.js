//Socket things

var messagesAPI = require('./models/apis/messagesAPI');

var initializeSocket = function(server){
	var io = require('socket.io').listen(server);


	connections = [];

	io.sockets.on('connection', function(socket){
	  connections.push(socket);
	  console.log('Connected: %s sockets connected', connections.length);

	  socket.on('disconnect', function(data){
	    connections.splice(connections.indexOf(socket), 1);
	    console.log('Disconnected: %s sockets connected', connections.length);
	  })
	  socket.on('send message', function(data){
	    console.log(data);
	    //save the message to the db
		messagesAPI.saveMessage(data);
	    io.sockets.emit('new message', {msg: data.msg});
	  });
	})
}





module.exports = {
	initialize: initializeSocket
}



