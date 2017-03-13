var db = require('../dbs/messagesDB'),
	messagesModel = db.model('Message');
var db2 = require('../dbs/usersDB'),
    usersModel = db2.model('User');


var getUserList = function(req, res, next){
//need to get all
    var current_userid = req.session.user_id;

    usersModel.findOne({_id: current_userid})
        .then(function(userModel){

            messagesModel.find({$or: [{'user1.id': current_userid}, {'user2.id': current_userid}]})
                .then(function(messages){
                    var username = userModel.firstName + " " + userModel.lastName;
                    var currUser = {"username": username, "userid": userModel._id};

                    var array = []; // {userid:"", username: ""}
                    messages.forEach(function(item ) {
                        //check for duplicate users
                        var user1 = item.user1;
                        var user2 = item.user2;
                        var push1 = true;
                        var push2 = true;

                        for (var i = 0; i < array.length; i++) {
                            if (((array[i]).use rname == user1.name && array[i].userid == user1.id)) { //user1 is already in the array
                                //don't add
                                push1 = false;
                            }
                            if (((array[i]).username == user2.name && array[i].userid == user2.id)) { //user 2 is already in the array
                                //don't add
                                push2 = false;
                            }
                        }

                        if(push1 && !(currUser.username = user1.name && currUser.userid == user1.id)) {
                            array.push({"username": user1.name, "userid": user1.id});
                        }
                        if(push2 && !(currUser.username = user2.name && currUser.userid == user2.id)){
                            array.push({"username": user2.name, "userid": user2.id});
                        }
                    })
                    console.log(array);
                    var currUser = {"username": userModel.firstName + " " + userModel.lastName, "userid": userModel._id};

                    res.render('messengerView', {curruser: currUser, userList: array });
                })

        })



};
var saveMessage = function(data){
	var message = new messagesModel();
	message.user1.id = data.user1_id;
	message.user1.name = data.user1_name;
	message.user2.id = data.user2_id;
	message.user2.name = data.user2_name;
	message.message = data.msg;
	message.created = Date.now();
	message.saveAsync()
        .then(function(){
            console.log("new message successfully saved");
        })
};

var getOneChatHistory = function(req, res, next){
	var user1 = req.session.user_id;
	var user2 = req.params.id;

    messagesModel.find({
        $and: [
            {$or: [{'user1.id': user1}, {'user2.id': user1}]},
            {$or: [{'user1.id': user2}, {'user2.id': user2}]}
        ]
    }).sort({created: 'ascending'})
		.then(function(messages){
			console.log("test");
			res.send(messages);
		})
};

//helper functions

var checkAndAdd = function(array, newItem, callback) {
    var user1 = newItem.user1;
    var user2 = newItem.user2;
    var push1 = true;
    var push2 = true;

    for (i = 0; i < array.length; i++ ){
        if(((array[i]).username == user1.name && array[i].userid == user1.id)){ //user1 is already in the array
            push1 = false; //don't push user1
            break;
        }
        if(((array[i]).username == user2.name && array[i].userid == user2.id)){ //user 2 is already in the array
            push2  = false; // dont push user 2
            break;
        }
    }
    if(push1){
        array.push(user1);
    }
    if(push2){
        array.push(user2);
    }
    callback(array);
};



module.exports = {
	saveMessage: saveMessage,
	getOneChatHistory: getOneChatHistory,
    getUserList: getUserList
}