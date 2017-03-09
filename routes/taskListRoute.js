var express = require('express');
var router = express.Router();

var taskListApi = require('../models/apis/taskListAPI');

router.route('/')
	.get(function(req, res, next){
	//change results based on where request is coming from
		taskListApi.defaultPage(req, res, next);
	})
;

router.route('/:searchterm')
	.get(function(req, res, next){
		taskListApi.searchTasks(req, res, next);
	})
;


module.exports = router;