var express = require('express');
var router = express.Router();

var taskListApi = require('../models/apis/taskListAPI');

router.get('/', function(req, res, next){
	//change results based on where request is coming from
	taskListApi.defaultPage(req, res, next);
})

module.exports = router;