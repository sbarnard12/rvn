var express = require('express');
var router = express.Router();

var usersAPI = require('../models/apis/usersAPI');

router.get('/', function(req, res, next){
	usersAPI.getUserReviews(req, res, next);
})

module.exports = router;