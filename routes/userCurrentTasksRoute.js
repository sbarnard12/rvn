var express = require('express');
var router = express.Router();

var usersAPI = require('../models/apis/usersAPI');

router.route('/')
	.get(function(req, res, next){
		usersAPI.getUserCurrentTasks(req, res, next);
	})

router.route('/:id')
	.get(function(req, res, next){
		usersAPI.getUserCurrentTasks(req, res, next);
	})

module.exports = router;