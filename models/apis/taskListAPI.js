var ObjectID = require('mongodb').ObjectID;

//db objects
var db1 = require('../dbs/taskListDB'), 
    taskListModel = db1.model('Tasklist');

var db4 = require('../dbs/usersDB'), 
    usersModel = db4.model('User');
var db5 = require('../dbs/potentialMatchesDB'),
    potentialMatchesModel = db5.model('PotentialMatches');
    
//upload image objects
var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');

var fileUpload = require('express-fileupload');

//functions

var getAll = function(req, res, next){
	taskListModel.findAsync({})
	.then(function(taskList){
		res.json(taskList)
	})
	.catch(next)
	.error(console.error);
};

var search = function(req, res, next){
	taskListModel.find({$or: [{requesting: req.body.searchterm}, {offering: req.body.searchterm}]})
		.then(function(taskList){
		res.json(taskList);
	})
}

var defaultPage = function(req, res, next){
    if(req.session.age < 40){
        var ageSearch = "old";
    } else {
        var ageSearch = "young";
    }
	taskListModel.find(
        {$or: [
            {$and:
                [
                    //{'poster.id': {'$ne':user._id}}, //Don't search for your own task
                    {ageGroup: ageSearch},
                    {expired: false},
                    {state: {'$ne': "Matched"}},
                ]
            },
            {'poster.id': req.session.user_id} //get your own tasks as well
        ]}
    ).sort({'date': 'descending'}).limit(20)
	.then(function(taskList){
		res.render('tasklistView', {taskList: taskList});
	})
};

var getOne = function(req, res, next){
	taskListModel.findOne({_id: req.params.id})
		.then(function(task){
			var date = Date.parse(task.date);
			if(task.poster.rating === null){
				task.poster.rating = "No Rating";
			}
			
			task.sameUser = (task.poster.id == req.session.user_id);

            var userid = new ObjectID(req.session.user_id);
            potentialMatchesModel.findOne({$and: [{'interestedUser.id': req.session.user_id}, {taskID: task._id}]})
                .then(function(match){
                    task.alreadyMatched = (match != null);
                    //parse date so it looks nicer on the page
                    task.dateString = task.date.toString().split(" ").slice(0,4).join(" ");
                    task.fromDateString = task.fromDate.toString().split(" ").slice(0,4).join(" ");
                    task.toDateString = task.toDate.toString().split(" ").slice(0,4).join(" ");

                    res.render('taskDetailsView', {task: task, helpers: {if_eq: if_eq}});
                });
		});
};

var createNewTask = function(req, res, next){
    
	var task = new taskListModel();
	task.title = req.body.taskTitle;
	task.taskType = req.body.taskType;
    task.category = req.body.category;
    if(req.session.age < 40){
        task.ageGroup = "young";
    } else {
        task.ageGroup = "old";
    }
    task.pictureUrl = urlArray[req.body.category];
	task.description = req.body.taskDescription;
    task.location = req.body.Location;
    task.duration = req.body.Duration;
    task.date = new Date(Date.now());
    task.fromDate = new Date(Date.now());
    task.toDate = new Date(Date.now() + req.body.Duration*86400000);
	task.expired = false;
	task.state = "Available";

	//image upload code

	usersModel.findOne({userLoginID: req.session.user._id})
	.then(function(user){

		task.poster.id = user._id;
		task.poster.firstName = user.firstName;
		task.poster.lastName = user.lastName;
		task.poster.rating = user.rating;

		task.saveAsync()
		.then(function(task){
			console.log("success");
			res.json({'status': 'success', 'task': task});
		})
		.catch(function(e){
			console.log("fail");
			res.json({'status': 'error', 'error': e});
		})
		.error(console.error);
	})
};

var uploadPicture = function(req, res, next){
    //file upload things -- https://codeforgeek.com/2014/11/file-uploads-using-node-js/
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) { //should do something here to better organize files
            callback(null, "./uploads");
        },
        filename: function (req, file, callback) { //different names should be used -- need to add a file extension
            callback(null, file.originalname);
        }
    });
    var upload = multer({ storage : storage}).single('userPhoto');

    upload(req, res, function(err){
		if(err){
            res.json({'status': 'error', 'error': err});
		}
        res.json({'status': 'success'});
	});
};


var uploadFile = function(req, res, next){
    var sampleFile;

    if(!req.files){
        res.send('No files were found');
        return;
    }
    sampleFile = req.files.userPhoto;

    sampleFile.mv('./uploads/test.jpg', function(err){
        if(err){
            res.status(500).send(err);
        }
        else {
            res.send('File Uploaded');
        }
    })


}



var searchTasks = function(req, res, next){
	
	usersModel.findOne({userLoginID: req.session.user._id})
	.then(function(user){		
        var search = createRegex(req.params.searchterm);
        if(user.age < 40){
            var ageSearch = "old";
        } else {
            var ageSearch = "young";
        }
		taskListModel.find(
            {$or: [
                {$and:
                    [
                        //{'poster.id': {'$ne':user._id}}, //Don't search for your own task
                        {ageGroup: ageSearch},
                        {expired: false},
                        {state: {'$ne': "Matched"}},
                        {$or:
                            [
                                {title:  {$regex: search}},
                                {description: {$regex: search}}
                            ]
                        }
                    ]
                },
                {'poster.id': user._id} //get your own tasks as well
            ]}
		).sort({'date': 'descending'}).limit(20)
		.then(function(taskList){
		    res.render('tasklistView', {taskList: taskList});
		})
	})
};


var setInterested = function(req, res, next){
	taskListModel.findOne({_id: req.params.id})
	.then(function(task){
		usersModel.findOne({_id: req.session.user_id})
		.then(function(user){

            var potentialMatch = new potentialMatchesModel();
            potentialMatch.taskID = task._id;
            potentialMatch.ownerID = task.poster.id;
            potentialMatch.interestedUser.id = user._id;
            potentialMatch.interestedUser.name = user.firstName + " " + user.lastName;
            potentialMatch.description = req.body.interested_description;
            potentialMatch.interests = user.interests;
            potentialMatch.location = user.address.city;
            
            potentialMatch.saveAsync()
			.then(function(task){
				console.log("success");
				res.json({'status': 'success', 'task': task});
			})
			.catch(function(e){
				console.log("fail");
				res.json({'status': 'error', 'error': e})
			})
			.error(console.error);
		})
	})
}

var setMatched = function(req, res, next){
    taskListModel.findOne({_id: req.body.task_id})
        .then(function(task){
            usersModel.findOne({_id: req.body.user_id})
                .then(function(user){
                    task.matchedUser.id = user._id;
                    task.matchedUser.firstName = user.firstName;
                    task.matchedUser.lastName = user.lastName;
                    task.state = "Matched";

                    task.saveAsync()
                    .then(function(){
                        //Should clear out the interested users for that task
                        console.log("success");
                        res.json({'status': 'success'});
                    })
                        .catch(function(e){
                            console.log("fail");
                            res.json({'status': 'error', 'error': e})
                        })
                        .error(console.error);
                })
        })

};

var getHome = function(req, res){
    //get the latest three tasks
    if(req.session.age < 40){
        var ageSearch = "old";
    } else {
        var ageSearch = "young";
    }
    taskListModel.find(
        {$and:
        [
            {'poster.id': {'$ne':req.session.user_id}}, //Don't search for your own task
            {ageGroup: ageSearch},
            {expired: false},
            {state: {'$ne': "Matched"}},
        ]
    }).sort({'date': -1}).limit(3)
        .then(function(tasks){
            res.render('homeView',{tasks: tasks, user:req.session.user});
        })
}

//helpers
var if_eq = function(a, b, opts) {
    //send this file into the view, in order to be able to use if clauses in the view file
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
};

var castCategory = function(category){
	return (category === "requesting")? 0: 1;
};

var castModeofContact = function(mode){
	return (mode === "email")? 0 : 1;
};

var urlArray = {
    technical: "http://leverhawk.com/wp-content/uploads/2013/04/row-of-personal-computers-iStock_000018237896Medium.jpg",
    basicLabor: "http://c7.alamy.com/comp/CR6F2Y/young-men-doing-a-carpentry-apprenticeship-vocational-training-center-CR6F2Y.jpg",
    mechanical: "https://previews.123rf.com/images/ikonoklast/ikonoklast1303/ikonoklast130300094/18691775-Mechanic-repairing-the-motor-or-electric-parts-of-a-car-in-a-garage-Stock-Photo.jpg",
    academic: "https://thumb9.shutterstock.com/display_pic_with_logo/1860644/398919886/stock-photo-academic-398919886.jpg",
    artistic: "https://thumb9.shutterstock.com/display_pic_with_logo/201175/389834032/stock-photo-artistic-paintbrushes-on-artist-canvas-covered-with-oil-paints-389834032.jpg",
    other: "http://www.giaging.org/images/uploads/images/sstock_441648310_mentor_aa_knit.jpg"
}
var createRegex = function(string){
    var stringList = string.split(" ");
    var RegString = "";
    stringList.forEach(function(item){
        RegString = RegString + item + "|";
    });
    RegString = RegString.substring(0,RegString.length-1);
    return RegString;
}

module.exports = {
	getAll: getAll,
	search: search,
	defaultPage: defaultPage,
	getOne: getOne,
	createNewTask: createNewTask,
	searchTasks: searchTasks,
	setInterested: setInterested,
	uploadPicture: uploadPicture,
    uploadFile: uploadFile,
    setMatched: setMatched,
    getHome: getHome,
}