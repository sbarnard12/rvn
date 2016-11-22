var db1 = require('../dbs/taskListDB'), 
taskListModel = db1.model('Tasklist');

var getAll = function(req, res, next){
	taskListModel.findAsync({})
	.then(function(taskList){
		res.json(taskList)
	})
	.catch(next)
	.error(console.error);
}

module.exports = {
	getAll: getAll
}