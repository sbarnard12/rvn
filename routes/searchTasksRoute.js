var express = require('express');
var router = express.Router();

var taskListApi = require('../models/apis/taskListAPI');

router.get('/', function(req, res, next){
	res.render('searchTasks', {});
})

router.post('/', function(req, res, next){
	taskListApi.search(req, res, next);
})

module.exports = router;