var express = require('express');
var router = express.Router();

var taskListApi = require('../models/apis/taskListAPI');

router.route('/')
	.get(function(req, res, next){
		res.render('taskDetailsView');
	})
	.post(function(req, res, next){
        taskListApi.search(req, res, next);
	})
;

router.route('/:id')
	.get(function(req, res, next){
		taskListApi.getOne(req, res, next);
	})
	.post(function(req, res, next){
		taskListApi.setInterested(req, res, next);
	})
;

//router.post('/', function(req, res, next){
//	taskListApi.search(req, res, next);
//});

module.exports = router;