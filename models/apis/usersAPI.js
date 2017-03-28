var db4 = require('../dbs/usersDB'),
usersModel = db4.model('User');

var db = require('../dbs/loginDB'),
loginModel = db.model('Userlogin');

var db1 = require('../dbs/taskListDB'),
taskListModel = db1.model('Tasklist');

var db5 = require('../dbs/reviewsDB'), 
reviewModel = db5.model('Review');

var db6 = require('../dbs/potentialMatchesDB'),
    potentialMatchesModel = db6.model('PotentialMatches');

var db7 = require('../dbs/messagesDB'),
  messagesModel = db7.model('Message');

var ObjectID = require('mongodb').ObjectID;

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
    //first check if username already exists
    usersModel.findOne({email: req.body.email})
        .then(function(user){
           if(user){ //user already exists, don't make another

               res.send("User Already Exists");
           } else {
               //create new user\
               try{

               var usermodel = new usersModel();
               usermodel.title = req.body.title;
               usermodel.firstName = req.body.firstName;
               usermodel.lastName = req.body.lastName;
               usermodel.age = req.body.age;
               usermodel.gender = req.body.gender;
               usermodel.birthDate = Date.now();
               usermodel.email = req.body.email;
               usermodel.contactNumber = req.body.phoneNumber;
               usermodel.preferredContact = req.body.preferredContact;
               usermodel.address.streetAddress = req.body.streetAddress;
               usermodel.address.city = req.body.city;
               usermodel.address.province = req.body.province;
               usermodel.address.postalCode = req.body.postalCode;

               //Need to parse Hobbies and Interests first
               var Hobbies = JSON.parse(req.body.Hobbies);
               var Interests = JSON.parse(req.body.Interests);
               usermodel.hobbies = Hobbies;
               usermodel.interests = Interests;

               var login = new loginModel();
               login.userName = req.body.email;
               login.password = req.body.Password;
             } catch(e) {
              res.send(e);
             }

               login.saveAsync()
                   .then(function(login){
                       usermodel.userLoginID = login._id;
                       usermodel.save()
                           .then(function(user){
                               res.send("success");
                           })
                           .catch(function(e){
                               console.log('fail');
                               res.send(e);
                           })
                   })
                   .catch(function(e){
                       console.log("fail");
                       res.send("fail");
                   })
                   .error(console.error);
           }
        });
};

var getCurrentUser = function(req, res, next){
	usersModel.findOne({userLoginID: req.session.user._id})
	.then(function(user){
		res.render('userProfileView', {user: user})
	})
}

var getUserProfile = function(req, res, next){
	
	if(typeof req.params.id === "undefined"){
		var id = req.session.user._id;
	} else {
		var id = req.params.id;
	}

	usersModel.findOne({$or: [{userLoginID: id}, {_id: id}]})
	.then(function(user){
		user.partial = "Profile";
		res.render('userProfileView', {user: user, helpers: {if_eq: if_eq}})
	})
}

var getUserCurrentTasks = function(req, res, next){

    if(typeof req.params.id === "undefined"){
        var id = req.session.user._id;
    } else {
        var id = req.params.id;
    }

    potentialMatchesModel.find({$or: [{ownerID: id}, {'interestedUser.id': id}]})
        .then(function(models){
            var interestedList = models.map(function(a){return a.taskID});

            usersModel.findOne({$or: [{userLoginID: id}, {_id: id}]})
                .then(function(user){
                    //get all tasks that are assigned to the current user
                    taskListModel.find( //only return active task
                        { $or: [
                            {$and:
                                [
                                    {$or: [{'poster.id': user._id}, {'matchedUser.id': user._id}]},
                                    {expired: false}
                                ]
                            },
                            {_id: {$in: interestedList}}
                        ]

                        }
                    )
                        .then(function(tasklist){
                            //also get tasks that user is interested in
                            //potentialMatchesModel.find()

                            tasklist.forEach(function(item, index){
                                //if user is the poster, set item.isposter
                                //if user is the matcher, set item.ismatcher
                                //get count of how many users are interested
                                potentialMatchesModel.count({taskID: item._id})
                                    .then(function(count){
                                        item.numInterestedUsers = count.toString();
                                    })
                                if(item.poster.id == user._id){
                                    item.isPoster = true;
                                    item.isMatcher = false;
                                } else {
                                    item.isMatcher = true;
                                    item.isPoster = false;
                                }
                            })

                            user.tasklist = tasklist;
                            user.partial = "CurrentTasks";

                            res.render('userCurrentTasksView', {user: user, helpers: {if_eq: if_eq}})
                        })
                })
        })


}

var getuserTaskHistory = function(req, res, next){

	if(typeof req.params.id === "undefined"){
		var id = req.session.user._id;
	} else {
		var id = req.params.id;
	}

	usersModel.findOne({$or: [{userLoginID: id}, {_id: id}]})
	.then(function(user){
		taskListModel.find( //only return old tasks
			{$and:
            	[
                	{$or: [{'poster.id': user._id}, {'matchedUser.id': user._id}]},
                	{expired: true}
            	]
        	}
		)
		.then(function(tasklist){
			user.partial = "TaskHistory";
            tasklist.forEach(function(item, index){
                item.dateString = item.date.toString().split(" ").slice(0,4).join(" ");
                if(item.completeDate) {
                    item.completeDateString = item.completeDate.toString().split(" ").slice(0, 4).join(" ");
                }
            })
			res.render('userTaskHistoryView', {user: user, taskList: tasklist})
		})
	})
}

var getUserReviews = function(req, res, next){
	if(typeof req.params.id === "undefined"){
		var id = req.session.user_id;
	} else {
		var id = req.params.id;
	}

	reviewModel.find({'reviewedUser.id': id})
	.then(function(reviews){
        //parse date string
        reviews.forEach(function(item, index){
            if(item.date){
                item.dateString = item.date.toString().split(" ").slice(0,4).join(" ");
            }
        });
		res.render('userReviewsView', {reviews: reviews})
	})

    /*usersModel.findOne({$or: [{userLoginID: id}, {_id: id}]})
        .then(function(user){
        	user.partial = "Reviews";
            res.render('userReviewsView', {user: user})
        }) */
}

var if_eq = function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
};

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