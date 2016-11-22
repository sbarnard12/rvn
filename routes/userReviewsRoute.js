var express = require('express');
var router = express.Router();

var userReviews = require('../models/apis/userReviewsAPI')

router.get('/', function(req, res, next){
	userReviews.getAllReviews(req, res, next);
})

module.exports = router;