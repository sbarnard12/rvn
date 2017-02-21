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
	taskListModel.find(
        {$and: [{expired: false},
            {'poster.id': {$ne: req.session.user_id} }] //don't return your own tasks
        }
    )
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
                    res.render('taskDetailsView', {task: task, helpers: {if_eq: if_eq}});
                });
		});
};

var createNewTask = function(req, res, next){
    
	var task = new taskListModel();
	task.title = req.body.title;
	task.category = castCategory(req.body.category);
	task.requesting = req.body.requesting;
	task.offering = req.body.offering;
	task.description = req.body.description;
	task.address.streetNumber = isNaN(req.body.streetNumber)? 0: req.body.streetNumber;
	task.address.streetName = req.body.streetName;
	task.address.city = req.body.city;
	task.address.postalCode = req.body.postalCode;
	task.modeofContact  = castModeofContact(req.body.preferredContact);
	task.expired = false;
	task.state = "Available";
	task.usePosterAddress = false;

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
		var search = new RegExp(req.params.searchterm, "i");
		taskListModel.find(
			{$and: 
				[
					{'poster.id': {'$ne':user._id}},
					{expired: false},
                    {state: {'$ne': "Matched"}},
                    {$or:
                        [
							{title: search},
							{description: search}
						]}
				] 
			}
		)
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
            //this automatically matches
			/*task.matchedUser.id = user._id;
			task.matchedUser.firstName = user.firstName;
			task.matchedUser.lastName = user.lastName;
			task.matchedUser.rating = user.rating;
			task.state = "Matched"; */
            var potentialMatch = new potentialMatchesModel();
            potentialMatch.taskID = task._id;
            potentialMatch.ownerID = task.poster.id;
            potentialMatch.interestedUser.id = user._id;
            potentialMatch.interestedUser.name = user.firstName + " " + user.lastName;
            potentialMatch.description = req.body.interested_description;

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

                    res.send("success");
                })
        })

};


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
    setMatched: setMatched
}