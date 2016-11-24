var db4 = require('../dbs/usersDB'), 
usersModel = db4.model('User');

var db = require('../dbs/loginDB'), 
loginModel = db.model('Userlogin');

var db1 = require('../dbs/taskListDB'), 
taskListModel = db1.model('Tasklist');

var getAllUsers = function(req, res, next){
	usersModel.find({})
	.then(function(userList){
		res.json(userList);
	});
};

var getOneCurrentUser = function(req, res, next){
	usersModel.findOne({_id: req.session.user.id})
};

var createNewUser = function(req, res, next){
	var user = new usersModel();
	user.title = castTitle(req.body.title);
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.gender = castGender(req.body.gender);
	user.birthDate = Date.now();
	user.email = req.body.email;
	user.contactNumber = req.body.contactNumber;
	user.preferredContact = castPreferredContact(req.body.preferredContact);
	user.address.streetNumber = req.body.streetNumber;
	user.address.streetName = req.body.streetName;
	user.address.city = req.body.city;
	user.address.province = req.body.province;
	user.address.postalCode = req.body.postalCode;

	var login = new loginModel();
	login.userName = req.body.email;
	login.password = req.body.Password;

	login.saveAsync()
	.then(function(login){
		user.userLoginID = login._id;
		user.save()
		.then(function(user){
			res.send("success");
		})
	})
	.catch(function(e){
		console.log("fail");
		res.send("fail");
	})
	.error(console.error);
};

var getCurrentUser = function(req, res, next){
	usersModel.findOne({userLoginID: req.session.user._id})
	.then(function(user){
		res.render('userProfileView', {user: user})
	})
}

var getUserProfile = function(req, res, next){
	usersModel.findOne({userLoginID: req.session.user._id})
	.then(function(user){
		user.partial = "Profile";
		res.render('userProfileView', {user: user})
	})
}

var getUserCurrentTasks = function(req, res, next){
	usersModel.findOne({userLoginID: req.session.user._id})
	.then(function(user){
		//get all tasks that are assigned to the current user
		taskListModel.find( //only return active tasks
			{$and:
				[
					{posterID: user._id},
					{expired: false}
				]
			}
		)//ensure that only active tasks are shown
		.then(function(tasklist){
			user.tasklist = tasklist;
			user.partial = "CurrentTasks";
			res.render('userCurrentTasksView', {user: user})
		})
	})
}

var getuserTaskHistory = function(req, res, next){
	usersModel.findOne({userLoginID: req.session.user._id})
	.then(function(user){
		taskListModel.find( //only return old taks
			{$and:
				[
					{posterID: user._id},
					{expired: true}
				]
			}
		)
		.then(function(tasklist){
			user.tasklist = tasklist;
			user.partial = "TaskHistory";
			res.render('userTaskHistoryView', {user: user})
		})
	})
}

var getUserReviews = function(req, res, next){
    usersModel.findOne({userLoginID: req.session.user._id})
        .then(function(user){
        	user.partial = "Reviews";
            res.render('userReviewsView', {user: user})
        })
}


var castGender = function(gender){
	switch(gender){
		case "Male":
			return 0;
		case "Female":
			return 1;
		case "Prefer not to say":
			return 2;
		default:
			return 3;
	}
}

var castPreferredContact = function(pref){
	switch(pref){
		case "E-mail":
			return 0;
		case "Phone":
			return 1;
		case "Mail":
			return 2;
		default:
			return 3;
	}
}

var castTitle = function(title){
	switch(title){
		case "Mr.":
			return 0;
		case "Mrs.":
			return 1;
		case "Miss":
			return 2;
		case "Dr.":
			return 3;
		default:
			return 4;
	}
}

module.exports = {
	getAllUsers: getAllUsers,
	getOneCurrentUser: getOneCurrentUser,
	createNewUser: createNewUser,
	getCurrentUser: getCurrentUser,
	getUserProfile: getUserProfile,
	getUserCurrentTasks: getUserCurrentTasks,
	getuserTaskHistory: getuserTaskHistory,
	getUserReviews: getUserReviews,
}