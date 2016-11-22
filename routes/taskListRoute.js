var express = require('express');
var router = express.Router();

var taskListApi = require('../models/apis/taskListAPI');

router.get('/', function(req, res, next){
	taskListApi.getAll(req, res, next);
})

module.exports = router;