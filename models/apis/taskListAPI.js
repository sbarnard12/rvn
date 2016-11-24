var db1 = require('../dbs/taskListDB'), 
taskListModel = db1.model('Tasklist');
var ObjectID = require('mongodb').ObjectID;

var db4 = require('../dbs/usersDB'), 
usersModel = db4.model('User');

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
	taskListModel.find({expired: false})
	.then(function(taskList){
		res.render('tasklistView', {taskList: taskList});
	})
};

var getOne = function(req, res, next){
	taskListModel.findOne({_id: req.params.id})
		.then(function(task){
			res.render('taskDetailsView', {task: task});
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

var searchTasks = function(req, res, next){
	var search = new RegExp(req.params.searchterm, "i");
	taskListModel.find(
		{$and: 
			[
				{expired: false}, 
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
	searchTasks: searchTasks
}