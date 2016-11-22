var db4 = require('../dbs/usersDB'), 
usersModel = db4.model('User');

var getAllUsers = function(req, res, next){
	usersModel.find({})
	.then(function(userList){
		res.json(userList);
	});
}

module.exports = {
	getAllUsers: getAllUsers
}