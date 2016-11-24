var express = require('express');
var router = express.Router();

var usersAPI = require('../models/apis/usersAPI');

router.get('/', function(req, res, next){
	usersAPI.getUserProfile(req, res, next);
})

module.exports = router;