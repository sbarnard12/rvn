var express = require('express');
var router = express.Router();

var usersAPI = require('../models/apis/usersAPI');

router.route('/')
	.get(function(req, res, next){
		res.render('signUpView');
	})
	.post(function(req, res, next){
		usersAPI.createNewUser(req, res, next);
	})

module.exports = router;