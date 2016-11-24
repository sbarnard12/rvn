var express = require('express');
var router = express.Router();

var users = require('../models/apis/usersAPI');


/* GET home page. */
router.get('/')
	.get(function(req, res, next) {
	res.render('signUpView', {});
	})
	.post(function(req, res, next){
	users.createNewUser(req, res, next);
	})
;


module.exports = router;
